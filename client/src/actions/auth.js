import axios from "axios";
import { FAILED_LOGIN, LOGOUT, RESET_LOGIN_FAIL, SUCCESS_LOGIN, USER_LOADING } from "./actionTypes";

const headers = {
	'Content-Type': 'application/json'
};

export const register = (body) => {
	return async dispatch => {
		try {
			dispatch(userLoading(true));

			let registerBody;

			if (body) {
				registerBody = JSON.stringify(body)
			}

			const { data } = await axios.post('https://goodvibesstore.herokuapp.com/api/auth/register', registerBody, { headers });


			if (data && data.accessToken) {
				dispatch(successLogin(data))
			}


		} catch (e) {
			dispatch(loginFailed(e.response?.data?.message));
			setTimeout(() => {
				dispatch(resetLoginFail())
			}, 4000)
		} finally {
			dispatch(userLoading(false));
		}
	}
}

export const login = (body) => {
	return async dispatch => {
		try {
			dispatch(userLoading(true));


			if (body) {
				body = JSON.stringify(body)
			}

			const { data } = await axios.post('https://goodvibesstore.herokuapp.com/api/auth/login', body, { headers });

			if (data && data.accessToken) {
				dispatch(successLogin(data))
			}


		} catch (e) {
			dispatch(loginFailed(e.response?.data?.message));
			setTimeout(() => {
				dispatch(resetLoginFail())
			}, 4000);
		} finally {
			dispatch(userLoading(false));
		}
	}
}


export const checkAuth = () => {
	return async dispatch => {
		try {

			dispatch(userLoading(true));

			const { data } = await axios.get('https://goodvibesstore.herokuapp.com/api/auth/refresh', { withCredentials: true });
			if (data && data.accessToken) {
				dispatch(successLogin(data))
			}

			


		} catch (e) {
			dispatch(loginFailed(e.response?.data?.message));
			setTimeout(() => {
				dispatch(resetLoginFail())
			}, 4000);
		} finally {
			dispatch(userLoading(false));
		}
	}
}


export const logout = () => {
	return async dispatch => {
		try {

			dispatch(userLoading(true));

			await axios.post('https://goodvibesstore.herokuapp.com/api/auth/logout');

			dispatch({
				type: LOGOUT
			});


		} catch (e) {
			dispatch(loginFailed(e.response?.data?.message));
			setTimeout(() => {
				dispatch(resetLoginFail())
			}, 4000);
		} finally {
			dispatch(userLoading(false));
		}
	}
}

export const successLogin = (data) => ({
	type: SUCCESS_LOGIN,
	payload: data
})

export const userLoading = (data) => ({
	type: USER_LOADING,
	payload: data
})

export const loginFailed = (data) => ({
	type: FAILED_LOGIN,
	payload: data
})

export const resetLoginFail = () => ({
	type: RESET_LOGIN_FAIL
})




