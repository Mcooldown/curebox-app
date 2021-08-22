import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import generalReducer from "./generalReducer";
import cartReducer from "./cartReducer";
import transactionReducer from "./transactionReducer";
import articleReducer from "./articleReducer";
import forumReducer from "./forumReducer";

const reducer = combineReducers({authReducer, productReducer, generalReducer, cartReducer
,transactionReducer, articleReducer, forumReducer});

export default reducer;