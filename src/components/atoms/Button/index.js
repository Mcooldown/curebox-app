import React from 'react';

const Button = ({title, isLoading, ...rest}) => {
     
     if(isLoading) return (
          <button className="btn btn-primary d-flex align-items-center" disabled {...rest} >
               <span className="spinner-border" role="status">
               </span>
               <span className="ms-3">{title}</span>
          </button>
     );
     else return (
          <button className="btn btn-primary" {...rest} >{title}</button>
     );
}

export default Button;