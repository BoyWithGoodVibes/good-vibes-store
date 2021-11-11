import React, { useState } from 'react';
import { ShoppingOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import NavbarSidebar from './NavbarSidebar/NavbarSidebar';
import './Navbar.css';

const NavbarSmall = ({ logo, cartHandler, cartProductsNumber, loginFormHandler, searchHandler, isAuth }) => {

	const [isSidebarClose, setIsSidebarClose] = useState(true);

	const sidebarHandler = () => {
		setIsSidebarClose(!isSidebarClose);
	}


	return (
		<>


			<button
				className="nav-list-item"
				onClick={sidebarHandler}
			>
				<MenuOutlined />
			</button>


			<Link
				className="nav-list-item nav-center"
				to="/"
			>
				<img src={logo} alt="" />
			</Link>

			<Link
				className="nav-list-item"
				to="/cart"
				onClick={cartHandler}
			>
				<ShoppingOutlined />({cartProductsNumber})
			</Link>

			<NavbarSidebar
				isSidebarClose={isSidebarClose}
				sidebarHandler={sidebarHandler}
				loginFormHandler={loginFormHandler}
				searchHandler={searchHandler}
				isAuth={isAuth}
			/>


		</>
	)
}

export default NavbarSmall;