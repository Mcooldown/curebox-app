import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Footer, Navbar } from '../../components';
import ArticleItem from '../../components/molecules/ArticleItem';
import { deleteArticle, setUserArticles } from '../../config/redux/action/articleAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';

const UserArticles = () => {

     const {isLoading} = useSelector(state => state.generalReducer);
     const {articles} = useSelector(state => state.articleReducer);
     const dispatch = useDispatch();
     const history = useHistory();
     
     useEffect(() => {

          const userId = localStorage.getItem('userId');
          if(!userId){
               alert('Not authorized. Please login first');
               history.push('/login');
          } 

          async function initialize(){
               await dispatch(setIsLoading(true));
               await dispatch(setUserArticles(userId, 1, 8));
          }
          initialize();

     }, [dispatch, history]);

     const onDelete = (e,id) => {
          e.stopPropagation();

          async function finalize(){
               await dispatch(setIsLoading(true));
               await dispatch(deleteArticle(localStorage.getItem('userId'),id));
          }

          const confirmDelete = window.confirm('Are you sure want to delete this articles?');

          if(confirmDelete){
               finalize();
          }
     }

     const onUpdate = (e, id) => {
          e.stopPropagation();
          history.push(`/articles/edit/${id}`);
     }

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <div className="container my-5 py-5">
                         <h1>My Articles</h1>
                         <hr />
                         <Button background="#287E00" title="Create New Article" onClick={() => history.push('/articles/create') } />
                         <div className="row">
                              { articles.length > 0 && articles.map((article) => {
                                        return (
                                             <div className="col-md-4 my-3">
                                                  <ArticleItem
                                                  key={article._id}
                                                  _id={article._id}
                                                  title={article.title}
                                                  content= {article.content}
                                                  articlePhoto= {article.articlePhoto}
                                                  isRecommended={false}
                                                  user={article.user}
                                                  onUpdate={onUpdate}
                                                  onDelete={onDelete}
                                                  />
                                             </div>   
                                        ) 
                                   })
                              }
                         </div>
                    </div>
                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default UserArticles;