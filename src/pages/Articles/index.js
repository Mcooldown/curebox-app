import React, { useEffect} from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Footer, Navbar } from '../../components';
import ArticleItem from '../../components/molecules/ArticleItem';
import { setArticles } from '../../config/redux/action/articleAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';

const Articles = () => {

     const {isLoading} = useSelector(state => state.generalReducer);
     const {articles} = useSelector(state => state.articleReducer); 
     const history = useHistory();
     const dispatch = useDispatch();

     useEffect(() => {

          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(setArticles(1, 8));
          }

          initialize();

     }, [dispatch]);

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
     
                    <div className="container my-5 py-5">
                         <h1>Articles</h1>
                         <hr />
                         {
                              localStorage.getItem('userId') &&
                              <Button background="#287E00" title="Create New Article" onClick={() => history.push('/articles/create') } />
                         }
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

export default Articles;