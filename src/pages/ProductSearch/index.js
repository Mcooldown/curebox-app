import React, { useEffect, useState} from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Footer, Gap, Loading, Navbar, ProductItem, Select } from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { clearProducts, setProducts } from '../../config/redux/action/productAction';
import './productSearch.scss';

const ProductSearch = (props) => {

     const {isLoading} = useSelector(state => state.generalReducer);
     const {products ,page} = useSelector(state => state.productReducer);
     const dispatch = useDispatch();
     const [counter, setCounter] = useState(1);
     const [perPage, setPerPage] = useState(4);
     const perPageOptions = [4,8,12,16];

     useEffect(() => {

          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(clearProducts());
               await dispatch(setProducts(counter, perPage, props.match.params.searchValue));
          }

          initialize().then(() => window.scrollTo(0,0));

     }, [dispatch, props, counter, perPage]);

     return (
          <Fragment>
               <Navbar />
               <Gap height={150} />
               <div className="container">
                    <h2 className="text-center mb-3">Search Results for "{props.match.params.searchValue}"</h2>
                    <div className="section-line mx-auto"></div>
                    <Gap height={50}  />
                    <div className="d-flex align-items-center">
                         <h5 style={{ color: "#287E00" }} className="m-0">Show</h5>
                         <Gap width={10} />
                         <Select
                         width={100}
                         options={perPageOptions}
                         defaultValue={perPage}
                         value={perPage}
                         onChange={(e) => {setPerPage(e.target.value); setCounter(1)}}
                         />
                         <Gap width={10} />
                         <h5 style={{ color: "#287E00" }} className="m-0">Results</h5>
                    </div>
                    <Gap height={30} />
                    {
                         !isLoading ?
                         <Fragment>
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
                              <Gap height={50} />
                              <div className="d-flex justify-content-end">
                                   <div className="pagination-box" onClick={() => setCounter(counter <= 1 ? 1 : counter-1)}>
                                        &lt;&lt; Previous
                                   </div>
                                   {Array(page.totalPage).fill(null).map((value, index) => {

                                        const border = (index+1 === parseInt(page.currentPage)) ? '3px solid #127E00' : '';
                                   
                                        return (
                                             <div className="pagination-box" style={{ border }} onClick={() => setCounter(index+1)}>
                                                  {index+1}
                                             </div>
                                        )
                                   }

                                   )}
                                   <div className="pagination-box" onClick={() => setCounter(counter >= page.totalPage ? page.totalPage : counter+1)}>
                                        Next &gt;&gt;
                                   </div>
                                   
                              </div>
                         </Fragment>
                         :
                         <Loading title="Please wait..." />
                    }
                    
               </div>
               <Gap height={150} />
               <Footer />
          </Fragment>
     )

}

export default withRouter(ProductSearch);