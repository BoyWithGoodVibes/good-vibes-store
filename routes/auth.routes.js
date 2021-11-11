const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const ShoppingCart = require('../models/ShoppingCart');



function generateTokens(payload) {
	const accessToken = jwt.sign(payload, config.get('accessJWT'), { expiresIn: '30m' });
	const refreshToken = jwt.sign(payload, config.get('refreshJWT'), { expiresIn: '30d' });
	return {
		accessToken,
		refreshToken
	}
}

async function saveToken(userId, refreshToken) {
	const tokenData = await Token.findOne({ owner: userId });
	if (tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save();
	}

	const token = await new Token({ owner: userId, refreshToken });
	await token.save();
	return token
}

async function removeToken(refreshToken) {
	const tokenData = await Token.deleteOne({ refreshToken });
	return tokenData;
}



// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Invalid email').isEmail(),
		check('password', 'The minimum password length is 7 characters').isLength({ min: 7 })
	],
	async (req, res) => {
		try {

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.errors[0].msg })
			}

			const { email, password } = req.body;

			const candidate = await User.findOne({ email });

			if (candidate) {
				return res.status(400).json({ message: 'The user already exists' });
			}

			const hashedPassword = await bcrypt.hash(password, 8);

			const user = await new User({ email, password: hashedPassword });

			await user.save();

			const shoppingCart = await new ShoppingCart({ owner: user.id })

			await shoppingCart.save();

			const tokens = generateTokens({ userId: user.id, email });
			await saveToken(user.id, tokens.refreshToken);

			// return tokens !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			res.status(201).json({ ...tokens, email });

		} catch (e) {
			res.status(500).json({ message: "Something went wrong, try again" })
		}
	}
)

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Invalid email').isEmail(),
		check('password', 'The minimum password length is 7 characters').exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.errors[0].msg })
			}

			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'The user was not found' })
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid password' })
			}

			const tokens = generateTokens({ userId: user.id, email });
			await saveToken(user.id, tokens.refreshToken);

			// return tokens !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			res.status(201).json({ ...tokens, email });

		} catch (e) {
			res.status(500).json({ message: "Something went wrong, try again" })
		}
	}
)


// /api/auth/logout
router.post(
	'/logout',
	async (req, res) => {
		try {

			const { refreshToken } = req.cookies;
			await removeToken(refreshToken)
			res.clearCookie('refreshToken');
			res.status(200).json({ message: "You are logged out" });

		} catch (e) {
			res.status(500).json({ message: "Something went wrong, try again" })
		}
	}
)



// /api/auth/refresh
router.get(
	'/refresh',
	async (req, res) => {
		try {

			const { refreshToken } = req.cookies;

			const userData = jwt.verify(refreshToken, config.get('refreshJWT'));

			const tokenFromDb = await Token.findOne({ refreshToken });


			if (!userData || !tokenFromDb) {
				return res.status(401).json({ message: "Session done" })
			}

			const user = await User.findById(userData.userId);


			const tokens = generateTokens({ userId: user.id, email: user.email });
			await saveToken(user.id, tokens.refreshToken);

			//// return tokens !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			res.status(201).json({ ...tokens, email: user.email });

		} catch (e) {
			res.status(401).json({ message: "Session done" })
		}
	}
)



module.exports = router;