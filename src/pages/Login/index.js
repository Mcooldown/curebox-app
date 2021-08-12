import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Footer, Input, Navbar } from '../../components';
import { clearErrors, clearForm, login, setForm } from '../../config/redux/action/authAction';
import { setIsLoading } from '../../config/redux/action/generalAction';

const Login = () => {

     const {form} = useSelector(state => state.authReducer);
     const {isLoading} = useSelector(state => state.generalReducer);

     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(userId) history.push('/');
     });

     const onSubmit = () => {

          dispatch(setIsLoading(true));

          login(form)
          .then(res => {
               dispatch(setIsLoading(false));
               if(res.status === 200) {
                    localStorage.setItem('userId',res.data.data._id);
                    localStorage.setItem('userName',res.data.data.name);
                    dispatch(clearForm());
                    dispatch(clearErrors());
                    history.push('/');
               }
               else{
                    dispatch(clearErrors());
                    dispatch(clearForm());
                    alert("Login failed");
               }
          });
     }
     
     return (
          <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    <h1 className="text-center text-dark">Login</h1>
                    <hr />
                    <Input type="text" value={form.email} label="Email"
                    errorMessage={''}
                    onChange={(e) => dispatch(setForm('email', e.target.value))} />

                    <Input type="password" value={form.password} label="Password"
                    errorMessage={''}
                    onChange={(e) => dispatch(setForm('password', e.target.value))} />

                    {
                         isLoading ?
                         <Button title="Please wait" isLoading={isLoading} />
                         :
                         <Button title="Login" isLoading={isLoading} onClick={onSubmit} />
                    }
               </div>
               <Footer />
          </Fragment>
     )
}

export default Login;