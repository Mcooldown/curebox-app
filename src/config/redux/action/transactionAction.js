import axios from "axios";

export const setForm = (formType, formValue) => {
     return {type: 'SET_TRANSACTION_FORM_DATA', formType, formValue};
}

export const clearForm = () => {
     return {type: 'CLEAR_TRANSACTION_FORM'};
}

export const checkoutTransaction = (form) => {
     
     const data = JSON.stringify({
          userId: localStorage.getItem('userId'),
          sendAddress: form.sendAddress,
          receiverName: form.receiverName,
          receiverPhoneNumber: form.receiverPhoneNumber,
          notes: form.notes,
     });

     const checkoutPromise = axios.post('http://curebox-api.herokuapp.com/v1/transactions' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })
     const response = checkoutPromise.then(res => res).catch(err => err.response);
     return response;
}