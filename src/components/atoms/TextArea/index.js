import React from 'react';
import { Fragment } from 'react';

const TextArea = ({label, errorMessage, width, height, ...rest}) => {

     const TextAreaClass = !errorMessage ? 'form-control' : 'form-control is-invalid'

     return (
          <Fragment>
               {label && <h6 className="mb-2 fw-bold">{label}</h6>}
               <textarea className={TextAreaClass} style={{ width, height }}
               {...rest} />
               {
                    errorMessage && 
                    <div class="invalid-feedback d-block">{errorMessage}</div>
               }    
          </Fragment>
     );
}

export default TextArea;