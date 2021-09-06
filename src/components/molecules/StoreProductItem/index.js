import React from 'react';
import { Button, Gap } from '../../atoms';

const StoreProductItem = (props) => {

     return (
          <div className="card card-item">
               <img className="product-image" src={props.image} alt={props.name} />
               <div className="card-body">
                    <p className="product-name m-0">{props.name}</p>
                    <h5 className="mb-2">Rp{props.price}</h5>
                    <Gap height={20} />
                    <div className="d-flex justify-content-end">
                         <button className="btn-delete me-2" onClick={() => props.onDelete(props._id)}>Delete</button>
                         <Button background="#287E00" title="Edit" onClick={() => props.onUpdate(props._id)} />
                    </div>
               </div>
          </div>
     );
}

export default StoreProductItem;