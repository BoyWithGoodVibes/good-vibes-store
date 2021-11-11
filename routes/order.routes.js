const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const Order = require('../models/Order')



router.post('/confirm', auth, async (req, res) => {
	try {

		const body = req.body;

		let orderNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

		const order = await new Order({
			name: body.formData.name,
			surname: body.formData.surname,
			middleName: body.formData.middleName,
			email: body.formData.email,
			address: {
				street: body.formData.street,
				city: body.formData.city,
				country: body.formData.country,
			},
			cart : body.products,
			orderNumber
		});

		await order.save();



		res.status(200).json(orderNumber)

	} catch (e) {
		res.status(500).json({ message: "Something went wrong, try again" })
	}
});



module.exports = router;