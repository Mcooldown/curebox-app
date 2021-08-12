import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../atoms';
import './productItem.scss'

const ProductItem = (props) => {

     const history = useHistory();

     return (
          <div className="card border-0 shadow-sm">
               <img className="product-image" src={props.image} />
               <div className="card-body">
                    <h4>{props.name}</h4>
                    <p>{props.description}</p>
                    <h5 className="text-danger">Rp{props.price}</h5>
                    <p>by {props.seller.name}</p>
                    <Button title="Buy Now" onClick={() => history.push(`/products/${props._id}`)} />
               </div>
          </div>
     );
}

export default ProductItem;