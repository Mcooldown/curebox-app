import React, { Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import {Navbar, Footer, ProductItem, Button, Loading}  from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setProducts } from '../../config/redux/action/productAction';


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
               <div className="container my-5 py-5">
                    <div className="text-dark">
                         <h1 className="text-center">Home Page</h1>
                         <hr />
                         <Button onClick={() => history.push('/products/create') } title="Create Product" />
                         
                         <div className="row">
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
                                   : <Loading title="Waiting for all products" />
                              }
                              
                         </div>
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default withRouter(Home);