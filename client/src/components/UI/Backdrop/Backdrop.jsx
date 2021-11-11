import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Backdrop.css';

const Backdrop = ({ isDepComponentClose, close }) => {
	return (
		<CSSTransition
			in={!isDepComponentClose}
			unmountOnExit
			mountOnEnter
			timeout={200}
			classNames="backdrop-animation"
		>
			<div className="backdrop" onClick={close}></div>
		</CSSTransition>
	)
}

export default Backdrop;