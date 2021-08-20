import axios from "axios";
import { setIsLoading } from "./generalAction";

export const setForm = (formType, formValue) => {
     return {type: 'SET_PRODUCT_FORM_DATA', formType, formValue};
}

export const clearForm = () => {
     return {type: 'CLEAR_PRODUCT_FORM'};
}

export const clearProducts = () => {
     return {type: 'CLEAR_PRODUCTS'};
}

export const setProducts = (currentPage, perPage, searchValue = null) => (dispatch) => {

     const link = searchValue ? 
     `https://curebox-api.herokuapp.com/v1/products?currentPage=${currentPage}&perPage=${perPage}
     &searchValue=${searchValue}` :
     `https://curebox-api.herokuapp.com/v1/products?currentPage=${currentPage}&perPage=${perPage}`;

     axios.get(link)
     .then((res) => {

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

export const setStoreProducts = (userId, currentPage, perPage) => (dispatch) => {
     
     axios.get(`https://curebox-api.herokuapp.com/v1/products/store/${userId}?page=${currentPage}&perPage=${perPage}`)
     .then((res) => {

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

     const createProductPromise = axios.post('https://curebox-api.herokuapp.com/v1/products' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = createProductPromise.then(res => res).catch(err => err.response);
     return response;
}

export const setProduct = (productId) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/products/${productId}`)
     .then(res => {

          const resData = res.data;
          dispatch({type: 'SET_PRODUCT', payload: resData.data});
          dispatch(setIsLoading(false));
     })
     .catch(err => {
          console.log(err);
     })
}

export const updateProduct = (form, productId) => {
     
     const data = JSON.stringify({
          'name': form.name,
          'description': form.description,
          'price': form.price,
          'productPhoto': form.productPhoto,
     });

     const updateProductPromise =  axios.put(`https://curebox-api.herokuapp.com/v1/products/${productId}`, data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = updateProductPromise.then(res => res).catch(err => err.response);
     return response;
}

export const deleteProduct = (productId, userId) => (dispatch) => {
     
     axios.delete(`https://curebox-api.herokuapp.com/v1/products/${productId}`)
     .then((res) => {
          dispatch(setStoreProducts(userId, 1, 8));
          dispatch(setIsLoading(false));
     })
     .catch(err => {
          console.log(err);
     })
}