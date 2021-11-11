import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { pathConverter } from '../../utils/pathConverter';
import SmallCard from '../SmallCard/SmallCard';
import { resetFilters } from '../../actions/data';
import SortComponent from './SortComponent/SortComponent';
import './SmallCardList.css';
import '../../App.less';

const SmallCardList = () => {

	let { categoryName } = useParams();
	const dispatch = useDispatch();


	const products = useSelector(state => {
		if (categoryName) {
			return state.data.products.filter(item => pathConverter(item.category) === categoryName);
		} else {
			return state.data.products
		}
	});
	const filteredProducts = useSelector(state => state.data.filteredProducts);
	const isFetching = useSelector(state => state.data.isFetching);



	useEffect(() => {
		dispatch(resetFilters())
	}, [categoryName])





	return !isFetching && products && products.length ?
		(
			<>
				<div className="container">

					<p className="category-header">
						{categoryName ? products[0].category[0].toUpperCase() + products[0].category.slice(1) : "SHOP ALL"}
					</p>




					<div className="product-list">
						{
							(filteredProducts && filteredProducts.length ? filteredProducts : products).map(item => {
								return (
									<SmallCard
										item={item}
										key={item.image}
									/>
								)
							})
						}
					</div>

				</div>



				<SortComponent 
					products={products}
				/>



			</>
		)
		:
		(
			null
		)
}

export default SmallCardList;