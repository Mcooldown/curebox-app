import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const reducer = combineReducers({authReducer, productReducer});

export default reducer;