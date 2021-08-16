import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AuthMedicine, Logo } from '../../assets';
import { Button, Gap, Input} from '../../components';
import { clearErrors, clearForm, login, setForm } from '../../config/redux/action/authAction';
import './login.scss'

const Login = () => {

     const {form} = useSelector(state => state.authReducer);
     const [buttonLoading, setButtonLoading] = useState(false);

     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(userId) history.push('/');
     });

     const onSubmit = () => {

          setButtonLoading(true);

          login(form)
          .then(res => {
               setButtonLoading(false);
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
          <img src={Logo} className="img-auth" alt="Logo" onClick={() => history.push('/')} />
          <div className="login auth-background">
               <div className="container">
                    <div className="row justify-content-end">
                         <div className="col-md-6">
                              <div className="card auth-card">
                                   <img src={AuthMedicine} className="img-medicine" alt="auth medicine" />
                                   <div className="card-body">
                                        <h4 className="text-center mb-3">LOGIN</h4>
                                        <div className="green-line mx-auto"></div>

                                        <Gap height={50} />
                                        <Input type="text" value={form.email} label="Email"
                                        placeholder="e.g. customerservice@curebox.com"
                                        onChange={(e) => dispatch(setForm('email', e.target.value))} />
                                        
                                        <Gap height={30} />
                                        <Input type="password" value={form.password} label="Password"
                                        onChange={(e) => dispatch(setForm('password', e.target.value))} />
                                        
                                        <Gap height={15} />
                                        <p className="text-end text-green">Forgot password?</p>
                                        
                                        <Gap height={60} />
                                        <div className="d-grid">
                                             {
                                                  buttonLoading ?
                                                  <Button title="Please wait..." isLoading={buttonLoading} />
                                                  :
                                                  <Button title="LOGIN" isLoading={buttonLoading} onClick={onSubmit} />
                                             }
                                        <Gap height={25} />
                                        <p className="text-end">New to CureBox? <h6 className="d-inline text-green" onClick={() => history.push('/register')}>Sign Up, It's Free</h6></p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          </Fragment>
     )
}

export default Login;