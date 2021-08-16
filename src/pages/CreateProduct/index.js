import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Footer, Input, Navbar, Upload } from '../../components';
import { clearForm, postNewProduct, setForm } from '../../config/redux/action/productAction';

const CreateProduct = () => {

     const {form} = useSelector(state => state.productReducer);
     const [imgPreview, setImgPreview] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId){
               alert('Not authorized. Please login first');
               history.push('/login');
          }
     },[history])

     const onImageUpload = (e) => {
          const file = e.target.files[0];
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               setImgPreview(reader.result);
               dispatch(setForm('productPhoto', reader.result));
          }
     }

     const onSubmit = (e) => {
          e.preventDefault();
          if(imgPreview === '')return alert('Image required');
          setIsLoading(true);

          postNewProduct(form)
          .then(res => {
               setIsLoading(false);
               if(res.status === 201){
                    dispatch(clearForm());
                    alert('New Product Added');
                    history.push('/store');
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
               <div className="container py-5 my-5">
                    <h1>Create Product</h1>
                    <hr />
                    <Input label="Name" value={form.name} type="text" errorMessage={''} 
                    onChange={(e) => dispatch(setForm('name', e.target.value))}
                    />
                    <Input label="Description" value={form.description} type="text" errorMessage={''} 
                    onChange={(e) => dispatch(setForm('description', e.target.value))}
                    />
                    <Input label="Price" value={form.price} type="number" errorMessage={''} 
                    onChange={(e) => dispatch(setForm('price', e.target.value))}
                    />
                    <Upload label="Product Photo" img={imgPreview} onChange={(e) => onImageUpload(e)}  />
                    
                    {
                         isLoading ?
                         <Button background="#287E00" title="Please wait" isLoading={isLoading} />
                         :
                         <Button background="#287E00" title="Submit" isLoading={isLoading} onClick={onSubmit} />
                    }
               </div>
               <Footer />
          </Fragment>
     );
}

export default CreateProduct;