import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import generalReducer from "./generalReducer";
import cartReducer from "./cartReducer";
import transactionReducer from "./transactionReducer";

const reducer = combineReducers({authReducer, productReducer, generalReducer, cartReducer
,transactionReducer});

export default reducer;