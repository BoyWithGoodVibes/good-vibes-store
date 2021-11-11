import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { logout } from '../../actions/auth';
import { Notification } from '../UI/Notification';
import NavbarSearchInput from './NavbarSearch/NavbarSearchInput';
import Backdrop from '../UI/Backdrop/Backdrop';
import Login from '../Login/Login';
import logo from '../../images/home-logo.jpg';
import NavbarLarge from './NavbarLarge';
import NavbarSmall from './NavbarSmall';
import './Navbar.css';
import '../../App.less';


const Navbar = () => {

	const dispatch = useDispatch();

	const isAuth = useSelector(state => state.auth.isAuth);
	const cartProductsNumber = useSelector(state => state.cart.cart.length);

	const [isLoginClose, setIsLoginClose] = useState(true);
	const [isSearchClose, setIsSearchClose] = useState(true);

	const navHandler = () => {
		if (!isSearchClose) {
			setIsSearchClose(true)
		}
		if (!isLoginClose) {
			setIsLoginClose(true)
		}
	}

	const searchHandler = () => {
		setIsSearchClose(!isSearchClose)
	}


	const loginFormHandler = () => {
		if (isAuth) {
			dispatch(logout());
		} else {
			setIsLoginClose(false);
		}
	}



	const cartHandler = () => {
		if (!isAuth) {
			Notification(
				'error',
				'User is not authorized'
			)
		}
	}
	//User not authorized




	return (
		<>
			<header
				className="nav-container"
			>




				<div 
					className="nav-list container"
					onClick={navHandler}
				>
					<MediaQuery minWidth={901}>


						<NavbarLarge
							logo={logo}
							loginFormHandler={loginFormHandler}
							searchHandler={searchHandler}
							cartProductsNumber={cartProductsNumber}
							cartHandler={cartHandler}
							isAuth={isAuth}
						/>

					</MediaQuery>


					<MediaQuery maxWidth={899}>

						<NavbarSmall
							logo={logo}
							loginFormHandler={loginFormHandler}
							searchHandler={searchHandler}
							cartProductsNumber={cartProductsNumber}
							cartHandler={cartHandler}
							isAuth={isAuth}
						/>

					</MediaQuery>

				</div>




				<NavbarSearchInput
					isSearchClose={isSearchClose}
					closeInput={searchHandler}
				/>



			</header>


			<Backdrop
				isDepComponentClose={isSearchClose}
				close={searchHandler}
			/>



			<Login
				closeLogin={() => setIsLoginClose(true)}
				isLoginClose={isLoginClose}
			/>




		</>
	)
}

export default Navbar;
