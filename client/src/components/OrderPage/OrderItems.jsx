import { Image } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import './OrderItems.css';

const OrderItems = () => {

	const cart = useSelector(state => state.cart.cart);
	const subtotal = useSelector(state => state.cart.cart.reduce((accumulator, item) => accumulator + item.totalPrice, 0));


	return cart ?
		(
			<div className="order-list">

				<p className="order-list-header">
					YOUR CART
				</p>

				{
					cart.map(item => {
						return (

							<div 
								className="order-list-item" 
								key={item.product.title}
							>

								<div className="order-list-item-img-container">
									<Image
										height={80}
										width={65}
										src={item.product.image}
										preview={false}
									/>
								</div>


								<p className="order-list-item-title">
									{item.product.title}
								</p>

								<p className="order-list-item-price">
									<span>1 piece: {item.product.price.toFixed(2)} $</span>
									<span className="order-list-item-quantity">quantity: {item.quantity}</span>
									<span>amount: {item.totalPrice.toFixed(2)} $</span>
								</p>


							</div>


						)
					})
				}

				<p className="order-list-total">
					SUBTOTAL: {subtotal.toFixed(2)} $
				</p>

			</div>
		)
		:
		(
			null
		)
}

export default OrderItems;