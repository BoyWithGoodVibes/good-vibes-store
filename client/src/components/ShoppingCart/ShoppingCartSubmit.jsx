import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ShoppingCartSubmit.css';

const ShoppingCartSubmit = () => {

	const subtotal = useSelector(state => state.cart.cart.reduce((accumulator, item) => accumulator + item.totalPrice, 0));


	return (
		<div className="cart-submit">
			<p className="cart-submit-subtotal">
				SUBTOTAL:
			</p>

			<p className="cart-submit-subtotal-number">
				{subtotal ? subtotal.toFixed(2) : "NONE"} $
			</p>

			<Link
				className="cart-submit-submit-order"
				to="/order"
			>
				SUBMIT ORDER
			</Link>
		</div>
	)
}

export default ShoppingCartSubmit;