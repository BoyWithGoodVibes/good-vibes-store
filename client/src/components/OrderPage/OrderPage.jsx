import React from 'react';
import { useSelector } from 'react-redux';
import OrderForm from './OrderForm';
import OrderItems from './OrderItems';
import './OrderPage.css';

const OrderPage = () => {

	const cart = useSelector(state => state.cart.cart)

	return cart ? 
	(

		<div className="order-container">

			<OrderForm />

			<OrderItems />

		</div>
	)
	:
	(
		null
	)
}

export default OrderPage;