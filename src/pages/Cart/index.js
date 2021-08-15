import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, CartItem, Footer, Navbar } from '../../components';
import { changeCartItemQuantity, removeCartItems, setCartItems} from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import {LoadingPage} from '../../pages';

const Cart = () => {

     const history = useHistory();
     const {isLoading} = useSelector(state => state.generalReducer);
     const {cartItems, totalPayment} = useSelector(state => state.cartReducer);
     const dispatch = useDispatch();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId) history.push('/login');

          async function initialize () {
               await dispatch(setIsLoading(true));
               await dispatch(setCartItems(userId));
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
                    <div className="container py-5 my-5">
                         <h1>Your Cart</h1>
                         <hr />
                         {
                              cartItems.map( (cartItem) => {
                                   return <CartItem key={cartItem._id}
                                   _id= {cartItem._id}
                                   name={cartItem.product.name}
                                   description={cartItem.product.description}
                                   price={cartItem.product.price}
                                   image={cartItem.product.productPhoto}
                                   quantity={cartItem.quantity}
                                   onDelete={onDelete}
                                   onChangeQuantity={onChangeQuantity} />
                              })

                         }
                         {
                              cartItems.length ?
                              <div className="text-end">
                                   <h3 className="mt-5 mb-3">Grand Total: <b>Rp{totalPayment}</b></h3>
                                   <Button title="CHECKOUT" onClick={() => history.push('/checkout')} />
                              </div> : null
                         }
                    </div>
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
};

export default Cart;