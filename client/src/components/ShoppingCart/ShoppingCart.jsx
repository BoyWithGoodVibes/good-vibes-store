import React from 'react';
import ShoppingCartList from './ShoppingCartList';
import { useSelector } from 'react-redux';
import ShoppingCartSubmit from './ShoppingCartSubmit';
import '../../App.less';
import './ShoppingCart.css';
import cartImage from '../../images/empty-cart.png';

const ShoppingCart = () => {

	const cartProductsNumber = useSelector(state => state.cart.cart.length);

	return cartProductsNumber ?
		(
			<>

				<p className="cart-products-list-header container">
					YOUR CART
				</p>

				<div className="cart ">

					<ShoppingCartList />



					<ShoppingCartSubmit />

				</div>

			</>
		)
		:
		(
			<div className="empty">
					<img src={cartImage} alt="" />

				<p>
					CART IS EMPTY
				</p>
			</div>
		)
}

export default ShoppingCart;