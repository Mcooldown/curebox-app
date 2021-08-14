const initialState = {
     isLoading: false,
     totalPayment: '',
}

const generalReducer = (state = initialState, action) => {

     if(action.type === 'SET_IS_LOADING'){
          return {
               ...state,
               isLoading: action.payload,
          }
     }
     if(action.type === 'SET_TOTAL_PAYMENT'){
          return {
               ...state,
               totalPayment: action.payload,
          }
     }

     return state;
}

export default generalReducer;