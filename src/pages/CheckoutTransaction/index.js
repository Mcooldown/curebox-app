import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { Button, CartItem, Footer, Gap, Input, Navbar, TextArea } from '../../components';
import { setCartItems } from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { checkoutTransaction, clearErrors, clearForm, setErrors, setForm } from '../../config/redux/action/transactionAction';
import LoadingPage from '../LoadingPage';
import './checkoutTransaction.scss';

const CheckoutTransaction = () => {
     
     const history = useHistory();
     const {isLoading} = useSelector(state => state.generalReducer);
     const {cartItems, totalPayment} = useSelector(state => state.cartReducer);
     const {form, errors} = useSelector(state => state.transactionReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();

     useEffect(() => {
          async function initialize(){
               await dispatch(setIsLoading(true));
               await dispatch(clearForm());
               await dispatch(clearErrors());
               await dispatch(setCartItems(userId));
          }

          const userId = localStorage.getItem('userId');
          if(!userId) return history.push('/login');

          initialize();

     }, [dispatch, history]);

     const onSubmit = () => {
          
          setButtonLoading(true);
          checkoutTransaction(form, totalPayment)
          .then(res => {

               setButtonLoading(false);
               if(res.status === 200) {
                    dispatch(clearForm());
                    Swal.fire({
                         title: 'Success',
                         text: 'Checkout Success',
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    });
                    return history.push('/transactions');
               }
               else{
                    dispatch(clearErrors());
                    res.data.data.forEach((error) => {
                         dispatch(setErrors(error.param, error.msg));
                    });
                    Swal.fire({
                         title: 'Error',
                         text: 'Checkout failed. Please make sure that required data already filled correctly.',
                         icon: 'error',
                         confirmButtonColor: '#287E00',
                    });
                    window.scrollTo(0, 0);
               }
          });
     }

     if(!isLoading) {
          return(
               <Fragment>
                    <Navbar />
                    <Gap height={150} />
                    <div className="container">
                         <h1 className="text-center mb-3">Checkout</h1>
                         <div className="section-line mx-auto"></div>
                         <Gap height={50}  />
                         <h5 style={{ color: "#127E00" }}>Input Address</h5>
                         <Gap height={30}  />
                         <div className="green-wrapper">
                              <div className="card-body">
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Address</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <TextArea type="text" value={form.address}
                                             placeholder="Nama Jalan, Nomor Rumah, RT, RW"
                                             errorMessage={errors.address && errors.address}
                                             onChange={(e) => dispatch(setForm('address',e.target.value))} />
                                        </div>
                                   </div>

                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Province</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <Input type="text" value={form.province}
                                             placeholder="Provinsi"
                                             errorMessage={errors.province && errors.province}
                                             onChange={(e) => dispatch(setForm('province',e.target.value))} />
                                        </div>
                                   </div>

                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>City / District</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <Input type="text" value={form.cityDistrict}
                                             placeholder="Kota / Kabupaten"
                                             errorMessage={errors.cityDistrict && errors.cityDistrict}
                                             onChange={(e) => dispatch(setForm('cityDistrict',e.target.value))} />
                                        </div>
                                   </div>

                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Sub-district</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <Input type="text" value={form.subDistrict}
                                             placeholder="Kecamatan"
                                             errorMessage={errors.subDistrict && errors.subDistrict}
                                             onChange={(e) => dispatch(setForm('subDistrict',e.target.value))} />
                                        </div>
                                   </div>

                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Urban Village</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <Input type="text" value={form.urbanVillage}
                                             placeholder="Kelurahan"
                                             errorMessage={errors.urbanVillage && errors.urbanVillage}
                                             onChange={(e) => dispatch(setForm('urbanVillage',e.target.value))} />
                                        </div>
                                   </div>

                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Postal Code</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <Input type="text" value={form.postalCode}
                                             placeholder="Kode Pos"
                                             errorMessage={errors.postalCode && errors.postalCode}
                                             onChange={(e) => dispatch(setForm('postalCode',e.target.value))} />
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <Gap height={50} />
                         <h5 style={{ color: "#127E00" }}>Input Receiver Information</h5>
                         <Gap height={30}  />
                         <div className="green-wrapper">
                              <div className="card-body">
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Receiver Name</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <Input type="text" value={form.receiverName} 
                                             errorMessage={errors.receiverName && errors.receiverName}
                                             onChange={(e) => dispatch(setForm('receiverName',e.target.value))} />
                                        </div>
                                   </div>
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Receiver Phone Number</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <Input type="text" value={form.receiverPhoneNumber} 
                                             errorMessage={errors.receiverPhoneNumber && errors.receiverPhoneNumber}
                                             onChange={(e) => dispatch(setForm('receiverPhoneNumber',e.target.value))} />
                                        </div>
                                   </div>
                                   <div className="form-group row align-items-center">
                                        <div className="col-md-3">
                                             <h6>Notes</h6>
                                        </div>
                                        <div className="col-md-9">
                                             <TextArea type="text" value={form.notes} onChange={(e) => dispatch(setForm('notes',e.target.value))} />
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <Gap height={50} />
                         <h5 style={{ color: "#127E00" }}>Re-check Your Orders</h5>
                         <Gap height={30}  />
                         {
                              cartItems.length >0 && cartItems.map( (cartItem) => {
                                   return <CartItem key={cartItem._id}
                                   _id= {cartItem._id}
                                   productId={cartItem.product._id}
                                   name={cartItem.product.name}
                                   description={cartItem.product.description}
                                   price={cartItem.product.price}
                                   image={cartItem.product.productPhoto}
                                   quantity={cartItem.quantity}
                                   sellerName={cartItem.product.seller.name}
                                   quantityDisabled
                                   removeDisabled />
                              })
                         }
                         <Gap height={30} />
                         {
                              cartItems.length >0 &&
                              <div className="total-wrapper">
                                   <div className="d-flex align-items-center justify-content-end">
                                        <h5 className="me-2">Total: </h5>
                                        <h2 className="fw-bold text-danger mb-3">Rp{new Intl.NumberFormat(['ban', 'id']).format(totalPayment)}</h2>
                                   </div>
                              </div>
                         }   
                         <Gap height={50} />
                         <div className="d-grid">
                         {
                              buttonLoading ?

                              <Button background="#287E00" isLoading={true} title="Please wait..." />
                              : <Button background="#287E00" title="Finish Checkout" onClick={onSubmit} />
                         }
                         </div>
                         
                    </div>
                    <Gap height={150} />
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default CheckoutTransaction;