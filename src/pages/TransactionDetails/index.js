import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { Button, Footer, Navbar, TransactionDetailItem } from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setTransactionDetails } from '../../config/redux/action/transactionAction';
import LoadingPage from '../LoadingPage';

const TransactionDetails = (props) => {

     const {isLoading, totalPayment} = useSelector(state => state.generalReducer);
     const {transactionDetails} = useSelector(state => state.transactionReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          
          const userId = localStorage.getItem('userId');

          if(!userId){
               alert('Not Authorized, Please login first');
               history.push('/login');
          } 
          
          async function initialize() {
               await dispatch(setIsLoading(true));
               await dispatch(setTransactionDetails(props.match.params.id));
          }
          initialize();

     }, [dispatch, props, history])

     if(!isLoading) {
          return (
               
               <Fragment>
                    <Navbar />
                    <div className="container my-5 py-5">
                    <Button title="Back to Transaction" onClick={() => history.push('/transactions')} />
                         <h1>Ini Detail</h1>
                         <hr/>
                         {
                              transactionDetails[0] &&
                              <p>Transaction ID:{ transactionDetails[0].transaction} <br />
                                   Total Payment: Rp{totalPayment}
                              </p>
                         }
                         {
                              transactionDetails.map((detail) => {
                                   return <TransactionDetailItem 
                                   key={detail._id}
                                   name={detail.product.name}
                                   description={detail.product.description}
                                   price={detail.product.price}
                                   image={detail.product.productPhoto}
                                   quantity={detail.quantity}
                                   />
                              })
                         }
                    </div>
                    <Footer />
               </Fragment>     
          )
     }
     else {
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(TransactionDetails);