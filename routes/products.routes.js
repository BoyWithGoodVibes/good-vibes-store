const { Router } = require('express');
const router = Router();
const Product = require('../models/Product');



// api/products/
router.get(
	'/',
	async (req, res) => {
		try {

			const products =  await Product.find();


			if (!products) {
				return res.status(500).json({ message: "Something went wrong, try again" });
			}

			res.json(products)

		} catch (e) {
			res.status(500).json({ message: "Something went wrong, try again" });
		}
	}
)


module.exports = router