import React from 'react';
import './productItem.scss'

const ProductItem = (props) => {
     return (
          <div className="card border-0 shadow-sm">
               <img className="product-image" src={props.image} />
               <div className="card-body">
                    <h4>{props.name}</h4>
                    <p>{props.description}</p>
                    <h5 className="text-danger">Rp{props.price}</h5>
               </div>
          </div>
     );
}

export default ProductItem;