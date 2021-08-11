const initialState = {
     products: [],
     page: {
          totalData: 0,
          perPage: 10,
          currentPage: 1,
          totalPage: 0,
     }
};

const productReducer = (state = initialState, action) => {

     if(action.type === 'SET_PRODUCTS'){
          return {
               ...state,
               products: action.payload,
          }
     }
     if(action.type === 'SET_PAGE'){
          return {
               ...state,
               page: action.payload,
          }
     }

     return state;
};

export default productReducer;