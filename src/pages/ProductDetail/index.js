import React from 'react';
import { Fragment } from 'react';
import { Footer, Navbar } from '../../components';

const ProductDetail = () => {
     return (
          <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    <div>Ini product detail</div>
               </div>
               <Footer />
          </Fragment>
     );
}

export default ProductDetail;
