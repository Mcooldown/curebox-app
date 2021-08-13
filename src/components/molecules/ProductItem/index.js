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
                    <p className="text-muted m-0"><i class="fas fa-map-marker-alt"></i> {props.seller.address.substring(0, 15)}
                    <br />
                    <i class="fa fa-star"></i> {props.rating}/5.00
                    </p>
               </div>
          </div>
     );
}

export default ProductItem;