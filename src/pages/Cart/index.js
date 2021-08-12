import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, CartItem, Footer, Loading, Navbar } from '../../components';
import { setCartItems} from '../../config/redux/action/cartAction';
import { setIsLoading } from '../../config/redux/action/generalAction';

const Cart = () => {

     const history = useHistory();
     const {isLoading} = useSelector(state => state.generalReducer);
     const {cartItems} = useSelector(state => state.cartReducer);
     const dispatch = useDispatch();
     const [totalPayment, setTotalPayment] = useState(0);

     useEffect( async() => {
          const userId = localStorage.getItem('userId');
          if(!userId) history.push('/login');

          await dispatch(setIsLoading(true));
          await dispatch(setCartItems(userId));
          await setTotalPayment(countTotalPayment());

     }, [dispatch]);

     const countTotalPayment = () => {
          let total = 0;
          cartItems.forEach((cartItem) => {
               total += cartItem.product.price*cartItem.quantity;
          });
          return total;
     }

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
                         isLoading && totalPayment > 0 ?
                         <Loading title="Waiting for data" />
                         :
                         <Fragment>
                              {
                                   cartItems.map( (cartItem) => {
                                        return <CartItem key={cartItem._id}
                                        name={cartItem.product.name}
                                        description={cartItem.product.description}
                                        price={cartItem.product.price}
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