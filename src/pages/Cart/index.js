import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, CartItem, Footer, Loading, Navbar } from '../../components';
import { setCartItems} from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';

const Cart = () => {

     const history = useHistory();
     const {isLoading} = useSelector(state => state.generalReducer);
     const {cartItems, totalPayment} = useSelector(state => state.cartReducer);
     const dispatch = useDispatch();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId) history.push('/login');

          dispatch(setIsLoading(true));
          dispatch(setCartItems(userId));

     }, [dispatch, history]);

     const onDelete = (id) => {

          let confirmDelete = window.confirm("Are you sure want to delete this cart item?");
          if(confirmDelete) {
               
          }
     }

     return (
          <Fragment>
               <Navbar />
               <div className="container py-5 my-5">
                    <h1>Your Cart</h1>
                    <hr />
                    {
                         (isLoading) ?
                         <Loading title="Waiting for data" />
                         :
                         <Fragment>
                              {
                                   cartItems.map( (cartItem) => {
                                        return <CartItem key={cartItem._id}
                                        name={cartItem.product.name}
                                        description={cartItem.product.description}
                                        price={cartItem.product.price}
                                        image={cartItem.product.productPhoto}
                                        quantity={cartItem.quantity}
                                        onDelete={onDelete} />
                                   })

                              }
                              <div className="text-end">
                                   <h3 className="mt-5 mb-3">Grand Total: <b>Rp{totalPayment}</b></h3>
                                   <Button title="Proceed to transaction" />
                              </div>
                         </Fragment>
                    }
               </div>
               <Footer />
          </Fragment>
     );
};

export default Cart;