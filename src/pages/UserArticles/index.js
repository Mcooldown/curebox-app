import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Footer, Gap, Navbar } from '../../components';
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
                    <Gap height={150} />
                    <div className="container">
                         <h1 className="text-center mb-3">My Articles</h1>
                         <div className="section-line mx-auto"></div>
                         <Gap height={50}  />
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
                                                  createdAt = {article.createdAt}
                                                  isRecommended={false}
                                                  user={article.user}
                                                  onUpdate={onUpdate}
                                                  onDelete={onDelete}

                                                  onClick={(id) => history.push(`/articles/${id}`)}
                                                  />
                                             </div>   
                                        ) 
                                   })
                              }
                              <div className="col-md-4 my-3 d-flex align-items-center justify-content-center">
                                   <div style={{ cursor: "pointer" }} onClick={() => history.push('/articles/create') }>
                                        <h4>Add An Article</h4>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <Gap height={150} />
                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default UserArticles;