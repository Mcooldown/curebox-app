import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Footer, Gap, Input, Navbar, Upload } from '../../components';
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

          if(form.description === '') return Swal.fire({
               title: 'Error',
               text: "Description must be filled",
               icon: 'error',
               confirmButtonColor: '#287E00',
          });

          setButtonLoading(true);
          updateProduct(form, product._id)
          .then(res => {
               setButtonLoading(false);
               if(res.status === 200){
                    dispatch(clearForm());
                    Swal.fire({
                         title: 'Success',
                         text: "Product Updated",
                         icon: 'success',
                         confirmButtonColor: '#287E00',
                    })
                    return history.push('/store');
               }
          });
     }

     if(!isLoading){
          return (
               <Fragment>
                    <Navbar />
                    <Gap height={150} />
                    <div className="container">
                         <h1 className="text-center mb-3">Edit Product</h1>
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
                                        data={form.description}
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
                                   buttonLoading ?
                                   <Button background="#287E00" title="Please wait" isLoading={buttonLoading} />
                                   :
                                   <Button background="#287E00" title="Update Product" isLoading={buttonLoading} onClick={onSubmit} />
                              }
          
                         </div>
                    </div>
                    <Gap height={150} />
                    <Footer />
               </Fragment>
          );
     }else{
          return <LoadingPage title="Please wait..." />
     }
}

export default withRouter(EditProduct);