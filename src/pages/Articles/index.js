import React, { useEffect} from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CartButton, Footer, Gap, Navbar } from '../../components';
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
                    <Gap height={150} />
                    <div className="container">
                         <h2 className="text-center mb-3">Articles</h2>
                         <div className="section-line mx-auto"></div>
                         <Gap height={50}  />
                         <div className="row">
                              { articles.length > 0 && articles.map((article) => {
                                        return (
                                             <div className="col-md-3 my-3">
                                                  <ArticleItem
                                                  key={article._id}
                                                  _id={article._id}
                                                  title={article.title}
                                                  content= {article.content}
                                                  articlePhoto= {article.articlePhoto}
                                                  isRecommended={false}
                                                  user={article.user}
                                                  createdAt={article.createdAt}
                                                  onClick={(id) => history.push(`/articles/${id}`)}
                                                  />
                                             </div>   
                                        ) 
                                   })
                              }
                         </div>
                    </div>
                    <Gap height={150} />
                    <Footer />
                    <CartButton />
               </Fragment>     
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default Articles;