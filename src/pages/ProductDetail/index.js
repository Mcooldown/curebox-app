import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Footer, Input, Loading, Navbar } from '../../components';
import { addCartItem } from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setProduct } from '../../config/redux/action/productAction';

const ProductDetail = (props) => {

     const {product} = useSelector(state => state.productReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();
     const [quantity, setQuantity] = useState(1);

     useEffect(async() => {
          await dispatch(setIsLoading(true));
          
          const id = props.match.params.id
          await dispatch(setProduct(id));
     }, [dispatch]);

     const onSubmit = () => {

          if(quantity <= 0) return alert('Quantity minimum 1');
          const data = {
               userId: localStorage.getItem('userId'),
               productId: props.match.params.id,
               quantity: quantity,
          };

          setButtonLoading(true);
          addCartItem(data)
          .then(res => {
               setButtonLoading(false);
               if(res.status === 200){
                    alert(res.data.message);
                    history.push('/cart');
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
                    <div className="container my-5 py-5">
                    {
                         isLoading === false && product.seller ?
                         (
                              <Fragment>
                                   <Button title="Back to home" onClick={() => history.push('/')} />
                                   <div className="row mt-3">
                                        <div className="col-md-5">
                                             <img src={product.productPhoto} className="w-100" alt={product.name} />
                                        </div>
                                        <div className="col-md-7">
                                             <h1>{product.name}</h1>
                                             <p>{product.description}</p>
                                             <p className="text-muted">by {product.seller.name}</p>
                                             <hr />
                                             <Input type="number" min={1} onChange={(e) => setQuantity(e.target.value)} value={quantity} label="Quantity" errorMessage={''} />
                                             {
                                                  buttonLoading ?
                                                  <Button title="Please Wait..." isLoading={true} />
                                                  :
                                                  <Button title="Add to cart" isLoading={false} onClick={onSubmit} />
                                             }
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
