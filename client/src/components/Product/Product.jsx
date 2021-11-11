import React, { useState } from 'react';
import { Image } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import InputNumber from '../UI/InputNumber/InputNumber';
import AddToCartButton from '../UI/AddToCartButton/AddToCartButton';
import './Product.css';

const Product = () => {

	const { productId } = useParams();

	const product = useSelector(state => state.data.products.find(item => item.id === Number(productId)));
	const isFetching = useSelector(state => state.data.isFetching);


	const [quantity, setQuantity] = useState(1);
	

	const inputHandler = (key) => {
		if (quantity === 1 && key === 'decrease') {
			return
		} 
		else if (key === 'increase') {
			setQuantity(quantity + 1)
		}
		else if (key === 'decrease') {
			setQuantity(quantity - 1)
		}
	}


	return !isFetching && product ?
		(
			<div className="product-container">
				<div className="product-img-wrapper">
					<Image
						src={product.image}
					/>
				</div>

				<div className="product-info">
					<p className="product-title">{product.title}</p>
					<p className="product-price">${product.price}</p>
					<InputNumber
						increase={() => inputHandler('increase')}
						decrease={() => inputHandler('decrease')}
						quantity={quantity}
					/>

					<AddToCartButton
						product={product}
						quantity={quantity}
					/>

					<p className="product-description">{product.description}</p>
				</div>
			</div>
		)
		:
		(
			null
		)


}

export default Product;