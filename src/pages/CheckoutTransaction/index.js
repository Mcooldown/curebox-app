import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Footer, Input, Navbar } from '../../components';
import { setCartItems } from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { checkoutTransaction, clearErrors, clearForm, setErrors, setForm } from '../../config/redux/action/transactionAction';
import LoadingPage from '../LoadingPage';

const CheckoutTransaction = () => {
     
     const history = useHistory();
     const {isLoading, totalPayment} = useSelector(state => state.generalReducer);
     const {cartItems} = useSelector(state => state.cartReducer);
     const {form, errors} = useSelector(state => state.transactionReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();

     useEffect(() => {

          async function fetchData(){
               await dispatch(setIsLoading(true));
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await dispatch(setCartItems(userId));
          }

          const userId = localStorage.getItem('userId');
          if(!userId) history.push('/login');

          fetchData();

     }, [dispatch, history]);

     const onSubmit = () => {
          
          setButtonLoading(true);
          checkoutTransaction(form, totalPayment)
          .then(res => {

               setButtonLoading(false);
               if(res.status === 200) {
                    dispatch(clearForm());
                    alert("Checkout success");
                    history.push('/transactions');
               }
               else{
                    dispatch(clearErrors());
                    res.data.data.map((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
                    alert("Checkout failed. Please fill the required information correctly");
               }
          });
     }

     if(!isLoading) {
          return(
               <Fragment>
                    <Navbar />
                    <div className="container py-5 my-5">
                         <h1>Checkout Transaction</h1>
                         <hr />
                         <div className="row justify-content-center">
                              <div className="col-md-7">
                                   <Input type="text" label="Send Address" value={form.sendAddress} 
                                   errorMessage={errors.sendAddress && errors.sendAddress}
                                   onChange={(e) => dispatch(setForm('sendAddress',e.target.value))} />

                                   <Input type="text" label="Receiver Name" value={form.receiverName} 
                                   errorMessage={errors.receiverName && errors.receiverName}
                                   onChange={(e) => dispatch(setForm('receiverName',e.target.value))} />

                                   <Input type="text" label="Receiver Phone Number" value={form.receiverPhoneNumber} 
                                   errorMessage={errors.receiverPhoneNumber && errors.receiverPhoneNumber}
                                   onChange={(e) => dispatch(setForm('receiverPhoneNumber',e.target.value))} />

                                   <Input type="text" label="Notes" value={form.notes} onChange={(e) => dispatch(setForm('notes',e.target.value))} />
                                   {
                                        buttonLoading ?
                                        <Button isLoading={true} title="Please wait..." />
                                        : <Button title="Checkout" onClick={onSubmit} />
                                   }
                                   
                              </div>
                              <div className="col-md-5">
                                   <div className="card border-0 shadow">
                                        <div className="card-body my-2">
                                             <h4>Cart Items</h4>
                                             <hr />
                                             {
                                                  cartItems.map( (cartItem) => {
                                                       return <Fragment>
                                                            <div className="row my-2">
                                                                 <div className="col-md-4">
                                                                      <img src={cartItem.product.productPhoto} className="w-100" alt={cartItem.product.name} />
                                                                 </div>
                                                                 <div className="col-md-8">
                                                                      <h5>{cartItem.product.name}</h5>
                                                                      <p>Price: Rp{cartItem.product.price} <br />
                                                                      Quantity: {cartItem.quantity} <br />
                                                                      Subtotal: Rp{cartItem.quantity*cartItem.product.price}
                                                                      </p>
                                                                 </div>
                                                            </div>
                                                            <hr />
                                                       </Fragment>
                                                  })

                                             }
                                             <h4 className="my-3">Grand Total: <b>Rp{totalPayment}</b></h4>
                                        </div>
                                   </div>
                                   
                              </div>
                         </div>
                         
                         
                    </div>
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default CheckoutTransaction;