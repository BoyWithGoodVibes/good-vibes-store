const { Schema, model } = require('mongoose');

const schema = new Schema({
	name: {type: String, required: true},
	surname: {type: String, required:  true},
	middleName: {type: String, required:  true},
	email: {type: String, required: true},
	address: {type: Object, required: true},
	cart: [{type: Object, required: true}],
	orderNumber: {type: Number, required: true}
})


module.exports = model('Order', schema);