const initialState = {
     cartItems: [],
     totalPayment: 0,
}

const cartReducer = (state = initialState, action) => {

     if(action.type === 'SET_CART_ITEMS'){
          return {
               ...state,
               cartItems: action.payload,
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

export default cartReducer;