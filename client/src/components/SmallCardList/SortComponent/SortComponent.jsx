import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { sortBy } from '../../../actions/data';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './SortComponent.css';

const SortComponent = ({ products }) => {

	const dispatch = useDispatch();


	const [isSortClose, setIsSortClose] = useState(true);

	const sortHandler = () => {
		setIsSortClose(!isSortClose)
	}

	const onSortItemClick = (key) => {
		dispatch(sortBy(products, key));
		sortHandler();
	}



	return (
		<>
			<div className="sort-container">
				<button
					className="sort-button"
					onClick={sortHandler}
				>
					SORT <span style={{ fontSize: 12, verticalAlign: 'middle' }}><DownOutlined /></span>


				</button>

				<CSSTransition
					in={!isSortClose}
					timeout={300}
					mountOnEnter
					unmountOnExit
					classNames="sort-dropdown-animation"
				>
					<div className="sort-dropdown">
						<p
							key="1"
							onClick={() => onSortItemClick('increasePrice')}
						>
							Ascending
						</p>

						<p
							key="2"
							onClick={() => onSortItemClick('decreasePrice')}
						>
							Descending
						</p>
					</div>
				</CSSTransition>

			</div>
		</>
	)
}

export default SortComponent;