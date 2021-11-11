const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000/'
}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cart', require('./routes/shoppingCart.routes.js'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/order', require('./routes/order.routes'));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}


const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Ossikde:GachiMuchi@cluster0.yyyvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
		app.listen(PORT, () => console.log(`Started on port ${PORT}...`));

	} catch (e) {
		console.log('Server Error', e.message);
		process.exit(1)
	}
}

start();