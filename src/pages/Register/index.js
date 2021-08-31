import React, { useEffect, useState} from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Gap, Input, Select, Upload } from '../../components';
import { clearErrors, clearForm, registerNewUser, setErrors, setForm } from '../../config/redux/action/authAction';
import { useHistory } from 'react-router-dom';
import { AuthMedicine, Logo } from '../../assets';
import './register.scss';

const Register = () => {

     const {form, errors} = useSelector(state => state.authReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();
     const genderOptions = ['','Male', 'Female'];

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(userId) history.push('/');
          else{
               dispatch(clearForm());
               dispatch(clearErrors());
          }
     },[dispatch, history]);

     const onImageUpload = (e) => {
          const file = e.target.files[0];
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               dispatch(setForm('profilePhoto', reader.result));
          }
     }

     const onSubmit = () => {

          if(form.profilePhoto === '') return alert('Profile Photo must be filled');

          setButtonLoading(true);
          registerNewUser(form)
          .then(res => {

              setButtonLoading(false);
               if(res.status === 200) {
                    dispatch(clearForm());
                    dispatch(clearErrors());

                    alert("Register Success, Please login to your account");
                    history.push('/login');
               }
               else{
                    dispatch(clearErrors());
                    res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
                    alert("Register Failed. Please check your registration data");
               }
          });
     }
     

     return (
          <Fragment>
               <img src={Logo} className="img-auth" alt="Logo" onClick={() => history.push('/')} />
               <div className="register auth-background">
                    <div className="container my-5 py-5">
                         <div className="row justify-content-end">
                              <div className="col-md-6">
                                   <div className="card auth-card">
                                        <img src={AuthMedicine} className="img-medicine" alt="auth medicine" />
                                        <div className="card-body">
                                             <h4 className="text-center mb-3">REGISTER</h4>
                                             <div className="green-line mx-auto"></div>

                                             <Gap height={50} />
                                             <Input type="text" label="Name" value={form.name}
                                             errorMessage={errors.name && errors.name}
                                             onChange={(e) => dispatch(setForm('name', e.target.value))} />
                                             
                                             <Gap height={30} />
                                             <Select label="Gender" value={form.gender} options={genderOptions}
                                             errorMessage={errors.gender && errors.gender}
                                             onChange={(e) => dispatch(setForm('gender', e.target.value))} />

                                             <Gap height={30} />
                                             <Input type="text" value={form.address} label="City/District, Province"
                                             errorMessage={errors.address && errors.address}
                                             placeholder="e.g. Bandung, Jawa Barat"
                                             onChange={(e) => dispatch(setForm('address', e.target.value))} />

                                             <Gap height={30} />
                                             <Input type="date" value={form.dateOfBirth} label="Date Of Birth"
                                             errorMessage={errors.dateOfBirth && errors.dateOfBirth}
                                             onChange={(e) => dispatch(setForm('dateOfBirth', e.target.value))} />

                                             <Gap height={30} />
                                             <Input type="text" value={form.phoneNumber} label="Phone Number"
                                             errorMessage={errors.phoneNumber && errors.phoneNumber}
                                             placeholder="e.g. 0816xxxxxxxx"
                                             onChange={(e) => dispatch(setForm('phoneNumber', e.target.value))} />

                                             <Gap height={30} />
                                             <Upload label="Profile Photo" img={form.profilePhoto} onChange={(e) => onImageUpload(e)}  />

                                             <Gap height={30} />
                                             <Input type="text" value={form.email} label="Email"
                                             errorMessage={errors.email && errors.email}
                                             placeholder="e.g. customerservice@curebox.com"
                                             onChange={(e) => dispatch(setForm('email', e.target.value))} />

                                             <Gap height={30} />
                                             <Input type="password" value={form.password} label="Password"
                                             errorMessage={errors.password && errors.password}
                                             onChange={(e) => dispatch(setForm('password', e.target.value))} />

                                             <Gap height={30} />
                                             <Input type="password" value={form.passwordConfirm} label="Confirm Password"
                                             errorMessage={errors.passwordConfirm && errors.passwordConfirm}
                                             onChange={(e) => dispatch(setForm('passwordConfirm', e.target.value))} />

                                             <Gap height={60} />
                                             <div className="d-grid">
                                                  {
                                                       buttonLoading ?
                                                       <Button background="#287E00" title="Please wait..." isLoading={buttonLoading} />
                                                       :
                                                       <Button background="#287E00" title="REGISTER" isLoading={buttonLoading} onClick={onSubmit} />
                                                  }
                                             <Gap height={25} />
                                             <p className="text-end">Already have'an account? <h6 className="d-inline text-green" onClick={() => history.push('/login')}>Login</h6></p>
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

export default Register;