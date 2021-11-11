import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { pathConverter } from '../../../utils/pathConverter';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import '../Navbar.css';

const NavbarCatalog = () => {

	const categories = useSelector(state => state.data.categories);

	const [isCatalogClose, setIsCatalogClose] = useState(true);

	const catalogHandler = () => {
		setIsCatalogClose(!isCatalogClose)
	}

	return (
		<>
			<button
				className="nav-list-item"
				onClick={catalogHandler}
			>
				CATALOG <span style={{ fontSize: 12, verticalAlign: 'middle' }}><DownOutlined /></span>
			</button>


			<CSSTransition
				in={!isCatalogClose}
				timeout={300}
				unmountOnExit
				mountOnEnter
				classNames="nav-dropdown-animation"
			>
				<div className="nav-dropdown">
					{
						categories && categories.map(item => {
							return (
								<Link
									to={'/catalog/' + pathConverter(item)}
									key={item}
									onClick={catalogHandler}
								>
									{item}
								</Link>
							)
						})
					}
				</div>
			</CSSTransition>

		</>
	)
}

export default NavbarCatalog;