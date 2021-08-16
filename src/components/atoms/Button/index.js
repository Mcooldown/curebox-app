import React from 'react';
import './button.scss';

const Button = ({title, isLoading, ...rest}) => {

     if(isLoading) return (
          <button className="btn-component btn d-flex align-items-center justify-content-center" disabled {...rest} >
               <span className="spinner-border" role="status">
               </span>
               <span className="ms-3 fw-bold">{title}</span>
          </button>
     );
     else return (
          <button className="btn-component btn" {...rest} ><h6 className="m-0 text-center">{title}</h6></button>
     );
}

export default Button;