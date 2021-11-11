import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'antd';
import OrderInput from './OrderInput';
import { confirmOrder } from '../../actions/cart';
import './OrderForm.css';
import { Notification } from '../UI/Notification';

const OrderForm = () => {

	const dispatch = useDispatch();

	const cart = useSelector(state => state.cart.cart);
	const order = useSelector(state => state.cart.order);

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [email, setEmail] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');

	const array = [
		{ id: 'name', value: name, setValue: (e) => setName(e.target.value), label: 'NAME' },
		{ id: 'surname', value: surname, setValue: (e) => setSurname(e.target.value), label: 'SURNAME' },
		{ id: 'middlename', value: middleName, setValue: (e) => setMiddleName(e.target.value), label: 'MIDDLE NAME' },
		{ id: 'email', value: email, setValue: (e) => setEmail(e.target.value), label: 'E-MAIL' },
		{ id: 'street', value: street, setValue: (e) => setStreet(e.target.value), label: 'STREET' },
		{ id: 'city', value: city, setValue: (e) => setCity(e.target.value), label: 'CITY' },
		{ id: 'country', value: country, setValue: (e) => setCountry(e.target.value), label: 'COUNTRY' },
	];

	const formHandler = (e) => {
		e.preventDefault();
	}

	useEffect(() => {
		if (order) {
			Notification(
				'success',
				'Order confirmed',
				`Your order number is ${order}`,
				0
			)
		}
	}, [order])

	return cart && cart.length ?
		(
			<Form
				className="order-form-container"
				labelCol={{ span: 24 }}
				onSubmit={(e) => formHandler(e)}
			>

				<p className="order-form-header">
					YOUR PERSONAL DETAILS
				</p>

				{
					array.map(item => {
						return (
							<OrderInput
								key={item.id}
								id={item.id}
								value={item.value}
								setValue={item.setValue}
								label={item.label}
							/>
						)
					})
				}


				<Button
					className="order-form-button"
					type="primary"
					onClick={() => dispatch(confirmOrder({ name, surname, middleName, email, street, city, country }, cart))}
				>
					Submit
				</Button>

			</Form>
		)
		:
		(
			null
		)
}

export default OrderForm;
