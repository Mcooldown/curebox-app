import React from 'react';

const TransactionDetailItem = (props) => {

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
                              <p>Quantity: {props.quantity}</p>
                              <h5 className="text-danger mt-3">Rp{props.price}</h5>
                         </div>
                         <div className="col-md-3">
                              Subtotal:
                              <h3 className="text-danger">Rp{props.price*props.quantity}</h3>
                         </div>
                    </div>
                    
               </div>
          </div>
     )
}

export default TransactionDetailItem;