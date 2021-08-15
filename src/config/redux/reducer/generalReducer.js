const initialState = {
     isLoading: false,
}

const generalReducer = (state = initialState, action) => {

     if(action.type === 'SET_IS_LOADING'){
          return {
               ...state,
               isLoading: action.payload,
          }
     }

     return state;
}

export default generalReducer;