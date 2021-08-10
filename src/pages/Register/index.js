import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Footer, Input, Navbar, Select } from '../../components';
import { clearErrors, clearForm, registerNewUser, setErrors, setForm } from '../../config/redux/action';
import { useHistory } from 'react-router-dom';

const Register = () => {

     const {form, errors} = useSelector(state => state.authReducer);
     const dispatch = useDispatch();
     const history = useHistory();
     const genderOptions = ['Male', 'Female'];

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(userId) history.push('/');
          else{
               dispatch(clearForm());
               dispatch(clearErrors());
          }
     },[dispatch]);

     const onSubmit = async () => {

          registerNewUser(form)
          .then(res => {
               if(res.status === 200) {
                    dispatch(clearForm());
                    dispatch(clearErrors());

                    alert("Register Success, Please login to your account");
                    history.push('/login');
               }
               else{
                    dispatch(clearErrors());
                    res.data.data.map((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
                    alert("Register Failed. Please check your registration data");
                    console.log(errors);
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    <h1 className="text-center text-dark">Register</h1>
                    <hr />
                    <Input type="text" label="Name" value={form.name} 
                    errorMessage={errors.name !== null ? errors.name : null}
                    onChange={(e) => dispatch(setForm('name', e.target.value))} />

                    <Select label="Gender" value={form.gender} options={genderOptions}
                    errorMessage={errors.gender !== null ? errors.gender : null}
                    onChange={(e) => dispatch(setForm('gender', e.target.value))} />
                    
                    <Input type="text" value={form.address} label="Address"
                    errorMessage={errors.address !== null ? errors.address : null}
                    onChange={(e) => dispatch(setForm('address', e.target.value))} />

                    <Input type="date" value={form.dateOfBirth} label="Date Of Birth"
                    errorMessage={errors.dateOfBirth !== null ? errors.dateOfBirth : null}
                    onChange={(e) => dispatch(setForm('dateOfBirth', e.target.value))} />

                    <Input type="text" value={form.phoneNumber} label="Phone Number"
                    errorMessage={errors.phoneNumber !== null ? errors.phoneNumber : null}
                    onChange={(e) => dispatch(setForm('phoneNumber', e.target.value))} />

                    <Input type="text" value={form.email} label="Email"
                    errorMessage={errors.email !== null ? errors.email : null}
                    onChange={(e) => dispatch(setForm('email', e.target.value))} />

                    <Input type="password" value={form.password} label="Password"
                    errorMessage={errors.password !== null ? errors.password : null}
                    onChange={(e) => dispatch(setForm('password', e.target.value))} />

                    <Input type="password" value={form.passwordConfirm} label="Confirm Password"
                    errorMessage={errors.passwordConfirm !== null ? errors.passwordConfirm : null}
                    onChange={(e) => dispatch(setForm('passwordConfirm', e.target.value))} />

                    <Button title="Register" onClick={onSubmit} />
               </div>
               <Footer />
          </Fragment>
     )
}

export default Register;