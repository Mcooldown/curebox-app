import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { clearForm, postNewArticle, setForm } from '../../config/redux/action/articleAction';

const CreateArticle = () => {

     const {form} = useSelector(state => state.articleReducer);
     const [imgPreview, setImgPreview] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId){
               alert('Not authorized. Please login first');
               history.push('/login');
          }
     },[history])

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
          if(imgPreview === '')return alert('Image required');
          
          setIsLoading(true);
          postNewArticle(form)
          .then(res => {
               setIsLoading(false);
               if(res.status === 201){
                    dispatch(clearForm());
                    alert('New Article Added');
                    history.push('/articles');
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
               <div className="container py-5 my-5">
                    <h1>Create Article</h1>
                    <hr />
                    <Input label="Title" value={form.title} type="text"
                    onChange={(e) => dispatch(setForm('title', e.target.value))}
                    />
                    <Input label="Content" value={form.content} type="text"
                    onChange={(e) => dispatch(setForm('content', e.target.value))}
                    />
                    <Upload label="Article Photo" img={imgPreview} onChange={(e) => onImageUpload(e)}  />
                    
                    {
                         isLoading ?
                         <Button background="#287E00" title="Please wait" isLoading={isLoading} />
                         :
                         <Button background="#287E00" title="Submit" isLoading={isLoading} onClick={onSubmit} />
                    }
               </div>
               <Footer />
          </Fragment>
     );
}

export default CreateArticle;