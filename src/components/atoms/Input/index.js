import React from 'react';
import { Fragment } from 'react';

const Input = ({label, errorMessage, ...rest}) => {

     return (
          <div className="my-3">
               <p className="mb-1">{label}</p>
               {
                    errorMessage !== '' ? 
                    <Fragment>
                          <input className="form-control is-invalid"
                         {...rest} />
                         <div class="invalid-feedback d-block">
                              {errorMessage}
                         </div>
                    </Fragment>
                    : <input className="form-control"
                         {...rest} />
               }
          </div>
     );
}

export default Input;