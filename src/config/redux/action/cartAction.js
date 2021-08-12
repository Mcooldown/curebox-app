import axios from "axios";
import { setIsLoading } from "./generalAction";

export const addCartItem = (data) => {

     const createCartItemPromise = axios.post('http://curebox-api.herokuapp.com/v1/cart' ,JSON.stringify(data), {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = createCartItemPromise.then(res => res).catch(err => err.response);
     return response;
}

export const setCartItems = (userId) => (dispatch) => {

     axios.get(`http://curebox-api.herokuapp.com/v1/cart/${userId}`)
     .then(res => {
          const resData = res.data;
          dispatch({type: 'SET_CART_ITEMS', payload: resData.data});
          dispatch(setIsLoading(false));
     })
     .catch(err => {
          console.log(err);
     })
}

export const setTotalPayment = (value) => {
     return {type: 'SET_TOTAL_PAYMENT', payload: value};
}