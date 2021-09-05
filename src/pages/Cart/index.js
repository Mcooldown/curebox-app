import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, CartItem, Footer, Navbar } from '../../components';
import { changeCartItemQuantity, removeCartItems, setCartItems} from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import {LoadingPage} from '../../pages';
import './cart.scss';

const Cart = () => {

     const history = useHistory();
     const {isLoading} = useSelector(state => state.generalReducer);
     const {cartItems, totalPayment} = useSelector(state => state.cartReducer);
     const dispatch = useDispatch();

     useEffect(() => {
          
          async function initialize () {
               await dispatch(setIsLoading(true));
               
               const userId = await localStorage.getItem('userId');
               if(!userId){
                    alert('Not Authorized. Please Login first');
                    history.push('/login');
               }else{
                    await dispatch(setCartItems(userId));
               }
          }
          initialize();

     }, [dispatch, history]);

     const onDelete = async (id) => {
          let confirmDelete = window.confirm("Are you sure want to delete this cart item?");
          if(confirmDelete) {
               await dispatch(setIsLoading(true));
               await dispatch(removeCartItems(id, localStorage.getItem('userId')));
          }
     }

     const onChangeQuantity = async (id, quantity) => {
          await dispatch(setIsLoading(true));
          await dispatch(changeCartItemQuantity(id, parseInt(quantity), localStorage.getItem('userId')));
     }

     if(!isLoading) {
          return(
               <Fragment>
                    <Navbar />
                    <div className="cart-wrapper">
                         <div className="container">
                              <h1 className="text-center mb-3">My Cart</h1>
                              <div className="section-line mx-auto"></div>

                              <div className="cart-item-wrapper">
                                   {
                                        cartItems.length >0 ? cartItems.map( (cartItem) => {
                                             return <CartItem key={cartItem._id}
                                             _id= {cartItem._id}
                                             productId={cartItem.product._id}
                                             name={cartItem.product.name}
                                             description={cartItem.product.description}
                                             price={cartItem.product.price}
                                             image={cartItem.product.productPhoto}
                                             quantity={cartItem.quantity}
                                             sellerName={cartItem.product.seller.name}
                                             onDelete={onDelete}
                                             onChangeQuantity={onChangeQuantity} />
                                        }) : (
                                             <div className="alert alert-dark">
                                                  No items in cart. <h6 className="d-inline" onClick={() => history.push('/')}>Fill it with your medicine</h6>
                                             </div>
                                        ) 

                                   }
                              </div>
                              {
                                   cartItems.length >0 ?
                                   <div className="total-wrapper">
                                        <div className="d-flex align-items-center justify-content-end">
                                             <h5 className="me-2">Total: </h5>
                                             <h2 className="fw-bold text-danger mb-3">{new Intl.NumberFormat(['ban', 'id']).format(totalPayment)}</h2>
                                        </div>
                                        <Button width="300px" background="#287E00" title="CHECKOUT" onClick={() => history.push('/checkout')} />
                                   </div> : null
                              }
                         </div>
                    </div>
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
};

export default Cart;