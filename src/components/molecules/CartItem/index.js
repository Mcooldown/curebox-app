import React, { useState } from 'react';
import { Button, Input } from '../../atoms';

const CartItem = (props) => {

     const [quantity, setQuantity] = useState(props.quantity)

     return (
          <div className="card my-3 border-0 shadow"> 
               <div className="card-body my-2">
                    <div className="row">
                         <div className="col-md-3">
                              <img className="product-image w-100" src={props.image} alt={props.name} />
                         </div>
                         <div className="col-md-6">
                              <h4>{props.name}</h4>
                              <p>{props.description}</p>
                              <p>Quantity:
                                   <Input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value) } /> 
                              </p>
                              {
                                   quantity !== props.quantity && 
                                   <Button title="Update" onClick={() => props.onChangeQuantity(props._id, quantity)} />
                              }
                              <h5 className="text-danger mt-3">Rp{props.price}</h5>
                         </div>
                         <div className="col-md-3">
                              Subtotal:
                              <h3 className="text-danger">Rp{props.price*props.quantity}</h3>
                              <Button title="Delete" onClick={() => props.onDelete(props._id)}  />
                         </div>
                    </div>
                    
               </div>
          </div>
     )
}

export default CartItem;