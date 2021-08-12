import React from 'react';
import './button.scss';

const Button = ({title, isLoading, ...rest}) => {
     
     if(isLoading) return (
          <button className="btn-component btn d-flex align-items-center" disabled {...rest} >
               <span className="spinner-border" role="status">
               </span>
               <span className="ms-3">{title}</span>
          </button>
     );
     else return (
          <button className="btn-component btn" {...rest} >{title}</button>
     );
}

export default Button;