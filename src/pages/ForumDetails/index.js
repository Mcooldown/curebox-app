import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { ForumDefault, NoPictureUser } from '../../assets';
import { Button, CartButton, Footer, Gap, Input, Navbar, Upload } from '../../components';
import { clearErrors, clearForm, deleteForum, deleteForumDetail, postNewForumDetail, setErrors, setForm, setForum, setForumDetails, setForums, updateForum, updateForumDetail } from '../../config/redux/action/forumAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

const ForumDetails = (props) => {

     const {forumDetails, forum, form, errors, forums} = useSelector(state => state.forumReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const dispatch = useDispatch();
     const history = useHistory();
     const [buttonLoading, setButtonLoading] = useState(false);
     const [editId, setEditId] = useState(0);
     const [isReply, setIsReply] = useState(true);
     const [editContent, setEditContent] = useState(false);

     useEffect(() => {
          
          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await dispatch(setForum(props.match.params.id));
               await dispatch(setForumDetails(props.match.params.id));
               await dispatch(setForums(1,5));
          }
          initialize();

     }, [dispatch, props]);

     const onImageUpload = (e) => {
          const file = e.target.files[0];
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               dispatch(setForm('forumPhoto', reader.result));
          }
     }

     const onSubmit = () => {

          if(form.content === '') {
               return Swal.fire({
                    title: 'Error',
                    text: 'Content must be filled',
                    icon: 'error',
                    confirmButtonColor: '#287E00',
               });
          }

          setButtonLoading(true);
          postNewForumDetail(form, props.match.params.id)
          .then(res => {
               setButtonLoading(false);

               async function finalizeSuccess(){
                    await dispatch(clearForm());
                    await dispatch(clearErrors());
                    await dispatch(setForumDetails(props.match.params.id));
                    Swal.fire({
                         title: 'Success',
                         text: 'Reply forum success',
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    })
               }

               async function finalizeFailed(){
                    await dispatch(clearErrors());
                    await res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
               }
               
               if(res.status === 201) {
                   finalizeSuccess().then(() =>{
                        Swal.fire({
                             title: 'Success',
                             text: 'Reply forum success',
                             icon: 'success',
                             confirmButtonColor: '#287E00',
                        });
                   });
               }
               else{
                    finalizeFailed().then(() => {
                         Swal.fire({
                              title: 'Error',
                              text: 'Reply forum failed. Make sure you have filled the required data correctly',
                              icon: 'error',
                              confirmButtonColor: '#287E00',
                         });
                    });
               }
          });

     }

     const onEdit = async(id, title, content, forumPhoto) => {
          await setEditId(id);
          await setIsReply(false);
          await dispatch(setForm('title', title));
          await dispatch(setForm('content', content));
          await dispatch(setForm('forumPhoto', forumPhoto));
     }

     const onUpdate = (id) => {

          if(form.content === '') return Swal.fire({
                    title: 'Error',
                    text: 'Content required',
                    icon: 'error',
                    confirmButtonColor: '#287E00',
               });

          async function finalizeSuccess(){
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await setEditId(0);
               await setEditContent(false);
               await setIsReply(true);
               await dispatch(setForum(props.match.params.id));
          }

          async function finalizeFailed(res) {
               await dispatch(clearErrors());
               await res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
          }

          setButtonLoading(true);
          updateForum(form, id)
          .then(res => {
               setButtonLoading(false);
               
               if(res.status === 200) {
                    finalizeSuccess().then(()=>{
                         Swal.fire({
                             title: 'Success',
                             text: 'Update forum success',
                             icon: 'success',
                             confirmButtonColor: '#287E00',
                        });
                    });
               }
               else{
                    finalizeFailed(res).then(()=>{
                         Swal.fire({
                             title: 'Error',
                             text: 'Reply forum failed. Make sure you have filled the required data correctly.',
                             icon: 'success',
                             confirmButtonColor: '#287E00',
                        });
                    });
               }
          });
     }

     const onDelete = async (id) => {

          Swal.fire({
               title: 'Are you sure want to delete this thread?',
               text: "This action cannot be reverted",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#287E00',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
               }).then((result) => {
               if (result.isConfirmed) {
                    deleteForum(id)
                    .then(res => {
                         dispatch(setIsLoading(false));
                         if(res.status === 200) {
                              Swal.fire({
                                   title: 'Success',
                                   text: 'Delete forum success',
                                   icon: 'success',
                                   confirmButtonColor: '#287E00',
                              });
                              history.push('/forums');
                         }
                         else{
                              Swal.fire({
                                   title: 'Error',
                                   text: 'Delete forum failed',
                                   icon: 'error',
                                   confirmButtonColor: '#287E00',
                              });
                         }
                    });
               }
          })
     }

     const onEditDetail = async(id, content, forumPhoto) => {
          await setEditId(id);
          await setIsReply(false);
          await dispatch(setForm('content', content));
          await dispatch(setForm('forumPhoto', forumPhoto));
     }

     const onUpdateDetail = (id) => {

          async function finalizeSuccess(){
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await dispatch(setForumDetails(props.match.params.id));
               await setEditId(0);
               await setEditContent(false);
               await setIsReply(true);
          }

          async function finalizeFailed(res) {
               await dispatch(clearErrors());
               await res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
          }

          setButtonLoading(true);
          updateForumDetail(form, id)
          .then(res => {
               setButtonLoading(false);
               
               if(res.status === 200) {
                    finalizeSuccess().then(()=>{
                         Swal.fire({
                             title: 'Success',
                             text: 'Update reply success',
                             icon: 'success',
                             confirmButtonColor: '#287E00',
                        });
                    });
               }
               else{
                    finalizeFailed(res).then(()=> {
                         Swal.fire({
                             title: 'error',
                             text: 'Update reply failed. Make sure you have filled the required data correctly.',
                             icon: 'error',
                             confirmButtonColor: '#287E00',
                        });
                    });
               }
          });
     }

     const onDeleteDetail = async (id) => {

          Swal.fire({
               title: 'Are you sure want to delete this reply?',
               text: "This action cannot be reverted",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#287E00',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
               }).then((result) => {
               if (result.isConfirmed) {
                    async function finalizeSuccess() {
                         await dispatch(setIsLoading(true));
                         await dispatch(deleteForumDetail(id, props.match.params.id));
                         await dispatch(setForumDetails(props.match.params.id));
                    }

                    finalizeSuccess().then(() => {
                         Swal.fire({
                              title: 'Success',
                              text: 'Delete reply success',
                              icon: 'success',
                              confirmButtonColor: '#287E00',
                         });
                    })
               }
          })
     }
     
     const onCancel = async() =>  {
          await dispatch(setForm('forumPhoto', null));
          await dispatch(setForm('content', null));
          await setEditId(0);
          await setEditContent(false);
          await setIsReply(true);
     }
     
     if(!isLoading && forum.user){
          return (
               <Fragment>
                    <Navbar />
                    <Gap height={150} />
                    <div className="container">
                         {
                              forum._id === editId ?
                              <div>
                                   <Input label="Title" value={form.title} type="text" errorMessage={errors.title} 
                                   onChange={(e) => dispatch(setForm('title', e.target.value))}
                                   />
                                   <Gap height={30} />
                                   <h6>Content</h6>
                                   {
                                        (form.content || editContent) && 
                                        <CKEditor
                                             editor={ ClassicEditor }
                                             data={form.content}
                                             onChange={ ( event, editor ) => {
                                                  dispatch(setForm('content', editor.getData()));
                                                  setEditContent(true);
                                                  }
                                             }
                                        />
                                   }
                                   <Gap height={30} />
                                   <Upload label="Forum Photo" img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
                                   
                                   <Gap height={30} />
                                   <div className="d-flex justify-content-end">
                                        <button className="btn-delete me-3" onClick={onCancel}>Cancel</button>
                                        {
                                             buttonLoading ?
                                             <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                                             :
                                             <Button background="#287E00" title="Submit" isLoading={buttonLoading} onClick={() => onUpdate(forum._id)}  />
                                        }
                                   </div>
                              </div> :
                              <Fragment>
                                   <div className="d-flex justify-content-between align-items-center">
                                        <h1 className="mb-3">{forum.title}</h1>
                                        <div className="d-flex align-items-center">
                                             <i className="fa fa-heart fa-2x me-4 text-danger"></i>
                                             <i className="fa fa-share-alt fa-2x text-dark me-4"></i>
                                             {
                                                  forum.user._id === localStorage.getItem('userId') &&
                                                  <Fragment>
                                                       <button className="btn-delete me-3" onClick={() => onDelete(forum._id)}>Delete</button>
                                                       <Button title="Edit" background="#287E00" onClick={() => onEdit(forum._id, forum.title, forum.content, forum.forumPhoto)} />
                                                  </Fragment>
                                             }
                                        </div>
                                   </div>
                                   <Gap height={10} />
                                   <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                             <img src={forum.user.profilePhoto ? forum.user.profilePhoto : NoPictureUser} style={{ height:"50px" }} alt={forum.user.name} className="rounded-circle" />
                                             <p className="m-0 ms-3">{forum.user.name}</p>
                                        </div>
                                        <p className="m-0">{ new Date(forum.createdAt).toDateString("en-US")}</p>
                                   </div>
                                   <hr />
                                   <Gap height={20} />
                                   <div dangerouslySetInnerHTML={{__html:forum.content}}></div>
                                   <Gap height={20} />
                                   <div className="text-center">
                                        {
                                             forum.forumPhoto && 
                                             <img src={forum.forumPhoto} className="w-50" alt={forum.title} />
                                        }
                                   </div>
                                   <br />
                              </Fragment>
                         }
                         <Gap height={30}  />
                         <hr />
                         <Gap height={30}  />
                         <div className="row">
                              <div className="col-md-8">
                                   {
                                        isReply &&
                                        <Fragment>
                                             <h3>Reply Forum</h3>
                                             <Gap height={30} />
                                             <CKEditor
                                                  editor={ ClassicEditor }
                                                  data="Type your reply here"
                                                  onChange={ ( event, editor ) => 
                                                  dispatch(setForm('content', editor.getData()))}
                                             />
                                             <Gap height={30} />
                                             <Upload label="Upload Photo (Optional)" img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
                                             <Gap height={30} />
                                             <div className="d-flex justify-content-end">
                                                  {
                                                       buttonLoading ?
                                                       <Button background="#287E00" title="Please wait..." isLoading={buttonLoading} />
                                                       :
                                                       <Button background="#287E00" title="Reply" isLoading={buttonLoading} onClick={onSubmit} />
                                                  }
                                             </div>
                                             <Gap height={30} />
                                             <hr />
                                        </Fragment>
                                   }
                                   <div className="green-wrapper">
                                        <div className="card-body">
                                             <Gap height={20} />
                                             <h3>Replies</h3>
                                             {
                                                  forumDetails.length > 0 ?
                                                  (
                                                       forumDetails.map((forumDetail) => {
                                                            return (
                                                                 <div className="card border-0 my-4">
                                                                      <div className="card-body">
                                                                           <div className="d-flex align-items-center justify-content-between">
                                                                                <div className="d-flex align-items-center">
                                                                                     <img src={forumDetail.user.profilePhoto ? forumDetail.user.profilePhoto : NoPictureUser} style={{ height:"50px" }} alt={forumDetail.user.name} className="rounded-circle" />
                                                                                     <Gap width={40} />
                                                                                     <p className="m-0">{forumDetail.user.name}</p>
                                                                                     <Gap width={50} />
                                                                                     <p className="m-0">{ new Date(forumDetail.createdAt).toDateString("en-US")}</p>
                                                                                </div>
                                                                                {
                                                                                (forumDetail.user._id === localStorage.getItem('userId') && forumDetail._id !== editId) &&
                                                                                <div className="d-flex align-items-center">
                                                                                     <button className="btn-delete me-3" onClick={() => onDeleteDetail(forumDetail._id)}>Delete</button>
                                                                                     <Button background="#287E00" title="Edit" onClick={() => onEditDetail(forumDetail._id, forumDetail.content, forumDetail.forumPhoto)} />
                                                                                </div>
                                                                                }
                                                                           </div>
                                                                           <hr />
                                                                           {
                                                                                forumDetail._id === editId ?
                                                                                <Fragment>
                                                                                     <h6>Content</h6>
                                                                                     {
                                                                                          (form.content || editContent) &&
                                                                                          <CKEditor
                                                                                               editor={ ClassicEditor }
                                                                                               data={form.content}
                                                                                               onChange={ ( event, editor ) => {
                                                                                                    dispatch(setForm('content', editor.getData()));
                                                                                                    setEditContent(true);
                                                                                                    }
                                                                                               }
                                                                                          />
                                                                                     }
                                                                                     <Gap height={30} />
                                                                                     <Upload label="Forum Photo" img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
                                                                                     
                                                                                     <Gap height={30} />
                                                                                     <div className="d-flex justify-content-end">
                                                                                          <button className="btn-delete me-3" onClick={onCancel}>Cancel</button>
                                                                                          {
                                                                                               buttonLoading ?
                                                                                               <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                                                                                               :
                                                                                               <Button background="#287E00" title="Edit" isLoading={buttonLoading} onClick={() => onUpdateDetail(forumDetail._id)} />
                                                                                          }
                                                                                     </div>
                                                                                </Fragment>
                                                                                :
                                                                                <Fragment>
                                                                                     <div dangerouslySetInnerHTML={{__html:forumDetail.content}}></div>
                                                                                     {
                                                                                          forumDetail.forumPhoto &&
                                                                                          <img src={forumDetail.forumPhoto} className="w-25 my-3" alt={forumDetail.createdAt} />
                                                                                     }
                                                                                </Fragment>
                                                                           }
                                                                      </div>
                                                                 </div>
                                                            )
                                                            
                                                       })

                                                  ) : <p className="mt-4">No Replies</p>
                                             }
                                        </div>
                                   </div>
                              </div>
                              <div className="col-md-4">
                                   <h4>View More Forum</h4>
                                   <Gap height={10} />
                                   <div className="more-rec">
                                        <div className="card-body">
                                             { 
                                                  forums.length > 0 && forums.map((forum) => {
                                                       return (
                                                            <div className="row align-items-center my-3 more-rec-item"
                                                            onClick={() => history.push(`/forums/${forum._id}`)}>
                                                                 <div className="col-md-4">
                                                                      <img src={forum.forumPhoto ? forum.forumPhoto : ForumDefault} className="more-rec-img" alt={forum.title} />
                                                                 </div>
                                                                 <div className="col-md-8">
                                                                      <h5 className="more-rec-title">{forum.title}</h5>
                                                                 </div>
                                                            </div>
                                                       ) 
                                                  })
                                             }
                                        </div>
                                   </div>
                              </div>
                         </div>
                         
                    </div>
                    <Gap height={150} />
                    <CartButton />
                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(ForumDetails);