import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { NoPictureUser } from '../../assets';
import { Button, CartButton, Footer, Gap, Input, Navbar, Upload } from '../../components';
import { clearErrors, clearForm, deleteForum, deleteForumDetail, postNewForumDetail, setErrors, setForm, setForum, setForumDetails, updateForum, updateForumDetail } from '../../config/redux/action/forumAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ForumDetails = (props) => {

     const {forumDetails, forum, form, errors} = useSelector(state => state.forumReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const dispatch = useDispatch();
     const history = useHistory();
     const [isReply, setIsReply] = useState(false);
     const [buttonLoading, setButtonLoading] = useState(false);
     const [editId, setEditId] = useState(0);

     useEffect(() => {
          
          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await dispatch(setForum(props.match.params.id));
               await dispatch(setForumDetails(props.match.params.id));
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

          setButtonLoading(true);
          postNewForumDetail(form, props.match.params.id)
          .then(res => {
               setButtonLoading(false);
               
               if(res.status === 201) {
                    dispatch(clearForm());
                    dispatch(clearErrors());
                    alert("Reply forum success");
                    setIsReply(false);
                    dispatch(setForumDetails(props.match.params.id));
               }
               else{
                    dispatch(clearErrors());
                    res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
                    alert("Reply forum failed");
               }
          });

     }

     const onEdit = async(id, title, content, forumPhoto) => {
          await setEditId(id);
          await dispatch(setForm('title', title));
          await dispatch(setForm('content', content));
          await dispatch(setForm('forumPhoto', forumPhoto));
     }

     const onUpdate = (id) => {

          async function finalizeSuccess(){
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await setEditId(0);
               await alert("Reply forum updated");
               await dispatch(setForum(props.match.params.id));
          }

          async function finalizeFailed(res) {
               await dispatch(clearErrors());
               await res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
               await alert("Update forum thread failed");
          }

          setButtonLoading(true);
          updateForum(form, id)
          .then(res => {
               setButtonLoading(false);
               
               if(res.status === 200) {
                    finalizeSuccess();
               }
               else{
                    finalizeFailed(res);
               }
          });
     }

     const onDelete = async (id) => {

          const confirmDelete = window.confirm('Are you sure want to delete this forum thread?');

          if(confirmDelete){
               dispatch(setIsLoading(true));
               deleteForum(id)
               .then(res => {
                    dispatch(setIsLoading(false));
                    if(res.status === 200) {
                         alert('Delete Success');
                         history.push('/forums');
                    }
                    else{
                         alert("Delete Failed");
                    }
               });
          }
     }

     const onEditDetail = async(id, content, forumPhoto) => {
          await setEditId(id);
          await dispatch(setForm('content', content));
          await dispatch(setForm('forumPhoto', forumPhoto));
     }

     const onUpdateDetail = (id) => {

          async function finalizeSuccess(){
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await dispatch(setForumDetails(props.match.params.id));
               await setEditId(0);
               await alert("Reply forum updated");
          }

          async function finalizeFailed(res) {
               await dispatch(clearErrors());
               await res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
               await alert("Update reply failed");
          }

          setButtonLoading(true);
          updateForumDetail(form, id)
          .then(res => {
               setButtonLoading(false);
               
               if(res.status === 200) {
                    finalizeSuccess();
               }
               else{
                    finalizeFailed(res);
               }
          });
     }

     const onDeleteDetail = async (id) => {

          const confirmDelete = window.confirm('Are you sure want to delete this reply?');

          if(confirmDelete){
               await dispatch(setIsLoading(true));
               await dispatch(deleteForumDetail(id, props.match.params.id));
               await dispatch(setForumDetails(props.match.params.id));
          }
     }
     
     if(!isLoading && forum.user){
          return (
               <Fragment>
                    <Navbar />
                    <Navbar />
                    <Gap height={150} />
                    <div className="container">
                         {
                              forum._id === editId ?
                              <div>
                                   <Input label="Title" value={form.title} type="text" errorMessage={errors.title} 
                                   onChange={(e) => dispatch(setForm('title', e.target.value))}
                                   />
                                   <Input label="Content" value={form.content} type="text" errorMessage={errors.content} 
                                   onChange={(e) => dispatch(setForm('content', e.target.value))}
                                   />
                                   <Upload label="Forum Photo" img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
                                   
                                   <Button background="red" title="Cancel" onClick={() => setEditId(0)} />
                                   {
                                        buttonLoading ?
                                        <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                                        :
                                        <Button background="#287E00" title="Submit" isLoading={buttonLoading} onClick={() => onUpdate(forum._id)}  />
                                   }
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
                                   <div className="text-end">
                                        {
                                             buttonLoading ?
                                             <Button background="#287E00" title="Please wait..." isLoading={buttonLoading} />
                                             :
                                             <Button background="#287E00" title="Reply" isLoading={buttonLoading} onClick={onSubmit} />
                                        }
                                   </div>
                                   <Gap height={30} />
                                   <hr />
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
                                                                           {
                                                                                forumDetail._id === editId ?
                                                                                <Fragment>
                                                                                     <Input label="Content" value={form.content} type="text" errorMessage={errors.content} 
                                                                                     onChange={(e) => dispatch(setForm('content', e.target.value))}
                                                                                     />
                                                                                     <Upload label="Forum Photo" img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
                                                                                     
                                                                                     <Button background="red" title="Cancel" onClick={() => setEditId(0)} />
                                                                                     {
                                                                                          buttonLoading ?
                                                                                          <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                                                                                          :
                                                                                          <Button background="#287E00" title="Submit" isLoading={buttonLoading} onClick={() => onUpdateDetail(forumDetail._id)} />
                                                                                     }
                                                                                </Fragment> :
                                                                                <Fragment>
                                                                                     <div className="d-flex align-items-center justify-content-between">
                                                                                          <div className="d-flex align-items-center">
                                                                                               <img src={forumDetail.user.profilePhoto ? forumDetail.user.profilePhoto : NoPictureUser} style={{ height:"50px" }} alt={forumDetail.user.name} className="rounded-circle" />
                                                                                               <Gap width={40} />
                                                                                               <p className="m-0">{forumDetail.user.name}</p>
                                                                                               <Gap width={50} />
                                                                                               <p className="m-0">{ new Date(forumDetail.createdAt).toDateString("en-US")}</p>
                                                                                          </div>
                                                                                          {
                                                                                          forumDetail.user._id === localStorage.getItem('userId') &&
                                                                                          <div className="d-flex align-items-center">
                                                                                               <button className="btn-delete me-3" onClick={() => onDeleteDetail(forumDetail._id)}>Delete</button>
                                                                                               <Button background="#287E00" title="Edit" onClick={() => onEditDetail(forumDetail._id, forumDetail.content, forumDetail.forumPhoto)} />
                                                                                          </div>
                                                                                          }
                                                                                     </div>
                                                                                     <hr />
                                                                                     <div dangerouslySetInnerHTML={{__html:forumDetail.content}}></div>
                                                                                     <div className="text-center my-3">
                                                                                     {
                                                                                          forumDetail.forumPhoto &&
                                                                                          <img src={forumDetail.forumPhoto} className="w-50" alt={forumDetail.createdAt} />
                                                                                     }
                                                                                     </div>
                                                                                </Fragment>
                                                                           }
                                                                      </div>
                                                                 </div>
                                                            )
                                                            
                                                       })

                                                  ) : <p>No Replies</p>
                                             }
                                        </div>
                                   </div>
                              </div>
                              <div className="col-md-4">

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