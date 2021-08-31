import React, { Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import {Navbar, Footer, ProductItem, Loading, CartButton, Gap}  from '../../components';
import ArticleItem from '../../components/molecules/ArticleItem';
import { clearArticles, setArticles } from '../../config/redux/action/articleAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { clearProducts, setProducts } from '../../config/redux/action/productAction';
import './home.scss';

const Home = () => {

     const {articles} = useSelector(state => state.articleReducer);
     const {products} = useSelector(state => state.productReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {

          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(clearProducts());
               await dispatch(setProducts(1, 12));
               await dispatch(clearArticles());
               await dispatch(setArticles(1, 4));
          }

          initialize();
     },[dispatch]);

     return (
          <Fragment>
               <Navbar />
               <div className="landing-section">
                    <div className="container h-100">
                         <div className="row align-items-center h-100">
                              <div className="col-md-6">
                                   <h1 className="text-landing">TAKE CARE <span className="fw-normal">OF YOUR
                                   </span>  BODY, 
                                   <span className="fw-normal"> IT’S THE ONLY</span> PLACE 
                                   <span className="fw-normal"> YOU HAVE</span> TO LIVE.
                                   </h1>
                                   <h4><span className="fw-normal mt-2">- Jim Rohn</span></h4>
                              </div>
                         </div>
                    </div>
               </div>
               <Gap height={120} />
               <div className="container">
                    <div className="text-dark">
                         <h1 className="text-center mb-3">Recommended For You</h1>
                         <div className="section-line mx-auto"></div>
                         <Gap height={30} />
                         <div className="row">
                              {
                                   products.length > 0 ? products.map ((product) => {
                                        return (
                                             <div className="col-md-3 my-3">
                                                  <ProductItem key={product._id}
                                                  _id = {product._id}
                                                  name={product.name}
                                                  description={product.description}
                                                  image={product.productPhoto}
                                                  price={product.price}
                                                  seller= {product.seller}
                                                  rating ={product.rating}
                                                  />
                                             </div>
                                        )
                                   })
                                   : <Loading title="Please wait..." />
                              }
                              
                         </div>
                    </div>
                    <Gap height={100} />
                    <h1 className="text-center mb-3">Get New Insight Here</h1>
                    <div className="section-line mx-auto"></div>
                    <Gap height={50}  />
                    <div className="row">
                         { articles.length > 0 ? articles.map((article) => {
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
                              : <Loading title="Please wait..." />
                         }
                    </div>
                    <Gap height={20} />
                    <p style={{ cursor:"pointer" }} className="text-end">Read more articles..</p>
               </div>
               <Gap height={150} />
               <Footer />
               <CartButton />
          </Fragment>
     )
}

export default withRouter(Home);