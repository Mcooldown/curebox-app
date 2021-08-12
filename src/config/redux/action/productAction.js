import axios from "axios";
import { setIsLoading } from "./generalAction";

export const setForm = (formType, formValue) => {
     return {type: 'SET_PRODUCT_FORM_DATA', formType, formValue};
}

export const clearForm = () => {
     return {type: 'CLEAR_PRODUCT_FORM'};
}

export const setProducts = (page) => (dispatch) => {

     axios.get(`http://curebox-api.herokuapp.com/v1/products?page=${page}&perPage=10`)
     .then(res => {

          const resData = res.data;
          dispatch({type: 'SET_PRODUCTS', payload: resData.data});
          dispatch({
               type: 'SET_PRODUCTS_PAGE',
               payload: {
                    totalData: resData.total_data,
                    perPage: resData.per_page,
                    currentPage: resData.current_page,
                    totalPage: Math.ceil(resData.total_data/ resData.per_page),
               }
          })
          dispatch(setIsLoading(false));

     })
     .catch(err => {
          console.log(err);
     })
}

export const postNewProduct = async (form) => {
     
     const data = await JSON.stringify({
          'name': form.name,
          'description': form.description,
          'price': form.price,
          'productPhoto': form.productPhoto,
          'sellerId': localStorage.getItem('userId'),
     });

     const createProductPromise = axios.post('http://curebox-api.herokuapp.com/v1/products' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = createProductPromise.then(res => res).catch(err => err.response);
     return response;
}