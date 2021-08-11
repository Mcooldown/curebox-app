import React, { Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import {Navbar, Footer, ProductItem}  from '../../components';
import { setProducts } from '../../config/redux/action';


const Home = () => {

     const [currentPage, setCurrentPage] = useState(1); 
     const {products, page} = useSelector(state => state.productReducer);
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(setProducts(currentPage));
     },[dispatch, currentPage]);

     return (
          <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    <div className="text-dark text-center">
                         <h1>Home Page</h1>
                         <hr />
                         <div className="row">
                              {products.map ((product) => {
                                   return (
                                        <div className="col-md-6 my-3">
                                             <ProductItem key={product._id}
                                             name={product.name}
                                             description={product.description}
                                             image={`https://curebox-api.herokuapp.com/${product.product_photo}`}
                                             price={product.price}
                                             />
                                        </div>
                                   );
                              })}
                         </div>
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default withRouter(Home);