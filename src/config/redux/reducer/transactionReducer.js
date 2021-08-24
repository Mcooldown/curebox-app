const initialState = {
     transactions: [],
     transactionDetails: [],
     form: {
          address: '',
          province: '',
          cityDistrict: '',
          subDistrict: '',
          urbanVillage: '',
          postalCode: '',
          receiverName: '',
          receiverPhoneNumber: '',
          notes: ''
     },
     errors:{
          address: '',
          province: '',
          cityDistrict: '',
          subDistrict: '',
          urbanVillage: '',
          postalCode: '',
          receiverName: '',
          receiverPhoneNumber: '',
          notes: ''
     }
}

const transactionReducer = (state = initialState, action) => {

     if(action.type === 'SET_TRANSACTION_FORM_DATA'){
          return {
               ...state,
               form: {
                    ...state.form,
                    [action.formType] : action.formValue,
               }
          };
     }
     if(action.type === 'CLEAR_TRANSACTION_FORM'){
          return {
               ...state,
               form:{
                    address: '',
                    province: '',
                    cityDistrict: '',
                    subDistrict: '',
                    urbanVillage: '',
                    postalCode: '',
                    receiverName: '',
                    receiverPhoneNumber: '',
                    notes: ''
               }
          }
     }
     if(action.type === 'SET_TRANSACTIONS'){
          return {
               ...state,
               transactions : action.payload,
          }
     }
     if(action.type === 'SET_TRANSACTION_ERRORS'){
          return {
               ...state,
               errors : {
                    ...state.errors,
                    [action.errorType] : action.errorMessage
               }
          }
     }
     if(action.type === 'CLEAR_TRANSACTION_ERRORS'){
          return {
               ...state,
               errors : {
                    address: '',
                    province: '',
                    cityDistrict: '',
                    subDistrict: '',
                    urbanVillage: '',
                    postalCode: '',
                    receiverName: '',
                    receiverPhoneNumber: '',
                    notes: ''
               }
          }
     }
     if(action.type === 'SET_TRANSACTION_DETAILS'){
          return {
               ...state,
               transactionDetails: action.payload,
          }
     }

     return state;
}

export default transactionReducer;