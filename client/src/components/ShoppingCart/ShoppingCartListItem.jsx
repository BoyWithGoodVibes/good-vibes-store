import React from 'react';
import { Image } from 'antd';
import InputNumber from '../UI/InputNumber/InputNumber';
import { useDispatch } from 'react-redux';
import { removeProduct, updateQuantityinProduct } from '../../actions/cart';
import { CloseCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { pathConverter } from '../../utils/pathConverter'
import './ShoppingCartListItem.css';

const ShoppingCartListItem = ({ item, cart }) => {


	const dispatch = useDispatch();

	

	const inputHandler = (key) => {
		if (item.quantity === 1 && key === 'decrease') {
			dispatch(removeProduct(item.product));
		} else {
			dispatch(updateQuantityinProduct(key, item, cart));
		}
	}




	return item ?
		(
			<div className="cart-products-list-item">

				<div className="cart-products-list-item-img-container">
					<Link to={'/catalog/' + pathConverter(item.product.category) + '/' + item.product.id}>
						<Image
							src={item.product.image}
							height={140}
							width={130}
							preview={false}
						/>
					</Link>
				</div>


				<Link
					className="cart-products-list-item-title"
					to={'/catalog/' + pathConverter(item.product.category) + '/' + item.product.id}
				>
					{item.product.title}
				</Link>

				<div className="cart-products-list-item-input">
					<InputNumber
						className
						increase={() => inputHandler('increase')}
						decrease={() => inputHandler('decrease')}
						quantity={item.quantity}
					/>

					<p>
						{item.product.price}$ / piece
					</p>
				</div>



				<p 
					className="cart-products-list-item-totalprice"
				>
					{item.totalPrice.toFixed(2)}$
				</p>


				<button
					className="cart-products-list-item-button"
					onClick={() => dispatch(removeProduct(item.product))}
				>
					<CloseCircleFilled />
				</button>

			</div>
		)
		:
		(
			null
		)
}

export default ShoppingCartListItem;