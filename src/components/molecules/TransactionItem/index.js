import React from 'react';
import { Button } from '../../atoms';

const TransactionItem = (props) => {

     return (
          <div className="card my-3 border-0 shadow"> 
               <div className="card-body my-2">
                    <h4>{props._id}</h4>
                    <p>{props.description}</p>
                    <p>Transaction Date: {props.transactionDate}</p>
                    <p>Send to: {props.sendAddress}</p>
                    <p>Receiver: {props.receiverName}</p>
                    <p>Receiver Phone Number: {props.receiverPhoneNumber}</p>
                    <h5 className="text-danger mt-3">Grand Total: Rp{props.amount}</h5>
                    <p>Status: <span className="text-success fw-bold">Success</span> </p>
                    <Button title="DETAIL ITEMS" />
               </div>
          </div>
     )
}

export default TransactionItem;