import React from 'react';
import { Fragment } from 'react';

const Input = ({label, errorMessage, ...rest}) => {

     const inputClass = errorMessage === '' ? 'form-control' : 'form-control is-invalid'

     return (
          <Fragment>
               {label && <p className="mb-1">{label}</p>}
               <input className={inputClass}
               {...rest} />
               {
                    errorMessage !== '' && 
                    <div class="invalid-feedback d-block">{errorMessage}</div>
               }    
          </Fragment>
     );
}

export default Input;