import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Footer, Navbar } from '../../components';
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

          dispatch(setIsLoading(true));
          dispatch(setTransactions(userId));
     },[dispatch, history]);

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <div className="container my-5 py-5">
                         <h1>My Transactions</h1>
                         <hr />
                         {
                              transactions.map((transaction) => {
                                   return <TransactionItem 
                                   key={transaction._id}
                                   _id={transaction._id}
                                   transactionDate={transaction.createdAt}
                                   sendAddress={transaction.send_address}
                                   receiverName={transaction.receiverName}
                                   receiverPhoneNumber={transaction.receiverPhoneNumber}
                                   amount={transaction.amount}
                                   />
                              })
                         }
                    </div>
                    <Footer />
               </Fragment>
          )
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default TransactionHeaders;