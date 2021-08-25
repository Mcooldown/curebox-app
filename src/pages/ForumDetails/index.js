import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { clearErrors, clearForm, deleteForum, deleteForumDetail, postNewForumDetail, setErrors, setForm, setForum, setForumDetails, updateForum, updateForumDetail } from '../../config/redux/action/forumAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';

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
                    <div className="container my-5 py-5">
                         <div className="card border-0 shadow">
                              <div className="card-body my-3">
                                   {
                                        forum._id === editId ?
                                        <Fragment>
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
                                        </Fragment> :
                                        <Fragment>
                                             <h2>{forum.title}</h2>
                                             <p>Created by {forum.user.name} at {forum.createdAt}</p>
                                             <hr />
                                             <p>{forum.content}</p>
                                             {
                                                  forum.forumPhoto && 
                                                  <img src={forum.forumPhoto} className="w-25" alt={forum.title} />
                                             }
                                             <br />
                                             {
                                                  !isReply &&
                                                  <Button background="blue" title="Reply" onClick={() => setIsReply(true)} />
                                             }
                                             {
                                                  forum.user._id === localStorage.getItem('userId') &&
                                                  <Button title="Edit" background="gray" onClick={() => onEdit(forum._id, forum.title, forum.content, forum.forumPhoto)} />
                                             }
                                             {
                                                  forum.user._id === localStorage.getItem('userId') &&
                                                  <Button title="Delete" background="red" onClick={() => onDelete(forum._id)} />
                                             }
                                        </Fragment>
                                   }
                              </div>
                         </div>
                         {
                              isReply && (
                                   <div className="card border-0 shadow mt-3">
                                        <div className="card-body">
                                             <h2>Reply</h2>
                                             <hr />
                                             <Input label="Message" value={form.content} type="text" errorMessage={errors.content} 
                                             onChange={(e) => dispatch(setForm('content', e.target.value))}
                                             />
                                             <Upload label="Forum Photo" img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
                                             
                                             <Button background="red" title="Cancel" onClick={() => setIsReply(false)} />
                                             {
                                                  buttonLoading ?
                                                  <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                                                  :
                                                  <Button background="#287E00" title="Submit" isLoading={buttonLoading} onClick={onSubmit} />
                                             }
                                        </div>
                                   </div>
                              )
                         }

                         <h2 className="mt-5">Replies</h2>
                         <hr />
                         {
                              forumDetails.length > 0 ?
                              (
                                   forumDetails.map((forumDetail) => {
                                        return (
                                             <div className="card border-0 shadow mt-3">
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
                                                                 <h5>{forumDetail.content}</h5>
                                                                 <p>by {forumDetail.user.name}</p>
                                                                 <p>posted at {forumDetail.createdAt}</p>
                                                                 {
                                                                      forumDetail.forumPhoto &&
                                                                      <img src={forumDetail.forumPhoto} className="w-25" alt={forumDetail.createdAt} />
                                                                 }
                                                                 <br />
                                                                 {
                                                                      forumDetail.user._id === localStorage.getItem('userId') &&
                                                                      <Fragment>
                                                                           <Button background="gray" title="Edit" onClick={() => onEditDetail(forumDetail._id, forumDetail.content, forumDetail.forumPhoto)} />
                                                                           <Button background="red" title="Delete" onClick={() => onDeleteDetail(forumDetail._id)} />
                                                                      </Fragment>

                                                                 }
                                                            </Fragment>
                                                       }
                                                  </div>
                                             </div>
                                        )
                                        
                                   })

                              ) : <p>No Replies</p>
                         }
                    </div>
                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(ForumDetails);