import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { clearErrors, clearForm, postNewForum, setErrors, setForm } from '../../config/redux/action/forumAction';

const CreateForum = () => {

     const {form, errors} = useSelector(state => state.forumReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
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

          setButtonLoading(true);
          postNewForum(form)
          .then(res => {
               setButtonLoading(false);
               
               if(res.status === 201) {
                    dispatch(clearForm());
                    dispatch(clearErrors());

                    alert("Forum Created");
                    history.push('/forums');
               }
               else{
                    dispatch(clearErrors());
                    res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
                    alert("Create Forum Failed");
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
               <div className="container py-5 my-5">
                    <h1>Create Forum</h1>
                    <hr />
                    <Input label="Title" value={form.title} type="text" errorMessage={errors.title} 
                    onChange={(e) => dispatch(setForm('title', e.target.value))}
                    />
                    <Input label="Content" value={form.content} type="text" errorMessage={errors.content} 
                    onChange={(e) => dispatch(setForm('content', e.target.value))}
                    />
                    <Upload label="Forum Photo" img={form.forumPhoto} onChange={(e) => onImageUpload(e)} />
                    
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

export default CreateForum;