const initialState = {
     cartItems: [],
}

const cartReducer = (state = initialState, action) => {

     if(action.type === 'SET_CART_ITEMS'){
          return {
               ...state,
               cartItems: action.payload,
          }
     }

     return state;
}

export default cartReducer;