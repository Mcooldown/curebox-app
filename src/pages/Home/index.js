import React, { Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import {Navbar, Footer, ProductItem, Button}  from '../../components';
import { setProducts } from '../../config/redux/action/productAction';


const Home = () => {

     const [currentPage, setCurrentPage] = useState(1); 
     const {products, page} = useSelector(state => state.productReducer);
     const dispatch = useDispatch();
     const history = useHistory();

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
                         <Button onClick={() => history.push('/products/create') } title="Create Product" />
                         <div className="row">
                              {products.map ((product) => {
                                   return (
                                        <div className="col-md-6 my-3">
                                             <ProductItem key={product._id}
                                             name={product.name}
                                             description={product.description}
                                             image={product.productPhoto}
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