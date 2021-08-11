import axios from "axios";

export const setProducts = (page) => (dispatch) => {

     axios.get(`http://curebox-api.herokuapp.com/v1/products?page=${page}&perPage=10`)
     .then(res => {

          const resData = res.data;
          dispatch({type: 'SET_PRODUCTS', payload: resData.data});
          dispatch({
               type: 'SET_PAGE',
               payload: {
                    totalData: resData.total_data,
                    perPage: resData.per_page,
                    currentPage: resData.current_page,
                    totalPage: Math.ceil(resData.total_data/ resData.per_page),
               }
          })

     })
     .catch(err => {
          console.log(err);
     })
}