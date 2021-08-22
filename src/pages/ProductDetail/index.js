import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Minus, Plus } from '../../assets';
import { Button, CartButton, Footer, Gap, Navbar } from '../../components';
import { addCartItem } from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setProduct } from '../../config/redux/action/productAction';
import {LoadingPage} from '../../pages';
import './productDetail.scss';

const ProductDetail = (props) => {

     const {product} = useSelector(state => state.productReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();
     const [quantity, setQuantity] = useState(1);

     useEffect(() => {
          
          const id = props.match.params.id;

          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(setProduct(id));
          }
          
          initialize();

     }, [dispatch, props.match.params.id]);

     const onSubmit = () => {

          const id = localStorage.getItem('userId');

          if(id){
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
                         history.push('/cart');
                    }
               });
          }else{
               alert('Please login first')
               history.push('/login');
          }
     }


     if(!isLoading && product.seller && !product.isDeleted){
          return (
               <Fragment>
               <Navbar />
               <Gap height={150} />
               <div className="container">
                    <Button background="#287E00" title="Back to home" onClick={() => history.push('/')} />
                    <Gap height={30} />
                    <div className="row justify-content-between">
                         <div className="col-md-5">
                              <img src={product.productPhoto} className="w-100" alt={product.name} />
                              <Gap height={30} />
                              <div class="d-flex justify-content-between align-items-center border rounded">
                                   <img class="minus-btn" src={Minus} alt="minus-btn" height={50} onClick={() => quantity > 1 ? setQuantity(quantity-1) : ''} />
                                   <h5 class="text-center m-0">{quantity}</h5>
                                   <img class="plus-btn" src={Plus} alt="plus-btn" height={50} onClick={() => setQuantity(quantity+1)} />
                              </div>
                              <Gap height={40} />
                              <div className="d-grid">
                                   {
                                        buttonLoading ?
                                        <Button background="#287E00" title="Please Wait..." isLoading={true} />
                                        :
                                        <Button background="#287E00" title="Add to cart" isLoading={false} onClick={onSubmit} />
                                   }
                              </div>
                         </div>
                         <div className="col-md-6">
                              <h1>{product.name}</h1>
                              <Gap height={20} />
                              <p className="text-muted"><i class="fas fa-store"></i> {product.seller.name} Store</p>
                              <Gap height={30} />
                              <h3 className="fw-bold mb-3">Description</h3>
                              <p>{product.description}</p>
                              <Gap height={30} />
                              <h3>Rp{new Intl.NumberFormat(['ban', 'id']).format(product.price)}</h3>
                         </div>
                    </div>
               </div>
               <Gap height={150} />
               <Footer />
               <CartButton />
          </Fragment>
          )
     }else if(product.isDeleted){
          return <p>Product Not Available</p>
     }
     else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(ProductDetail);
