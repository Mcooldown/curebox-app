import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Footer, Navbar, StoreProductItem } from '../../components';
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
               alert('Not authorized. Please login first');
               history.push('/login');     
          }

          fetchData();
     }, [dispatch, history]);

     const onDelete = async (id) => {

          const confirmDelete = window.confirm('Are you sure want to delete this product?');

          if(confirmDelete){
               await dispatch(setIsLoading(true));
               await dispatch(deleteProduct(id, localStorage.getItem('userId')));
          }
     }

     const onUpdate = (id) => {
          history.push(`/products/edit/${id}`);
     }

     if(isLoading){
          return <LoadingPage title="Please wait..." /> 
     }else{
          return <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    <h1>My Store</h1>
                    <Button background="#287E00" title="Add New Product" onClick={() => history.push('/products/create')} />
                    <hr />
                    <div className="row">
                         {
                         products.map((product) => {
                              return <div className="col-md-6 my-3">
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
                    </div>
                    
               </div>
               <Footer />
          </Fragment>
     }
}

export default Store;