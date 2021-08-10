import axios from "axios";

export const setForm = (formType, formValue) => {
     return {type: 'SET_FORM_DATA', formType, formValue};
}

export const clearForm = () => {
     return {type: 'CLEAR_FORM'};
}

export const setErrors = (errorType, errorMessage) => {
     return {type: 'SET_ERRORS', errorType, errorMessage};
}

export const clearErrors = () => {
     return {type: 'CLEAR_ERRORS'};
}

export const registerNewUser = (form) => {

     const data = JSON.stringify({
          'name': form.name,
          'gender': form.gender,
          'address': form.address,
          'dateOfBirth': form.dateOfBirth,
          'phoneNumber': form.phoneNumber,
          'email': form.email,
          'password': form.password,
          'passwordConfirm': form.passwordConfirm
     });

     const registerPromise = axios.post('http://curebox-api.herokuapp.com/v1/auth/register' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = registerPromise.then(res => res).catch(err => err.response);
     return response;
}

export const login = (form) => {

     const data = JSON.stringify({
          'email': form.email,
          'password': form.password,
     });

     const loginPromise = axios.post('http://curebox-api.herokuapp.com/v1/auth/login' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = loginPromise.then(res => res).catch(err => err.response);
     return response;
}

