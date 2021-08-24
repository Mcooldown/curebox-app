import React from 'react';
import { Fragment } from 'react';
import { useHistory } from 'react-router';
import { Button, Gap } from '../../atoms';
import './transactionItem.scss';

const TransactionItem = (props) => {

     const history = useHistory();

     return (
          <Fragment>
               <Gap height={75} />
               <div className="d-flex justify-content-between">
                    <h4>Transaction ID: {props._id}</h4>
                    <p className="h5">Transaction Date: {new Date(props.transactionDate).toLocaleDateString("en-GB")}</p>
               </div>
               <hr />
               <Gap height={15} />
               <div className="d-flex justify-content-between align-items-center">
                    <div>
                         <p className="h5"><i class="fas fa-user me-3"></i>Receiver: {props.receiverName}</p>     
                         <Gap height={10} />
                         <p className="h5"><i class="fas fa-map-marker-alt me-3"></i>Send to: {props.sendAddress.subDistrict}, {props.sendAddress.cityDistrict}</p>     
                         <Gap height={20} />
                         <p className="h5">Status: <span><h5 className="d-inline text-success">Success</h5></span></p>     
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                         <h5 className="me-2">Total: </h5>
                         <h3 className="fw-bold text-danger">{new Intl.NumberFormat(['ban', 'id']).format(props.amount)}</h3>
                    </div>
               </div>
               <hr />
               <Gap height={20} />
               <div className="d-flex justify-content-end">
                    <Button background="#287E00" title="View Detail Transaction" onClick={() => history.push(`/transactions/${props._id}`)} />
               </div>
               <Gap height={50} />
               <div className="transaction-line"></div>
          </Fragment>
     )
}

export default TransactionItem;