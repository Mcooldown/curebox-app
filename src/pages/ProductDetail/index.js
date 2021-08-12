import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Footer, Loading, Navbar } from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setProduct } from '../../config/redux/action/productAction';

const ProductDetail = (props) => {

     const {product} = useSelector(state => state.productReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const id = props.match.params.id
          dispatch(setIsLoading(true));
          dispatch(setProduct(id));
     }, [props, dispatch]);

     return (
          <Fragment>
               <Navbar />
                    <div className="container my-5 py-5">
                    {
                         isLoading === false ?
                         (
                              <Fragment>
                                   <Button title="Back to home" onClick={() => history.push('/')} />
                                   <div className="row mt-3">
                                        <div className="col-md-5">
                                             <img src={product.productPhoto} className="w-100" />
                                        </div>
                                        <div className="col-md-7">
                                             <h1>{product.name}</h1>
                                             <p>{product.description}</p>
                                             <p className="text-muted">by {product.seller.name}</p>
                                        </div>
                                   </div>
                              </Fragment>
                         )  : <Loading title="Waiting for data" />
                    }
                    </div>
               <Footer />
          </Fragment>
     );
}

export default withRouter(ProductDetail);
