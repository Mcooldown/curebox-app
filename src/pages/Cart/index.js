import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
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
                    history.push('/login');
               }else{
                    await dispatch(setCartItems(userId));
               }
          }
          initialize();

     }, [dispatch, history]);

     const onDelete = async (id) => {

          async function finalize() {
               await dispatch(setIsLoading(true));
               await dispatch(removeCartItems(id, localStorage.getItem('userId')));
          }

          Swal.fire({
               title: 'Are you sure want to delete this product from your cart?',
               text: "This action cannot be reverted",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#287E00',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
               }).then((result) => {
               if (result.isConfirmed) {
                    finalize().then(() => {
                         Swal.fire({
                         title: 'Success',
                         text: "Product deleted from your cart",
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    });
               });
               }
          })
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
                                        <Button width="300px" background="#287E00" title="Checkout" onClick={() => history.push('/checkout')} />
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