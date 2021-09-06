import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Footer, Gap, Input, Navbar, Upload } from '../../components';
import { clearForm, setArticle, setForm, updateArticle } from '../../config/redux/action/articleAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

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

          if(form.content === '') return Swal.fire({
               title: 'Error',
               text: 'Content must be filled',
               icon: 'error',
               confirmButtonColor: '#287E00',
          });
          
          setButtonLoading(true);
          updateArticle(form, article._id)
          .then(res => {
               setButtonLoading(false);
               if(res.status === 200){
                    dispatch(clearForm());
                    Swal.fire({
                         title: 'Success',
                         text: 'Article Updated',
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    });
                    return history.push('/articles/user');
               }
          });
     }

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <Gap height={150} />
                    <div className="container">
                         <h1 className="text-center mb-3">Edit Article</h1>
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
                                        <Upload img={form.articlePhoto} onChange={(e) => onImageUpload(e)}  />
                                        </div>
                                   </div>
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Content</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <CKEditor
                                             editor={ ClassicEditor }
                                             data={form.content}
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
                                   buttonLoading ?
                                   <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                                   :
                                   <Button background="#287E00" title="Update Article" isLoading={buttonLoading} onClick={onSubmit} />
                              }
                         </div>
                    </div>
                    <Gap height={150} />
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(EditArticle);