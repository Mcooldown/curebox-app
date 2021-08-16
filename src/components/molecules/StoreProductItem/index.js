import React from 'react';
import { Button } from '../../atoms';

const StoreProductItem = (props) => {

     return (
          <div className="card border-0 shadow-sm">
               <div className="card-body">
                    <div className="row">
                         <div className="col-md-3">
                              <img className="w-100" src={props.image} alt={props.name} />
                         </div>
                         <div className="col-md-7">
                              <p className="mb-2">{props.name}</p>
                              <h5 className="mb-2">Rp{props.price}</h5>
                              <i class="fa fa-star"></i> {props.rating}/5.00
                         </div>
                         <div className="col-md-2">
                              <Button background="#287E00" title="Update" onClick={() => props.onUpdate(props._id)} />
                              <Button background="#287E00" title="Delete" onClick={() => props.onDelete(props._id)} />
                         </div>
                    </div>
                    
               </div>
          </div>
     );
}

export default StoreProductItem;