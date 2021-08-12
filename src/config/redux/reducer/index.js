import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import generalReducer from "./generalReducer";

const reducer = combineReducers({authReducer, productReducer, generalReducer});

export default reducer;