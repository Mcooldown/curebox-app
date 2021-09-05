import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, CartButton, Footer, Gap, Navbar } from '../../components';
import ForumItem from '../../components/molecules/ForumItem';
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
                    <Gap height={150} />
                    <div className="container">
                         <h1 className="text-center mb-3">Articles</h1>
                         <div className="section-line mx-auto"></div>
                         <Gap height={50}  />
                        {
                             localStorage.getItem('userId') &&
                             <Button background="gray" title="Create New Forum" onClick={() => history.push('/forums/create')} />
                        }
                         <hr />
                         { forums.length > 0 && forums.map((forum) => {
                                   return (
                                        <ForumItem
                                             onClick={() => history.push(`/forums/${forum._id}`)}
                                             key={forum._id}
                                             title={forum.title}
                                             content={forum.content}
                                             user= {forum.user}
                                             forumPhoto={forum.forumPhoto}
                                             createdAt = {forum.createdAt}
                                        />
                                   ) 
                              })
                         }
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

export default Forums;