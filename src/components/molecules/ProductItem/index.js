import React from 'react';
import { useHistory } from 'react-router-dom';
import './productItem.scss'

const ProductItem = (props) => {

     const history = useHistory();

     return (
          <div className="card card-product"  onClick={() => history.push(`/products/${props._id}`)}>
               <img className="product-image" src={props.image} alt={props.name} />
               <div className="card-body">
                    <p className="mb-2">{props.name}</p>
                    <h5 className="mb-2">Rp{props.price}</h5>
                    {
                         props.seller && 
                         <p className="text-muted mb-2"><i class="fas fa-map-marker-alt"></i> {props.seller.address.substring(0, 15)}</p>
                    }
                    <i class="fa fa-star"></i> {props.rating}/5.00
               </div>
          </div>
     );
}

export default ProductItem;