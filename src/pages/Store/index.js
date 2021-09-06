import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { Footer, Gap, Navbar, StoreProductItem } from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { clearForm, deleteProduct, setStoreProducts } from '../../config/redux/action/productAction';
import LoadingPage from '../LoadingPage';

const Store = () => {

     const {products} = useSelector(state => state.productReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {

          async function fetchData (){
               await dispatch(setIsLoading(true));
               await dispatch(clearForm());
               await dispatch(setStoreProducts(userId, 1, 8));
          }

          const userId = localStorage.getItem('userId');
          if(!userId){
               history.push('/login');     
          }

          fetchData();
     }, [dispatch, history]);

     const onDelete = (id) => {
          
          async function finalize(){
               await dispatch(setIsLoading(true));
               await dispatch(deleteProduct(id, localStorage.getItem('userId')));
               await dispatch(setStoreProducts(localStorage.getItem('userId'), 1, 8));
          }

          Swal.fire({
               title: 'Are you sure want to delete this product?',
               text: "This action cannot be reverted",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#287E00',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
               }).then((result) => {
               if (result.isConfirmed) {
                    finalize().then(() => {
                         Swal.fire({
                         title: 'Success',
                         text: "Product deleted",
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    });
               });
               }
          })
     }

     const onUpdate = (id) => {
          history.push(`/products/edit/${id}`);
     }

     if(isLoading){
          return <LoadingPage title="Please wait..." /> 
     }else{
          return <Fragment>
               <Navbar />
               <Gap height={150} />
               <div className="container">
                    <h1 className="text-center mb-3">{localStorage.getItem('userName') + ' Store'}</h1>
                    <div className="section-line mx-auto"></div>
                    <Gap height={50}  />
                    <div className="row">
                         {
                              products.map((product) => {
                                   return <div className="col-md-3 my-3">
                                        <StoreProductItem 
                                        key={product._id}
                                        _id = {product._id}
                                        name={product.name}
                                        image={product.productPhoto}
                                        price={product.price}
                                        rating ={product.rating}
                                        onDelete = {onDelete}
                                        onUpdate = {onUpdate}
                                        />
                                   </div>
                              })
                         }
                         <div className="col-md-3 my-3 d-flex align-items-center justify-content-center">
                              <div style={{ cursor: "pointer" }} onClick={() => history.push('/products/create') }>
                                   <h4>Add New Product</h4>
                              </div>
                         </div>
                    </div>
               </div>
               <Gap height={150} />
               <Footer />
          </Fragment>
     }
}

export default Store;