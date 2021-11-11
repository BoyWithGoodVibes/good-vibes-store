import React from 'react';
import { ShoppingOutlined, SearchOutlined } from '@ant-design/icons';
import NavbarCatalog from './NavbarCatalog/NavbarCatalog';
import './Navbar.css';
import { Link } from 'react-router-dom';

const NavbarLarge = ({logo, searchHandler, cartHandler, cartProductsNumber, loginFormHandler, isAuth}) => {
	return (
		<>
			<div className="nav-start nav-list-item">

				<NavbarCatalog />

			</div>



			<Link
				className="nav-list-item nav-center"
				to="/"
			>
				<img src={logo} alt="" />
			</Link>




			<div className="nav-end">


				<button
					className="nav-list-item"
					onClick={searchHandler}
				>
					<SearchOutlined />
				</button>


				<span className="nav-list-separator">
					&nbsp;/&nbsp;
				</span>


				<Link
					className="nav-list-item"
					to="/cart"
					onClick={cartHandler}
				>
					<ShoppingOutlined />({cartProductsNumber})
				</Link>


				<span className="nav-list-separator">
					&nbsp;/&nbsp;
				</span>


				<button
					className="nav-list-item"
					onClick={loginFormHandler}
				>
					{isAuth ? "LOGOUT" : "LOG IN"}
				</button>


			</div>
		</>
	)
}

export default NavbarLarge;