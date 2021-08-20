import axios from "axios";
import { setIsLoading } from "./generalAction";

export const setForm = (formType, formValue) => {
     return {type: 'SET_ARTICLE_FORM_DATA', formType, formValue};     
}

export const clearForm = () => {
     return {type: 'CLEAR_ARTICLE_FORM'};
}

export const setErrors = (errorType, errorMessage) => {
     return {type: 'SET_ARTICLE_ERRORS', errorType, errorMessage};
}

export const clearErrors = () => {
     return {type: 'CLEAR_ARTICLE_ERRORS'};
}

export const postNewArticle = async (form) => {
     
     const data = await JSON.stringify({
          'title': form.title,
          'content': form.content,
          'articlePhoto': form.articlePhoto,
          'userId': localStorage.getItem('userId'),
     });

     const createArticlePromise = axios.post('https://curebox-api.herokuapp.com/v1/articles' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = createArticlePromise.then(res => res).catch(err => err.response);
     return response;
}

export const setArticles = (currentPage, perPage) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/articles?currentPage=${currentPage}&perPage=${perPage}`)
     .then((res) => {

          const resData = res.data;
          dispatch({type: 'SET_ARTICLES', payload: resData.data});
          dispatch({
               type: 'SET_ARTICLES_PAGE',
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

export const setUserArticles = (userId, currentPage, perPage) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/articles/user/${userId}?currentPage=${currentPage}&perPage=${perPage}`)
     .then((res) => {

          const resData = res.data;
          dispatch({type: 'SET_ARTICLES', payload: resData.data});
          dispatch({
               type: 'SET_ARTICLES_PAGE',
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

export const setArticle = (articleId) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/articles/${articleId}`)
     .then(res => {

          const resData = res.data;
          dispatch({type: 'SET_ARTICLE', payload: resData.data});
          dispatch(setIsLoading(false));
     })
     .catch(err => {
          console.log(err);
     })
}

export const deleteArticle = (userId, articleId) => (dispatch) => {
     axios.delete(`https://curebox-api.herokuapp.com/v1/articles/${articleId}`)
     .then((res) => {
          dispatch(setUserArticles(userId, 1, 8));
          dispatch(setIsLoading(false));
     })
     .catch(err => {
          console.log(err);
     })
}

export const updateArticle = (form, articleId) => {
     
     const data = JSON.stringify({
          'title': form.title,
          'content': form.content,
          'articlePhoto': form.articlePhoto,
     });

     const updateArticlePromise =  axios.put(`https://curebox-api.herokuapp.com/v1/articles/${articleId}`, data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = updateArticlePromise.then(res => res).catch(err => err.response);
     return response;
}