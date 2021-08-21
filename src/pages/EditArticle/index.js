import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { clearForm, setArticle, setForm, updateArticle } from '../../config/redux/action/articleAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';

const EditArticle = (props) => {

     const {form, article} = useSelector(state => state.articleReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();
     const [count, setCount] = useState(0);

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId){
               alert('Not authorized. Please login first');
               history.push('/login');
          }

          async function initialize (){
               await dispatch(setIsLoading(true));
               await dispatch(clearForm());
               await dispatch(setArticle(props.match.params.id));
          }

          if(count === 0){
               initialize().then(() => setCount(count+1));
          }else{
               return null;
          }

     },[dispatch, props, article, count, history]);

     const onImageUpload = (e) => {
          const file = e.target.files[0];
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               dispatch(setForm('articlePhoto', reader.result));
          }
     }

     const onSubmit = (e) => {
          e.preventDefault();
          
          setButtonLoading(true);
          updateArticle(form, article._id)
          .then(res => {
               setButtonLoading(false);
               if(res.status === 200){
                    dispatch(clearForm());
                    alert('Article Updated');
                    return history.push('/articles/user');
               }
               console.log(res);
          });
     }

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <div className="container py-5 my-5">
                         <h1>Edit Article</h1>
                         <hr />
                         <Input label="Title" value={form.title} type="text"
                         onChange={(e) => dispatch(setForm('title', e.target.value))}
                         />
                         <Input label="Content" value={form.content} type="text"
                         onChange={(e) => dispatch(setForm('content', e.target.value))}
                         />
                         <Upload label="Article Photo" img={form.articlePhoto} onChange={(e) => onImageUpload(e)}  />
                         
                         {
                              buttonLoading ?
                              <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                              :
                              <Button background="#287E00" title="Submit" isLoading={buttonLoading} onClick={onSubmit} />
                         }
                    </div>
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(EditArticle);