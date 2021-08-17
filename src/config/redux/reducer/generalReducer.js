const initialState = {
     isLoading: false,
     searchValue: null,
}

const generalReducer = (state = initialState, action) => {

     if(action.type === 'SET_IS_LOADING'){
          return {
               ...state,
               isLoading: action.payload,
          }
     }
     if(action.type === 'SET_SEARCH_VALUE'){
          return {
               ...state,
               searchValue: action.payload,
          }
     }

     return state;
}

export default generalReducer;