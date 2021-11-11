import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { pathConverter } from '../../../utils/pathConverter';
import './NavbarSearchProduct.css';



const NavbarSearchProduct = ({ item, closeInput, resetInputValue }) => {

	const clickHandler = () => {
		closeInput();
		resetInputValue();
	}

	return (
		<Link
			className="search-products-item"
			to={'/catalog/' + pathConverter(item.category) + '/' + item.id}
			onClick={clickHandler}
		>
			<div className="search-products-item-img-container">
				<Image
					src={item.image}
					height={60}
					width={55}
					preview={false}
				/>
			</div>


			<div className="search-products-item-text-container">
				<p className="search-products-item-text-title">
					{item.title}
				</p>

				<p className="search-products-item-text-description">
					{item.description}
				</p>
			</div>


		</Link>
	)
}

export default NavbarSearchProduct;