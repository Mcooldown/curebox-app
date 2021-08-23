import axios from "axios";
import { setIsLoading } from "./generalAction";

export const setForm = (formType, formValue) => {
     return {type: 'SET_FORUM_FORM_DATA', formType, formValue};
}

export const clearForm = () => {
     return {type: 'CLEAR_FORUM_FORM'};
}

export const setErrors = (errorType, errorMessage) => {
     return {type: 'SET_FORUM_ERRORS', errorType, errorMessage};
}

export const clearErrors = () => {
     return {type: 'CLEAR_FORUM_ERRORS'};
}

export const postNewForum = async (form) => {
     
     const data = await JSON.stringify({
          'title': form.title,
          'content': form.content,
          'price': form.price,
          'forumPhoto': form.forumPhoto,
          'userId': localStorage.getItem('userId'),
     });

     const createForumPromise = axios.post('https://curebox-api.herokuapp.com/v1/forums' ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = createForumPromise.then(res => res).catch(err => err.response);
     return response;
}

export const postNewForumDetail = (form, forumId) => {

     const data = JSON.stringify({
          'content': form.content,
          'forumPhoto': form.forumPhoto,
          'userId': localStorage.getItem('userId'),
     });

     const createForumDetailPromise = axios.post(`https://curebox-api.herokuapp.com/v1/forums/detail/${forumId}` ,data, {
          headers: {
               'Content-Type': 'application/json',
          }
     })

     const response = createForumDetailPromise.then(res => res).catch(err => err.response);
     return response;
}

export const setForums = (currentPage, perPage) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/forums?currentPage=${currentPage}&perPage=${perPage}`)
     .then((res) => {

          const resData = res.data;
          dispatch({type: 'SET_FORUMS', payload: resData.data});
          dispatch({
               type: 'SET_FORUMS_PAGE',
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

export const setForum = (forumId) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/forums/${forumId}`)
     .then(res => {
          const resData = res.data;
          dispatch({type: 'SET_FORUM', payload: resData.data});
     })
     .catch(err => {
          console.log(err);
     });
}

export const setForumDetails = (forumId) => (dispatch) => {

     axios.get(`https://curebox-api.herokuapp.com/v1/forums/detail/${forumId}`)
     .then(res => {
          const resData = res.data;

          async function finalize(){
               await dispatch({type: 'SET_FORUM_DETAILS', payload: resData.data});
          }
          finalize().then(() => dispatch(setIsLoading(false)));
     })
     .catch(err => {
          console.log(err);
     });
}
