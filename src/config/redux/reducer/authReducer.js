const initialState = {
     form: {
          name: '',
          gender: '',
          address: '',
          dateOfBirth: '',
          phoneNumber: '',
          email: '',
          password: '',
          passwordConfirm: '',
     },
     errors: {
          name: '',
          gender: '',
          address: '',
          dateOfBirth: '',
          phoneNumber: '',
          email: '',
          password: '',
          passwordConfirm: '',
     }
}

const authReducer = (state = initialState, action) => {

     if(action.type === 'SET_FORM_DATA'){
          return {
               ...state,
               form : {
                    ...state.form,
                    [action.formType] : action.formValue
               }
          }
     }else if(action.type === 'CLEAR_FORM'){
         return {
               ...state,
               form : {
                    ...state.form,
                    name: '',
                    gender: '',
                    address: '',
                    dateOfBirth: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
               }
          }

     }else if(action.type === 'SET_ERRORS'){
          return {
               ...state,
               errors : {
                    ...state.errors,
                    [action.errorType] : action.errorMessage
               }
          }
     }else if(action.type === 'CLEAR_ERRORS'){
          return {
               ...state,
               errors : {
                    ...state.errors,
                    name: '',
                    gender: '',
                    address: '',
                    dateOfBirth: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
               }
          }
     }
     return state;
}

export default authReducer;