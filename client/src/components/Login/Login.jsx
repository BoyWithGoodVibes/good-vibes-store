import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { login, register } from '../../actions/auth';
import Backdrop from '../UI/Backdrop/Backdrop';
import { useSelector } from 'react-redux';
import { Notification } from '../UI/Notification';
import './Login.css';
import { CSSTransition } from 'react-transition-group';


const Login = ({ closeLogin, isLoginClose }) => {

	const dispatch = useDispatch();

	const err = useSelector(state => state.auth.error);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitRegistration = () => {
		dispatch(register({ email, password }));
		closeLogin();
	}

	const submitLogin = async () => {
		dispatch(login({ email, password }));
		closeLogin();
	}

	useEffect(() => {
		if (err) {
			Notification(
				'error',
				err
			)
		}
	}, [err])


	return (
		<>
			<CSSTransition
				in={!isLoginClose}
				mountOnEnter
				unmountOnExit
				timeout={300}
				classNames="login-form-animation"
			>
				<Form
					size="large"
					name="normal_login"
					className="login-form"
				>


					<p className="login-form-title">
						Welcome !
					</p>


					<Form.Item
						name="email"
						rules={[{ required: true, message: 'Please input your email!' }]}
					>

						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

					</Form.Item>


					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>

						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

					</Form.Item>


					<Form.Item>

						<Button
							type="primary"
							block
							className="login-form-button"
							onClick={submitLogin}
						>
							Log in
						</Button>

					</Form.Item>


					<Form.Item>

						<Button
							block className="login-form-button"
							onClick={submitRegistration}
						>
							Sign Up
						</Button>

					</Form.Item>


				</Form>

			</CSSTransition>

			<Backdrop
				isDepComponentClose={isLoginClose}
				close={closeLogin}
			/>
		</>
	)
}

export default Login;