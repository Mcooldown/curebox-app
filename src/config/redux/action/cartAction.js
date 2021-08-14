import axios from "axios";
import { countTotalPayment, setIsLoading } from "./generalAction";

export const addCartItem = (data) => {

     const createCartItemPromise = axios.post('https://curebox-api.herokuapp.com/v1/cart' ,JSON.stringify(data), {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = createCartItemPromise.then(res => res).catch(err => err.response);
     return response;
}

export const setCartItems = (userId) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/cart/${userId}`)
     .then((res) => {
          
          const resData = res.data;
          dispatch({type: 'SET_TOTAL_PAYMENT', payload: countTotalPayment(resData.data)});
          dispatch({type: 'SET_CART_ITEMS', payload: resData.data});
          dispatch(setIsLoading(false));
     })
     .catch(err => {
          console.log(err);
     })
}

export const removeCartItems = (cartItemId, userId) => (dispatch) => {
     
     axios.delete(`https://curebox-api.herokuapp.com/v1/cart/${cartItemId}`)
     .then((res) => {
          dispatch(setCartItems(userId));
     })
     .catch(err => {
          console.log(err);
     })
}

export const changeCartItemQuantity = (cartItemId, quantity, userId) => (dispatch) => {

     const data = JSON.stringify({
          quantity: quantity
     });

     axios.put(`https://curebox-api.herokuapp.com/v1/cart/${cartItemId}`, data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })
     .then((res) => {
          dispatch(setCartItems(userId));
     })
     .catch(err => {
          console.log(err);
     })
}
