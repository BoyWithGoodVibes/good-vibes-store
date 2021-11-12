import axios from 'axios';
import { SET_CATEGORIES, SET_PRODUCT_LIST, IS_FETCHING, SORT_BY, RESET_FILTERS } from './actionTypes';

export const getData = () => {
	return async dispatch => {
		try {
			dispatch(fetching(true));
			const { data } = await axios.get('https://goodvibesstore.herokuapp.com/api/products/');
			const categories = [...new Set(data.map(item => item.category))];

			dispatch({
				type: SET_CATEGORIES,
				payload: categories
			});


			dispatch({
				type: SET_PRODUCT_LIST,
				payload: data
			});

			dispatch(fetching(false))
		} catch (e) {
			dispatch(fetching(false))
			console.log(e)
		}

	}
}


export const fetching = (data) => ({
	type: IS_FETCHING,
	payload: data
})


export const sortBy = (arr, key) => {
	return dispatch => {
		try {
			const copy = arr.map(a => a);

			if (key === 'increasePrice') {
				copy.sort((a, b) => a.price - b.price);
			}
			if (key === 'decreasePrice') {
				copy.sort((a, b) => b.price - a.price);
			}

			dispatch({
				type: SORT_BY,
				payload: copy
			})
		} catch (e) {
			console.log(e)
		}
	}
}


export const resetFilters = () => ({
	type: RESET_FILTERS
})




//export const sortByPriceIncrease = () => ({
//	type: SORT_BY_PRICE_INCREASE
//})

//export const sortByPriceDecrease = () => ({
//	type: SORT_BY_PRICE_DECREASE
//})

//export const sortByRateIncrease = () => ({
//	type: SORT_BY_RATE_INCREASE
//})

//export const sortByRateDecrease = () => ({
//	type: SORT_BY_RATE_DECREASE
//})