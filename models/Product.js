const { Schema, model } = require('mongoose');

const schema = new Schema({
	id: { type: Number, required: true },
	title: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	image: { type: String, required: true },
	rating: { type: Number, required: true }
})


module.exports = model('Product', schema);