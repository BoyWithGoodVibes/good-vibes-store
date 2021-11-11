const { Router } = require('express');
const router = Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const ShoppingCart = require('../models/ShoppingCart')





// /api/cart/add
router.post('/add', auth, async (req, res) => {
	try {


		const item = req.body;

		const candidate = await ShoppingCart.findOne({ owner: req.user.userId, "products.product": item.product._id })

		if (candidate) {
			return res.status(417).json({ message: "Еhe product is already in the cart" })
		}

		await ShoppingCart.updateOne(
			{ owner: req.user.userId },
			{ $addToSet: { products: { product: item.product._id, quantity: item.quantity, totalPrice: item.totalPrice } } }
		)


		res.status(200).json(item)
		//console.log(candidate);
		//res.status(200)

	} catch (e) {
		res.status(500).json({ message: "Something went wrong, try again" })
	}
});


// /api/cart/increase
router.post('/changequantity/:action', auth, async (req, res) => {
	try {

		const action = req.params.action;

		const request = req.body;

		ShoppingCart.findOne({ owner: req.user.userId, "products.product": request.product._id })
			.populate("products.product")
			.exec(function (err, data) {
				if (!err) {
					data.products.forEach((item, index) => {
						if (item.product.id === request.product.id) {
							if (action === 'increase') {
								data.products[index].quantity++;
								data.products[index].totalPrice = data.products[index].quantity * item.product.price;

								res.status(200).json(data.products[index]);
							}

							if (action === 'decrease') {
								if (data.products[index].quantity >= 1) {
									data.products[index].quantity--;
									data.products[index].totalPrice = data.products[index].quantity * item.product.price;

									res.status(200).json(data.products[index]);
								}

							}
						}

					})

					data.save()

				} else {
					console.log("Error occured while iteration")
				}
			})


	} catch (e) {
		res.status(500).json({ message: "Something went wrong, try again" })
	}
});


// /api/cart/
router.get('/', auth, async (req, res) => {
	try {

		const cart = await ShoppingCart.findOne({ owner: req.user.userId })
			.populate("products.product")
			.exec()


		res.status(200).json(cart.products)

	} catch (e) {
		res.status(500).json({ message: "Something went wrong, try again" })
	}
});

// /api/cart/remove
router.post('/remove', auth, async (req, res) => {
	try {

		const product = req.body;

		await ShoppingCart.updateOne(
			{ owner: req.user.userId },
			{ $pull: { products: { product: product._id } } }
		)

		//await ShoppingCart.findOne({ owner: req.user.userId }).products.pull({ _id });

		res.status(200).json(product);
	} catch (e) {
		res.status(500).json({ message: "Something went wrong, try again" })
	}
})


// /api/cart/removeAll
router.post('/removeAll', auth, async (req, res) => {
	try {


		await ShoppingCart.updateOne(
			{ owner: req.user.userId },
			{ $set: { products: [] } }
		)


		res.status(200).json({message: 'Cart is empty now'});

	} catch (e) {
		res.status(500).json({ message: "Something went wrong, try again" })
	}
});




module.exports = router;