import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { dataReducer } from "./dataReducer";


export const rootReducer = combineReducers({
	auth: authReducer,
	data: dataReducer,
	cart: cartReducer
})