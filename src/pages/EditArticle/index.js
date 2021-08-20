import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { clearForm, setArticle, setForm, updateArticle } from '../../config/redux/action/articleAction';

const EditArticle = (props) => {

     const {form, article} = useSelector(state => state.articleReducer);
     const [imgPreview, setImgPreview] = useState('');
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId){
               alert('Not authorized. Please login first');
               history.push('/login');
          }

          async function initialize (){
               await dispatch(clearForm());
               await dispatch(setArticle(props.match.params.id));
               await dispatch(setForm('title', article.title));
               await dispatch(setForm('content', article.content));
               await setImgPreview(article.articlePhoto);
          }
          initialize();

     },[history, dispatch, props, article])

     const onImageUpload = (e) => {
          const file = e.target.files[0];
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               setImgPreview(reader.result);
               dispatch(setForm('articlePhoto', reader.result));
          }
     }

     const onSubmit = (e) => {
          e.preventDefault();
          
          setButtonLoading(true);
          updateArticle(form, localStorage.getItem('userId'))
          .then(res => {
               setButtonLoading(false);
               if(res.status === 200){
                    dispatch(clearForm());
                    alert('Article Updated');
                    history.push('/articles/user');
               }
          });
     }

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
                    <Upload label="Article Photo" img={imgPreview} onChange={(e) => onImageUpload(e)}  />
                    
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
}

export default withRouter(EditArticle);