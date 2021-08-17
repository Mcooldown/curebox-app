import React, { useEffect, useState} from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Footer, Navbar, ProductItem } from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { clearProducts, setProducts } from '../../config/redux/action/productAction';
import LoadingPage from '../LoadingPage';

const ProductSearch = (props) => {

     const {isLoading} = useSelector(state => state.generalReducer);
     const {products ,page} = useSelector(state => state.productReducer);
     const dispatch = useDispatch();
     const [counter, setCounter] = useState(1);

     useEffect(() => {

          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(clearProducts());
               await dispatch(setProducts(counter, 1, props.match.params.searchValue));
          }

          initialize();
     }, [dispatch, props, counter]);

     const handleNext = () => {
          setCounter(counter >= page.totalPage ? 1 : counter+1);
     }

     const handlePrevious = () => {
          setCounter(counter <= 1 ? 1 : counter-1);
     }

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <div className="container my-5 py-5">
                         <h1>Search Result: {props.match.params.searchValue}</h1>
                         <p>{products.length} result found - Page {page.currentPage}/{page.totalPage} - 
                         Showing {page.perPage} of {page.totalData} result</p>
                         <hr />
                         <div className="row">
                              {
                                   products.length > 0 ? products.map((product) => {
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
                                   }) : <div className="alert alert info">No result found</div>
                              }
                         </div>
                         <Button background="#287E00" title="Previous" onClick={handlePrevious} />
                         <Button background="#287E00" title="Next" onClick={handleNext} />
                    </div>

                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }

}

export default withRouter(ProductSearch);