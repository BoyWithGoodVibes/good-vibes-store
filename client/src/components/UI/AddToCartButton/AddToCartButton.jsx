import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeProduct } from '../../../actions/cart';
import { Notification } from '../Notification';
import './AddToCartButton.css';

const AddToCartButton = ({ product, quantity }) => {

	const dispatch = useDispatch();

	const isInCart = useSelector(state => state.cart.cart.find(item => item.product.id === product.id));
	const err = useSelector(state => state.cart.error);

	const cartHandler = () => {
		if (!isInCart) {
			dispatch(addToCart({ product: product, totalPrice: product.price * quantity, quantity }));
		} else {
			dispatch(removeProduct(product))
		}
	}

	useEffect(() => {
		if (err) {
			Notification(
				'error',
				err
			)
		}
	}, [err])

	return (
		<button
			className={`product-button ${isInCart ? "in-cart" : "not-in-cart"}`}
			onClick={cartHandler}
		>
			{isInCart ? "IN CART" : "ADD TO CART"}
		</button>
	)
}

export default AddToCartButton;