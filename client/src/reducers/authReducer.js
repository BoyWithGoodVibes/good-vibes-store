import { FAILED_LOGIN, LOGOUT, RESET_LOGIN_FAIL, SUCCESS_LOGIN, USER_LOADING } from "../actions/actionTypes";



const initialState = {
	isLoading: false,
	isAuth: false,
	email: '',
	error: null,
}


export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: action.payload
			}
		case SUCCESS_LOGIN:
			localStorage.setItem('accessToken', action.payload.accessToken);
			return {
				...state,
				email: action.payload.email,
				isAuth: true,
			}
		case LOGOUT:
			localStorage.removeItem('accessToken')
			return {
				...state,
				email: '',
				isAuth: false,
			}
		case FAILED_LOGIN:
			if (localStorage.getItem('accessToken')) {
				localStorage.removeItem('accessToken')
			}
			return {
				...state,
				error: action.payload,
				isAuth: false
			}
		case RESET_LOGIN_FAIL:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
}