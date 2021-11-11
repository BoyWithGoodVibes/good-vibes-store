const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	products: [
		{
			product: {type: Types.ObjectId, ref: 'Product'},
			quantity: {type: Number},
			totalPrice: {type: Number}
		}
	],
	owner: {type: Types.ObjectId, ref: 'User', unique: true, required: true}
})


module.exports = model('ShoppingCart', schema);