import React from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './InputNumber.css';

const InputNumber = ({increase, decrease, quantity}) => {
	return (
		<div className="product-input">
			
			<button 
				className="product-input-button"
				onClick={decrease}
			>
				<MinusOutlined />
			</button>

			<span 
				className="product-input-output"
			>
				{quantity}
			</span>

			<button
				className="product-input-button"
				onClick={increase}
			>
				<PlusOutlined />
			</button>

		</div>
	)
}

export default InputNumber;