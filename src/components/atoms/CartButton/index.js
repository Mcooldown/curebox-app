import React from 'react';
import { useHistory } from 'react-router';
import './cartButton.scss';

const CartButton = () => {

     const history = useHistory();

     return (
          <button className="btn btn-cart-fixed" onClick={() => history.push('/cart')}><i class="fas fa-shopping-cart"></i></button>
     )
}

export default CartButton;