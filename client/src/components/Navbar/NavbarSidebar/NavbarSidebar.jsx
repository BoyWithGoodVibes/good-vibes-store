import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './NavbarSidebar.css';
import { useSelector } from 'react-redux';
import { pathConverter } from '../../../utils/pathConverter';
import { Link } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { CSSTransition } from 'react-transition-group';

const NavbarSidebar = ({ isSidebarClose, sidebarHandler, loginFormHandler, searchHandler, isAuth }) => {

	const categories = useSelector(state => state.data.categories);

	const [isCatalogClose, setIsCatalogClose] = useState(true);


	const catalogHandler = () => {
		setIsCatalogClose(!isCatalogClose);
	}



	return (
		<>
			<CSSTransition
				in={!isSidebarClose}
				mountOnEnter
				unmountOnExit
				timeout={300}
				classNames="nav-sidebar-animation"
			>
				<div className="nav-sidebar">

					<div className="nav-sidebar-catalog-container">
						<p
							className="nav-sidebar-item"
							onClick={() => setIsCatalogClose(!isCatalogClose)}
						>
							CATALOG
						</p>


						{
							categories && categories.map(item => {
								return (
									<CSSTransition
										in={!isCatalogClose}
										unmountOnExit
										mountOnEnter
										timeout={300}
										classNames="nav-sidebar-catalog-item-animation"
										key={item}
									>
										<p

											className="nav-sidebar-catalog-item"
										>
											<Link
												to={'/catalog/' + pathConverter(item)}
												onClick={() => {
													catalogHandler();
													sidebarHandler();
												}}
											>
												{item}
											</Link>
										</p>
									</CSSTransition>
								)
							})
						}



					</div>


					<p
						className="nav-sidebar-item"
						onClick={() => {
							searchHandler();
							sidebarHandler();
						}}
					>
						SEARCH
					</p>


					<p
						className="nav-sidebar-item"
						onClick={() => {
							loginFormHandler();
							sidebarHandler();
						}}
					>
						{isAuth ? 'LOGOUT' : 'LOG IN'}
					</p>

					<button
						className="nav-sidebar-close"
						onClick={sidebarHandler}
					>
						<CloseOutlined />
					</button>

				</div>
			</CSSTransition>

			<Backdrop
				isDepComponentClose={isSidebarClose}
				close={sidebarHandler}
			/>

		</>
	)
}

export default NavbarSidebar;