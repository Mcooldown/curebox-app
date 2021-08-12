import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../atoms';
import './productItem.scss'

const ProductItem = (props) => {

     const history = useHistory();

     return (
          <div className="card card-product" onClick={() => history.push(`/products/${props._id}`)}>
               <img className="product-image" src={props.image} alt={props.name} />
               <div className="card-body">
                    <p className="mb-2">{props.name}</p>
                    <h5 className="mb-2">Rp{props.price}</h5>
                    <small>Seller: {props.seller.name}</small>
               </div>
          </div>
     );
}

export default ProductItem;