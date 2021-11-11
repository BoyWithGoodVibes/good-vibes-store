import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartListItem from './ShoppingCartListItem';
import './ShoppingCartList.css';
import { Notification } from '../UI/Notification';


const ShoppingCartList = () => {

	const cart = useSelector(state => state.cart.cart);
	const err = useSelector(state => state.cart.error);

	useEffect(() => {
		if (err) {
			Notification(
				'error',
				err
			)
		}
	}, [err])

	return (
		<div className="cart-products-list">
			{
				cart ?
					cart.map(item => {
						return (
							<ShoppingCartListItem
								item={item}
								cart={cart}
								key={item.product.title}
							/>
						)
					})
					:
					null
			}
		</div>
	)
}

export default ShoppingCartList;