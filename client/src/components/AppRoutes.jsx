import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import OrderPage from './OrderPage/OrderPage';
import Product from './Product/Product';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import SmallCardList from './SmallCardList/SmallCardList';
import './AppRoutes.css';

const AppRoutes = () => {

	const isAuth = useSelector(state => state.auth.isAuth);
	const cart = useSelector(state => state.cart.cart);


	return (
		<main className="main-container">
			<Switch>
				<Route path="/" component={SmallCardList} exact />
				{isAuth && <Route exact path="/cart" component={ShoppingCart} />}
				{isAuth && cart && cart.length && <Route exact path="/order" component={OrderPage} />}
				<Route exact path="/catalog/:categoryName" component={SmallCardList} />
				<Route exact path="/catalog/:categoryName/:productId" component={Product} />
				<Redirect to={"/"} />
			</Switch>
		</main>
	)

}

export default AppRoutes;