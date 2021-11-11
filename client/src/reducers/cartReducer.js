import { ADD_TO_CART, CART_ERROR, DELETE_PRODUCT_FROM_CART, GET_CART, RESET_CART, RESET_CART_ERROR, RESET_ORDER, SET_ORDER, UPDATE_QUANTITY } from "../actions/actionTypes";



const initialState = {
	cart: [],
	order: null,
	isLoading: false,
	error: null,
}


export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.payload]
			}
		case GET_CART:
			return {
				...state,
				cart: action.payload
			}
		case RESET_CART:
			return {
				...state,
				cart: []
			}
		case DELETE_PRODUCT_FROM_CART:
			const newState = state.cart.filter(item => item.product.id !== action.payload.id);
			return {
				...state,
				cart: newState,
			}
		case UPDATE_QUANTITY:
			return {
				...state,
				cart: action.payload
			}
		case SET_ORDER:
			return {
				...state,
				order: action.payload
			}
		case RESET_ORDER:
			return {
				...state,
				order: null
			}
		case CART_ERROR:
			return {
				...state,
				error: action.payload
			}
		case RESET_CART_ERROR:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
}