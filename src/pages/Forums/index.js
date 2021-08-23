import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Footer, Navbar } from '../../components';
import { setForums } from '../../config/redux/action/forumAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';

const Forums = () => {

     const history = useHistory();
     const {isLoading} = useSelector(state => state.generalReducer);
     const {forums} = useSelector(state => state.forumReducer);
     const dispatch = useDispatch();

     useEffect(() => {

          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(setForums(1, 12));
          }

          initialize();
     },[dispatch]);

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <div className="container my-5 py-5">
                        <h1>Forums</h1>
                         <Button background="gray" title="Create New Forum" onClick={() => history.push('/forums/create')} />
                         <hr />
                         { forums.length > 0 && forums.map((forum) => {
                                   return (
                                        <div key={forum._id} className="card shadow border-0 my-3" onClick={() => history.push(`/forums/${forum._id}`)}>
                                             <div className="card-body my-3">
                                                  <h2>{forum.title}</h2>
                                                  <p>{forum.content}</p>
                                                  <p>Created by {forum.user.name}</p>
                                             </div>
                                        </div>
                                   ) 
                              })
                         }
                    </div>
                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default Forums;