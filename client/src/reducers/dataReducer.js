import { IS_FETCHING, RESET_FILTERS, SET_CATEGORIES, SET_PRODUCT_LIST, SORT_BY } from "../actions/actionTypes";

const initialState = {
	products: [],
	categories: [],
	isFetching: false,
	filteredProducts: [],
}


export const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case IS_FETCHING:
			return {
				...state,
				isFetching: action.payload
			}
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.payload
			}
		case SET_PRODUCT_LIST:
			return {
				...state,
				products: action.payload
			}
		case SORT_BY:
			return {
				...state,
				filteredProducts: action.payload
			}
		case RESET_FILTERS:
			return {
				...state,
				filteredProducts: []
			}
		default:
			return state;
	}
}