import React, { useEffect } from 'react'
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NoPictureUser } from '../../assets';
import { CartButton, Footer, Gap, Navbar } from '../../components';
import { setUser } from '../../config/redux/action/authAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';
import './profile.scss';

const Profile = () => {

     const {isLoading} = useSelector(state => state.generalReducer);
     const {user} = useSelector(state => state.authReducer);
     const history = useHistory();
     const dispatch = useDispatch();

     useEffect(() => {

          const userId = localStorage.getItem('userId');
          if(!userId){
               alert('Not authorized. Please login first');
               return history.push('/login');
          }

          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(setUser(userId));
          }
          initialize();
          
     },[dispatch, history]);

     if(!isLoading) {
          return (
              <Fragment>
                   <Navbar />
                    <div className="profile">
                         <Gap height={150} />
                         <div className="container">
                              <h1 className="text-center mb-3">Hello, <h1 className="profile-name">{user.name}</h1></h1>
                              <div className="section-line mx-auto"></div>
                              <Gap height={50} />
                                   <div className="text-center">
                                        <img src={user.profilePhoto ? user.profilePhoto : NoPictureUser} className="profile-photo" alt={user._id} />
                                   </div>
                              <Gap height={75} />
                              <div className="title-pipe">
                                   <h5 className="m-0">Personal Information</h5>
                              </div>
                              <Gap height={30} />
                              <div className="px-3 px-md-4">
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <div className="d-flex justify-content-md-between">
                                                  <p className="m-0">Name</p>
                                                  <p className="m-0">:</p>
                                             </div>
                                        </div>
                                        <div className="col-md-9">
                                             <h6 className="m-0">{user.name}</h6>
                                        </div>
                                   </div>
                                   <Gap height={20} />
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <div className="d-flex justify-content-md-between">
                                                  <p className="m-0">Gender</p>
                                                  <p className="m-0">:</p>
                                             </div>
                                        </div>
                                        <div className="col-md-9">
                                             <h6 className="m-0">{user.gender}</h6>
                                        </div>
                                   </div>
                                   <Gap height={20} />
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <div className="d-flex justify-content-md-between">
                                                  <p className="m-0">Address</p>
                                                  <p className="m-0">:</p>
                                             </div>
                                        </div>
                                        <div className="col-md-9">
                                             <h6 className="m-0">{user.address}</h6>
                                        </div>
                                   </div>
                                   <Gap height={20} />
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <div className="d-flex justify-content-md-between">
                                                  <p className="m-0">Date of Birth</p>
                                                  <p className="m-0">:</p>
                                             </div>
                                        </div>
                                        <div className="col-md-9">
                                             <h6 className="m-0">{new Date(user.dateOfBirth).toLocaleDateString("en-GB")}</h6>
                                        </div>
                                   </div>
                                   <Gap height={20} />
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <div className="d-flex justify-content-md-between">
                                                  <p className="m-0">Phone Number</p>
                                                  <p className="m-0">:</p>
                                             </div>
                                        </div>
                                        <div className="col-md-9">
                                             <h6 className="m-0">{user.phoneNumber}</h6>
                                        </div>
                                   </div>
                                   <Gap height={20} />
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <div className="d-flex justify-content-md-between">
                                                  <p className="m-0">Email</p>
                                                  <p className="m-0">:</p>
                                             </div>
                                        </div>
                                        <div className="col-md-9">
                                             <h6 className="m-0">{user.email}</h6>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <Gap height={150} />
                    </div>
                   <Footer />
                   <CartButton />
              </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default Profile;