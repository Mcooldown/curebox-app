import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { Footer, Gap, Navbar } from '../../components';
import { setArticle, setArticles } from '../../config/redux/action/articleAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import LoadingPage from '../LoadingPage';
import './articleDetail.scss';

const ArticleDetail = (props) => {

     const {isLoading} = useSelector(state => state.generalReducer);
     const {article, articles} = useSelector(state => state.articleReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          
          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(setArticle(props.match.params.id));
               await dispatch(setArticles(1,5));
          }
          initialize();
          
     }, [dispatch, props]);
     
     if(!isLoading && article.user && articles.length > 0){
          return (
                <Fragment>
                    <Navbar />
                    <div className="article-detail container">
                         <div className="row">
                              <div className="col-md-8 my-3 pe-lg-4">
                                   <h1 className="text-center">{article.title}</h1>
                                   <div className="text-muted d-flex justify-content-between my-5">
                                        <p className="h5">Creator: <span><h5 className="d-inline-flex">{article.user.name}</h5></span></p>
                                        <h5>{ new Date(article.createdAt).toDateString("en-US")}</h5>
                                   </div>
                                   <img className="article-img" src={article.articlePhoto} alt={article.title} />
                                   <div className="mt-5" dangerouslySetInnerHTML={{__html:article.content}}></div>
                              </div>
                              <div className="col-md-4 my-3 ps-lg-4">
                                   <h4>Recommended Articles</h4>
                                   <Gap height={10} />
                                   <div className="more-rec">
                                        <div className="card-body">
                                             { 
                                                  articles.length > 0 && articles.map((article) => {
                                                       return (
                                                            <div className="row align-items-center my-3 more-rec-item"
                                                            onClick={() => history.push(`/articles/${article._id}`)}>
                                                                 <div className="col-md-4">
                                                                      <img src={article.articlePhoto} className="more-rec-img" alt={article.title} />
                                                                 </div>
                                                                 <div className="col-md-8">
                                                                      <h5 className="more-rec-title">{article.title}</h5>
                                                                 </div>
                                                            </div>
                                                       ) 
                                                  })
                                             }
                                        </div>
                                   </div>
                                   
                              </div>
                         </div>
                    </div>
                    <Footer />
               </Fragment>     
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(ArticleDetail);