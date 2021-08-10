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
     }
}

const registerReducer = (state = initialState, action) => {

     if(action.type === 'SET_FORM_DATA'){
          return {
               ...state,
               form : {
                    ...form,
                    [action.formType] : action.formValue
               }
          }
     }
     return state;
}

export default registerReducer;