import React, { useEffect } from 'react'
import './App.less';
import { Spin } from 'antd';
import Navbar from './components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './actions/data';
import { checkAuth } from './actions/auth';
import { getCart, resetCart } from './actions/cart';
import AppRoutes from './components/AppRoutes';

const App = () => {

	const dispatch = useDispatch();
	const products = useSelector(state => state.data.products);
	const isDataFetching = useSelector(state => state.data.isFetching);
	const categories = useSelector(state => state.data.categories)
	const isAuth = useSelector(state => state.auth.isAuth);
	

	useEffect(() => {
		dispatch(getData());
		if (localStorage.getItem('accessToken')) {
			dispatch(checkAuth());
		}
	}, []);


	useEffect(() => {    // RESET CART !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		if (isAuth) {
			dispatch(getCart())
		} else {
			dispatch(resetCart())
		}
	}, [isAuth])

	return (
		<div className="app">
			<Navbar />

			{
				categories.length && products.length && !isDataFetching ?
					<AppRoutes />
					:
					<div
						className="spinner"
					>
						<Spin
							tip="Loading..."
							size="large"
						/>
					</div>
			}


		</div>
	);
}

export default App;
