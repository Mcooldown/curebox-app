import React from 'react';
import { Fragment } from 'react';

const Input = ({label, errorMessage, ...rest}) => {

     const inputClass = !errorMessage ? 'form-control' : 'form-control is-invalid'

     return (
          <Fragment>
               {label && <h6 className="mb-2 fw-bold">{label}</h6>}
               <input className={inputClass}
               {...rest} />
               {
                    errorMessage && 
                    <div class="invalid-feedback d-block">{errorMessage}</div>
               }    
          </Fragment>
     );
}

export default Input;