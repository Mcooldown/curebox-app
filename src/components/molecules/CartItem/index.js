import React from 'react';
import { Button } from '../../atoms';

const CartItem = (props) => {
     return (
          <div className="card my-3 border-0 shadow"> 
               <div className="card-body my-2">
                    <div className="row">
                         <div className="col-md-8">
                              <h4>{props.name}</h4>
                              <p>{props.description}</p>
                              <p>Quantity:{props.quantity}</p>
                              <h5 className="text-danger">Rp{props.price}</h5>
                         </div>
                         <div className="col-md-4">
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