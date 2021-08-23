import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { clearErrors, clearForm, postNewForumDetail, setErrors, setForm, setForum, setForumDetails } from '../../config/redux/action/forumAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';

const ForumDetails = (props) => {

     const {forumDetails, forum, form, errors} = useSelector(state => state.forumReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const dispatch = useDispatch();
     const [isReply, setIsReply] = useState(false);
     const [buttonLoading, setButtonLoading] = useState(false);

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
     
     if(!isLoading && forum.user){
          return (
               <Fragment>
                    <Navbar />
                    <div className="container my-5 py-5">
                         <div className="card border-0 shadow">
                              <div className="card-body my-3">
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
                                        <Button background="gray" title="Reply" onClick={() => setIsReply(true)} />
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
                                                       <h5>{forumDetail.content}</h5>
                                                       <p>by {forumDetail.user.name}</p>
                                                       <p>posted at {forumDetail.createdAt}</p>
                                                       {
                                                            forumDetail.forumPhoto &&
                                                            <img src={forumDetail.forumPhoto} className="w-25" alt={forumDetail.createdAt} />
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