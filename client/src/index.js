import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
	,
	document.getElementById('root')
);
