import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import generalReducer from "./generalReducer";
import cartReducer from "./cartReducer";

const reducer = combineReducers({authReducer, productReducer, generalReducer, cartReducer});

export default reducer;