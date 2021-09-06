import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Footer, Gap, Input, Navbar, Upload } from '../../components';
import { clearForm, postNewProduct, setForm } from '../../config/redux/action/productAction';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

const CreateProduct = () => {

     const {form} = useSelector(state => state.productReducer);
     const [isLoading, setIsLoading] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if(!userId){
               return history.push('/login');
          }
     },[history])

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
          
          if(form.description === '' || form.productPhoto === ''){
               
               let message = null;
               if(form.description === '') message =  "Description must be filled";
               else if(form.productPhoto === '') message = "Product Photo must be uploaded";
               return Swal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                    confirmButtonColor: '#287E00',
               })
          }

          setIsLoading(true);

          postNewProduct(form)
          .then(res => {
               setIsLoading(false);
               if(res.status === 201){
                    dispatch(clearForm());
                    Swal.fire({
                         title: 'Success',
                         text: 'New Product Added',
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    })
                    return history.push('/store');
               }
          });
     }

     return (
          <Fragment>
               <Navbar />
               <Gap height={150} />
               <div className="container">
                    <h1 className="text-center mb-3">Add New Product</h1>
                    <div className="section-line mx-auto"></div>
                    <Gap height={50}  />
                    <div className="green-wrapper py-3">
                         <div className="card-body">
                              <Input label="Name" value={form.name} type="text" errorMessage={''} 
                              onChange={(e) => dispatch(setForm('name', e.target.value))}
                              />
                              <Gap height={20} />
                              <h6>Description</h6>
                              <CKEditor
                                   editor={ ClassicEditor }
                                   data=""
                                   onChange={ ( event, editor ) => 
                                        dispatch(setForm('description', editor.getData()))}
                              />
                              <Gap height={20} />
                              <Input label="Price" value={form.price} type="number" errorMessage={''} 
                              onChange={(e) => dispatch(setForm('price', e.target.value))}
                              />
                              <Gap height={20} />
                              <Upload label="Product Photo" img={form.productPhoto} onChange={(e) => onImageUpload(e)}  />
                         </div>
                    </div>
                    <Gap height={30} />
                    <div className="d-grid">
                         {
                              isLoading ?
                              <Button background="#287E00" title="Please wait" isLoading={isLoading} />
                              :
                              <Button background="#287E00" title="Add Product" isLoading={isLoading} onClick={onSubmit} />
                         }
     
                    </div>
               </div>
               <Gap height={150} />
               <Footer />
          </Fragment>
     );
}

export default CreateProduct;