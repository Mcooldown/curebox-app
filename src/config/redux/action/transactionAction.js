import axios from "axios";
import { setIsLoading } from "./generalAction";

export const setForm = (formType, formValue) => {
     return {type: 'SET_TRANSACTION_FORM_DATA', formType, formValue};
}

export const clearForm = () => {
     return {type: 'CLEAR_TRANSACTION_FORM'};
}

export const setErrors = (errorType, errorMessage) => {
     return {type: 'SET_TRANSACTION_ERRORS', errorType, errorMessage};
}

export const clearErrors = () => {
     return {type: 'CLEAR_TRANSACTION_ERRORS'};
}

export const checkoutTransaction = (form, amount) => {
     
     const data = JSON.stringify({
          userId: localStorage.getItem('userId'),
          sendAddress: form.sendAddress,
          receiverName: form.receiverName,
          receiverPhoneNumber: form.receiverPhoneNumber,
          notes: form.notes,
          amount: amount,
     });

     const checkoutPromise = axios.post('https://curebox-api.herokuapp.com/v1/transactions' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })
     const response = checkoutPromise.then(res => res).catch(err => err.response);
     return response;
}

export const setTransactions = (userId) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/transactions/${userId}`)
     .then((res) => {
          
          const resData = res.data;
          dispatch({type: 'SET_TRANSACTIONS', payload: resData.data});
          dispatch(setIsLoading(false));
     })
     .catch(err => {
          console.log(err);
     })
}

export const setTransactionDetails = (transactionId) => (dispatch) => {

     axios.get(`http://localhost:4000/v1/transactions/detail/${transactionId}`)
     .then(res => {
          const resData = res.data;

          async function finalize(){
               await dispatch({type: 'SET_TRANSACTION_DETAILS', payload: resData.data});
          }
          finalize().then(() => dispatch(setIsLoading(false)));
     })
     .catch(err => {
          console.log(err);
     });
}