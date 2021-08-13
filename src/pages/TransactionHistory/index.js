import React from 'react';
import { Fragment } from 'react';
import { Footer, Navbar } from '../../components';

const TransactionHistory = () => {
     return (
          <Fragment>
               <Navbar />
               <div className="my-5 py-5">
                    Ini history transaction
               </div>
               <Footer />
          </Fragment>
     )
}

export default TransactionHistory;