import React, { useEffect} from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { CartItem, Footer, Gap, Loading, Navbar } from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { setTransactionDetails } from '../../config/redux/action/transactionAction';
import LoadingPage from '../LoadingPage';

const TransactionDetails = (props) => {

     const {transactionDetails} = useSelector(state => state.transactionReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');

          if(!userId){
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
                    <Gap height={150} />
                    <div className="container">
                         {
                              transactionDetails[0] &&
                              <Fragment>
                                   <h1 className="text-center mb-3">Transaction Details</h1>
                                   <div className="section-line mx-auto"></div>
                                   <Gap height={75} />
                                   <div className="d-flex justify-content-between">
                                        <h4>Transaction ID: {transactionDetails[0].transaction._id}</h4>
                                        <p className="h5">Transaction Date: {new Date(transactionDetails[0].transaction.createdAt).toLocaleDateString("en-GB")}</p>
                                   </div>
                                   <hr />
                                   <Gap height={15} />
                                   <p className="h5"><i class="fas fa-user me-3"></i>Receiver's Name: <span><h5 className="d-inline">{transactionDetails[0].transaction.receiverName}</h5></span></p>     
                                   <Gap height={10} />
                                   <p className="h5"><i class="fas fa-phone me-3"></i>Receiver's Phone: <span><h5 className="d-inline">{transactionDetails[0].transaction.receiverPhoneNumber}</h5></span></p>     
                                   <Gap height={10} />
                                   <p className="h5"><i class="fas fa-map-marker-alt me-3"></i>Send to: &nbsp;
                                   <span><h5 className="d-inline">{transactionDetails[0].transaction.sendAddress.address},&nbsp;
                                   {transactionDetails[0].transaction.sendAddress.urbanVillage},&nbsp;
                                   {transactionDetails[0].transaction.sendAddress.subDistrict}, &nbsp;
                                   {transactionDetails[0].transaction.sendAddress.cityDistrict}, &nbsp;
                                   {transactionDetails[0].transaction.sendAddress.province}, &nbsp;
                                   {transactionDetails[0].transaction.sendAddress.postalCode}</h5></span>
                                   </p>     
                                   <Gap height={10} />
                                   <p className="h5"><i class="fas fa-sticky-note me-3"></i>Notes: <span><h5 className="d-inline">{transactionDetails[0].transaction.notes}</h5></span></p>     
                                   <Gap height={10} />
                                   <hr />
                              </Fragment>
                         }
                         {
                              transactionDetails.length > 0 ?
                              transactionDetails.map((detail) => {
                                   return <CartItem key={detail._id}
                                   _id= {detail._id}
                                   productId={detail.product._id}
                                   name={detail.product.name}
                                   description={detail.product.description}
                                   price={detail.product.price}
                                   image={detail.product.productPhoto}
                                   quantity={detail.quantity}
                                   sellerName={detail.product.seller.name}
                                   quantityDisabled
                                   removeDisabled />
                              }) : <Loading title="Please wait..." />
                         }
                    </div>
                    <Gap height={150} />
                    <Footer />
               </Fragment>     
          )
     }
     else {
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(TransactionDetails);