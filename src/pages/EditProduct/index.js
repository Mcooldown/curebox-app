import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { setIsLoading } from '../../config/redux/action/generalAction';
import { clearForm, setForm, setProduct, updateProduct } from '../../config/redux/action/productAction';
import LoadingPage from '../LoadingPage';

const EditProduct = (props) => {

     const {form, product} = useSelector(state => state.productReducer);
     const {isLoading} = useSelector(state => state.generalReducer);
     const [buttonLoading, setButtonLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();
     const [count, setCount] = useState(0);

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId){
               alert('Not authorized. Please login first');
               history.push('/login');
          }

          async function initialize (){
               await dispatch(setIsLoading(true));
               await dispatch(clearForm());
               await dispatch(setProduct(props.match.params.id));
          }

          if(count === 0){
               initialize().then(() => setCount(count+1));
          }else{
               return null;
          }

     },[history, dispatch, props, product, count])

     const onImageUpload = (e) => {
          const file = e.target.files[0];
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               dispatch(setForm('productPhoto', reader.result));
          }
     }

     const onSubmit = (e) => {
          e.preventDefault();
          setButtonLoading(true);
          updateProduct(form, product._id)
          .then(res => {
               setButtonLoading(false);
               if(res.status === 200){
                    dispatch(clearForm());
                    alert('Product Updated');
                    history.push('/store');
               }
          });
     }

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <div className="container py-5 my-5">
                         <h1>Edit Product - ID: {product._id}</h1>
                         <hr />
                         <Input label="Name" value={form.name} type="text" 
                         onChange={(e) => dispatch(setForm('name', e.target.value))}
                         />
                         <Input label="Description" value={form.description} type="text" 
                         onChange={(e) => dispatch(setForm('description', e.target.value))}
                         />
                         <Input label="Price" value={form.price} type="number" 
                         onChange={(e) => dispatch(setForm('price', e.target.value))}
                         />
                         <Upload label="Product Photo" img={form.productPhoto} onChange={(e) => onImageUpload(e)}  />
                         {
                              buttonLoading ?
                              <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                              :
                              <Button background="#287E00" title="Submit" isLoading={buttonLoading} onClick={onSubmit} />
                         }
                    </div>
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(EditProduct);