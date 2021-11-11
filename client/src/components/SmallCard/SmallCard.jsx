import React from 'react';
import { pathConverter } from '../../utils/pathConverter';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import '../../App.less';
import './SmallCard.css';

const SmallCard = ({ item }) => {


	return (
		<div className="productlist-item">

			<Link
				to={'/catalog/' + pathConverter(item.category) + '/' + item.id}
			>

				<div className="productlist-item-img-container">
					<Image
						className="productlist-item-img"
						src={item.image}
						preview={false}
					/>

				</div>


				<p
					className="productlist-item-title"
					to={'/catalog/' + pathConverter(item.category) + '/' + item.id}
				>
					{item.title}
				</p>

				<p
					className="productlist-item-price"
				>
					{item.price} $
				</p>


				<button
					className="productlist-item-button"
					to={'/catalog/' + pathConverter(item.category) + '/' + item.id}
				>
					<span>
						VIEW MORE
					</span>
				</button>

			</Link>

		</div>
	)
}

export default SmallCard;