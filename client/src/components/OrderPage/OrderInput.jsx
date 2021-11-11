import React from 'react';
import { Input , Form } from 'antd';
import './OrderInput.css';

const OrderInput = (props) => {


	return (
		<Form.Item 
			className="order-form-input"
			name={props.id}
			label={props.label}
			rules={[{ required: true, message: `Please input your ${props.label} !` }]}
		>
			
			<Input
				id={props.id}
				value={props.value}
				onChange={props.setValue}
			/>

		</Form.Item>
	)
}

export default React.memo(OrderInput, (prevProps, nextProps) => prevProps.value === nextProps.value);