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
          profilePhoto: '',
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
          profilePhoto: '',
     },
     user: [],
}

const authReducer = (state = initialState, action) => {

     if(action.type === 'SET_AUTH_FORM_DATA'){
          return {
               ...state,
               form : {
                    ...state.form,
                    [action.formType] : action.formValue
               }
          }
     }else if(action.type === 'CLEAR_AUTH_FORM'){
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
                    profilePhoto: '',
               }
          }

     }else if(action.type === 'SET_AUTH_ERRORS'){
          return {
               ...state,
               errors : {
                    ...state.errors,
                    [action.errorType] : action.errorMessage
               }
          }
     }else if(action.type === 'CLEAR_AUTH_ERRORS'){
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
                    profilePhoto: '',
               }
          }
     }else if( action.type === 'SET_USER'){
          return {
               ...state,
               user: action.payload,
          }
     }
     return state;
}

export default authReducer;