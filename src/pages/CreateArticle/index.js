import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Footer, Gap, Input, Navbar, Upload } from '../../components';
import { clearForm, postNewArticle, setForm } from '../../config/redux/action/articleAction';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './createArticle.scss';

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
          }else{
               dispatch(clearForm());
          }
     },[history, dispatch])

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

          if(form.title === '') return alert('Title required');
          else if(form.content === '') return alert('Content required'); 
          else if(imgPreview === '')return alert('Image required');
          
          setIsLoading(true);
          postNewArticle(form)
          .then(res => {
               setIsLoading(false);
               if(res.status === 201){
                    dispatch(clearForm());
                    alert('New Article Added');
                    history.push('/articles/user');
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
               <Gap height={150} />
               <div className="container">
                    <h1 className="text-center mb-3">Create Article</h1>
                    <div className="section-line mx-auto"></div>
                    <Gap height={50}  />
                    <div className="green-wrapper">
                         <div className="card-body">
                              <div className="form-group row align-items-center">
                                   <div className="col-md-3">
                                        <h6>Title</h6>
                                   </div>
                                   <div className="col-md-9">
                                        <Input value={form.title} type="text"
                                        onChange={(e) => dispatch(setForm('title', e.target.value))}
                                        />
                                   </div>
                              </div>
                              <div className="form-group row align-items-center">
                                   <div className="col-md-3">
                                        <h6>Article Photo</h6>
                                   </div>
                                   <div className="col-md-9">
                                       <Upload img={imgPreview} onChange={(e) => onImageUpload(e)}  />
                                   </div>
                              </div>
                              <div className="form-group row align-items-center">
                                   <div className="col-md-3">
                                        <h6>Content</h6>
                                   </div>
                                   <div className="col-md-9">
                                         <CKEditor
                                        editor={ ClassicEditor }
                                        data=""
                                        onChange={ ( event, editor ) => 
                                        dispatch(setForm('content', editor.getData()))}
                                        />
                                   </div>
                              </div>
                         </div>
                    </div>
                    <Gap height={50} />
                    <div className="d-grid">
                         {
                              isLoading ?
                              <Button background="#287E00" title="Please wait" isLoading={isLoading} />
                              :
                              <Button background="#287E00" title="Post Article" isLoading={isLoading} onClick={onSubmit} />
                         }
                    </div>
               </div>
               <Gap height={150} />
               <Footer />
          </Fragment>
     );
}

export default CreateArticle;