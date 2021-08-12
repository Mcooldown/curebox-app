import React, { Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { BannerVector } from '../../assets';
import {Navbar, Footer, ProductItem, Button, Loading}  from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setProducts } from '../../config/redux/action/productAction';
import './home.scss';

const Home = () => {

     const [currentPage, setCurrentPage] = useState(1); 
     const {isLoading} = useSelector(state => state.generalReducer);
     const {products, page} = useSelector(state => state.productReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          dispatch(setIsLoading(true));
          dispatch(setProducts(currentPage));
     },[dispatch, currentPage]);

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
               <div className="container my-5 py-5">
                    <div className="text-dark">
                         <h1 className="text-center mb-3">Recommended For You</h1>
                         <div className="section-line mx-auto"></div>

                         <div className="row my-5">
                              {
                                   isLoading === false ?
                                   products && products.map ((product) => {
                                        return (
                                             <div className="col-md-3 my-3">
                                                  <ProductItem key={product._id}
                                                  _id = {product._id}
                                                  name={product.name}
                                                  description={product.description}
                                                  image={product.productPhoto}
                                                  price={product.price}
                                                  seller = {product.seller}
                                                  />
                                             </div>
                                        )
                                   })
                                   : <Loading title="Please wait..." />
                              }
                              
                         </div>
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default withRouter(Home);