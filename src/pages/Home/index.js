import React, { Fragment } from 'react';
import {Navbar, Footer, ProductItem}  from '../../components';


const Home = () => {
     return (
          <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    <div className="text-dark text-center">
                         <h1>Home Page</h1>
                         <hr />
                         <ProductItem />
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default Home;