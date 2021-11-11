import React, { useState } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import NavbarSearchProduct from './NavbarSearchProduct';
import './NavbarSearchInput.css';
import { CSSTransition } from 'react-transition-group';

const NavbarSearchInput = ({ isSearchClose, closeInput }) => {

	const [inputValue, setInputValue] = useState('');


	//const products = useSelector(state => state.data.products.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()))); // !!!!!!!!!!!!!!!!!!!
	const products = useSelector(state => state.data.products);

	return (
			<>
				<CSSTransition
					in={!isSearchClose}
					unmountOnExit
					mountOnEnter
					timeout={300}
					classNames="search-input-animation"
				>
					<div className="search-input-container">
						<SearchOutlined />
						<input
							className="search-input"
							placeholder="SEARCH..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<CloseOutlined
							className="search-close"
							onClick={closeInput}
						/>
					</div>
				</CSSTransition>


				{
					inputValue ?
						<div className="search-products-list">
							{
								products
									.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()))
									.map(item => {
										return (
											<NavbarSearchProduct
												item={item}
												key={item.title}
												closeInput={closeInput}
												resetInputValue={() => setInputValue('')}
											/>
										)
									})
							}
						</div>
						:
						null
				}

			</>
		)
}

export default NavbarSearchInput;