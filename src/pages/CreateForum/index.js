import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Footer, Gap, Input, Navbar, Upload } from '../../components';
import { clearErrors, clearForm, postNewForum, setErrors, setForm } from '../../config/redux/action/forumAction';
import './createForum.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

const CreateForum = () => {

     const {form, errors} = useSelector(state => state.forumReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId){
               history.push('/login');
          }else{
               dispatch(clearForm());
          }
     },[history, dispatch]);

     const onImageUpload = (e) => {
          const file = e.target.files[0];
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               dispatch(setForm('forumPhoto', reader.result));
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
          postNewForum(form)
          .then(res => {
               setButtonLoading(false);
               
               if(res.status === 201) {
                    dispatch(clearForm());
                    dispatch(clearErrors());

                    Swal.fire({
                         title: 'Success',
                         text: 'New Forum Thread Created',
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    });
                    return history.push('/forums');
               }
               else{
                    dispatch(clearErrors());
                    res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
                    return Swal.fire({
                         title: 'Error',
                         text: 'Create New Thread Failed. Please make sure that required data filled correctly',
                         icon: 'error',
                         confirmButtonColor: '#287E00',
                    });
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
               <Gap height={150} />
               <div className="container">
                    <h1 className="text-center mb-3">Create Forum</h1>
                    <div className="section-line mx-auto"></div>
                    <Gap height={50}  />
               
                    <div className="green-wrapper">
                         <div className="card-body">
                              <div className="form-group row align-items-center">
                                   <div className="col-md-3">
                                        <h6>Title</h6>
                                   </div>
                                   <div className="col-md-9">
                                        <Input value={form.title} type="text" errorMessage={errors.title} 
                                        onChange={(e) => dispatch(setForm('title', e.target.value))}
                                        />
                                   </div>
                              </div>
                              <div className="form-group row align-items-center">
                                   <div className="col-md-3">
                                        <h6>Forum Photo (Optional)</h6>
                                   </div>
                                   <div className="col-md-9">
                                        <Upload img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
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
                         buttonLoading ?
                         <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                         :
                         <Button background="#287E00" title="Post Forum" isLoading={buttonLoading} onClick={onSubmit} />
                    }
                    </div>
               </div>
               <Gap height={150} />
               <Footer />
          </Fragment>
     );
}

export default CreateForum;