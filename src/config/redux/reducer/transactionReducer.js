const initialState = {
     transactions: [],
     form: {
          sendAddress: '',
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
                    sendAddress: '',
                    receiverName: '',
                    receiverPhoneNumber:'',
                    notes: ''
               }
          }
     }

     return state;
}

export default transactionReducer;