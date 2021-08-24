import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Footer, Gap, Navbar } from '../../components';
import {TransactionItem} from '../../components/molecules';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setTransactions } from '../../config/redux/action/transactionAction';
import LoadingPage from '../LoadingPage';

const TransactionHeaders = () => {

     const {isLoading} = useSelector(state => state.generalReducer);
     const {transactions} = useSelector(state => state.transactionReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {

          const userId = localStorage.getItem('userId');
          if(!userId) history.push('/login');

          async function initialize(){
               await dispatch(setIsLoading(true));
               await dispatch(setTransactions(userId));
          }
          initialize();

     },[dispatch, history]);

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <Gap height={150} />
                    <div className="container">
                         <h2 className="text-center mb-3">My Transactions</h2>
                         <div className="section-line mx-auto"></div>
                         <Gap height={50}  />
                         {
                              transactions.map((transaction) => {
                                   return <TransactionItem 
                                   key={transaction._id}
                                   _id={transaction._id}
                                   transactionDate={transaction.createdAt}
                                   sendAddress={transaction.sendAddress}
                                   receiverName={transaction.receiverName}
                                   receiverPhoneNumber={transaction.receiverPhoneNumber}
                                   amount={transaction.amount}
                                   />
                              })
                         }
                    </div>
                    <Gap height={150} />
                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default TransactionHeaders;