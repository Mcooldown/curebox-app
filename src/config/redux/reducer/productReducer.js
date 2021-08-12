const initialState = {
     products: [],
     page: {
          totalData: 0,
          perPage: 10,
          currentPage: 1,
          totalPage: 0
     },
     form: {
          name: '',
          price: '',
          description: '',
          productPhoto: ''
     }
};

const productReducer = (state = initialState, action) => {

     if(action.type === 'SET_PRODUCTS'){
          return {
               ...state,
               products: action.payload,
          }
     }
     if(action.type === 'SET_PRODUCTS_PAGE'){
          return {
               ...state,
               page: action.payload,
          }
     }
     if(action.type === 'SET_PRODUCT_FORM_DATA'){
          return {
               ...state,
               form: {
                    ...state.form,
                    [action.formType] : action.formValue,
               }
          }
     }
     if(action.type === 'CLEAR_PRODUCT_FORM'){
          return {
               ...state,
               form: {
                    name: '',
                    price: '',
                    description: '',
                    productPhoto: ''
               }
          }
     }

     return state;
};

export default productReducer;