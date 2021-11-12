import axios from "axios";
import { ADD_TO_CART, CART_ERROR, DELETE_PRODUCT_FROM_CART, GET_CART, RESET_CART, RESET_CART_ERROR, RESET_ORDER, SET_ORDER, UPDATE_QUANTITY } from "./actionTypes";
import { checkAuth } from "./auth";



export const getCart = () => {
	return async dispatch => {
		try {

			const { data } = await axios.get('/api/cart', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});


			dispatch({
				type: GET_CART,
				payload: data
			})

		} catch (e) {

			if (e.response.status === 401 && localStorage.getItem('accessToken')) {

				await dispatch(checkAuth());
				dispatch(getCart());

			} else {
				dispatch(cartFail(e.response?.data?.message));
				setTimeout(() => {
					dispatch(resetCartFail())
				}, 4000);
			}

		}
	}
}


export const addToCart = (product) => {
	return async dispatch => {
		try {


			const { data } = await axios.post('/api/cart/add', product, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});

			dispatch({
				type: ADD_TO_CART,
				payload: data
			})

		} catch (e) {
			if (e.response.status === 401 && localStorage.getItem('accessToken')) {

				await dispatch(checkAuth());
				dispatch(addToCart(product));

			} else {
				dispatch(cartFail(e.response?.data?.message));
				setTimeout(() => {
					dispatch(resetCartFail())
				}, 4000);
			}
		}
	}
}


export const removeProduct = (product) => {
	return async dispatch => {
		try {


			const { data } = await axios.post('/api/cart/remove', product, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});

			dispatch({
				type: DELETE_PRODUCT_FROM_CART,
				payload: data
			})

		} catch (e) {
			if (e.response.status === 401 && localStorage.getItem('accessToken')) {

				await dispatch(checkAuth());
				dispatch(removeProduct(product));

			} else {
				dispatch(cartFail(e.response?.data?.message));
				setTimeout(() => {
					dispatch(resetCartFail())
				}, 4000);
			}
		}
	}
}


export const updateQuantityinProduct = (action, product, cart) => {
	return async dispatch => {
		try {


			const { data } = await axios.post(`https://goodvibesstore.herokuapp.com/api/cart/changequantity/${action}`, product, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});

			const newCart = cart.map(elem => {
				if (elem.product.id !== data.product.id) {
					return elem
				}

				return data

			})


			dispatch({
				type: UPDATE_QUANTITY,
				payload: newCart
			})

		} catch (e) {
			if (e.response.status === 401 && localStorage.getItem('accessToken')) {

				await dispatch(checkAuth());
				dispatch(updateQuantityinProduct(action, product, cart));

			} else {
				dispatch(cartFail(e.response?.data?.message));
				setTimeout(() => {
					dispatch(resetCartFail())
				}, 4000);
			}
		}

	}

}


export const confirmOrder = (formData, products) => {
	return async dispatch => {
		try {

			const { data } = await axios.post('https://goodvibesstore.herokuapp.com/api/order/confirm', { formData, products }, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});

			dispatch({
				type: SET_ORDER,
				payload: data
			});

			dispatch(removeAll());

		} catch (e) {
			if (e.response.status === 401 && localStorage.getItem('accessToken')) {

				await dispatch(checkAuth());
				dispatch(confirmOrder(formData, products));

			} else {
				dispatch(cartFail(e.response?.data?.message));
				setTimeout(() => {
					dispatch(resetCartFail())
				}, 4000);
			}
		}
	}
}


export const resetOrder = () => ({
	type: RESET_ORDER
})


export const removeAll = () => {
	return async dispatch => {
		try {


			await axios.post('https://goodvibesstore.herokuapp.com/api/cart/removeAll', {}, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});

			dispatch(resetCart());

		} catch (e) {
			if (e.response.status === 401 && localStorage.getItem('accessToken')) {
				
				await dispatch(checkAuth());
				dispatch(removeAll());

			} else {
				dispatch(cartFail(e.response?.data?.message));
				setTimeout(() => {
					dispatch(resetCartFail())
				}, 4000);
			}
		}
	}
}


export const resetCart = () => ({
	type: RESET_CART
})

export const cartFail = (data) => ({
	type: CART_ERROR,
	payload: data
})

export const resetCartFail = () => ({
	type: RESET_CART_ERROR
})



