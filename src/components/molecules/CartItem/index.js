import React, { useState } from 'react';
import { Button, Gap, Input } from '../../atoms';
import './cartItem.scss';

const CartItem = (props) => {

     const [quantity, setQuantity] = useState(props.quantity);
     return (
          <div className="cart-card card"> 
               <div className="card-body">
                    <div className="row align-items-center">
                         <div className="col-md-3 my-3">
                              <img className="product-image" src={props.image} alt={props.name} />
                         </div>
                         <div className="col-md-5 my-3">
                              <p className="text-muted mb-2"><small><i class="fas fa-store"></i> {props.sellerName} Store</small></p>
                              <p>{props.name}</p>
                              <h5>Rp{new Intl.NumberFormat(['ban', 'id']).format(props.price)}</h5>
                              <Gap height={20} />
                              <div className="d-flex align-items-center">
                                   <p className="m-0 me-3">Quantity</p>
                                   <Input width={150} type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value) } disabled={props.quantityDisabled ? true : false}/> 
                                   <Gap width={20} />
                                   {
                                        quantity !== props.quantity && 
                                        <Button background="#287E00" title="Update" onClick={() => props.onChangeQuantity(props._id, quantity)} />
                                   }
                              </div>
                         </div>
                         <div className="col-md-3 my-3 offset-md-1 text-end">
                              <h3 className="text-danger mb-3">Rp{new Intl.NumberFormat(['ban', 'id']).format(props.price*props.quantity)}</h3>
                              {
                                   !props.removeDisabled &&  
                                   <Button background="gray" title="Remove" onClick={() => props.onDelete(props._id)}  />
                              }
                         </div>
                    </div>
                    
               </div>
          </div>
     )
}

export default CartItem;