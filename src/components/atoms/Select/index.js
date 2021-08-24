import React from 'react';
import { Fragment } from 'react';

const Select = ({label, errorMessage, options, value,width, ...rest}) => {

     const selectClass = !errorMessage ? 'form-select' : 'form-select is-invalid';

     return (
          <Fragment>
               {label && <h6 className="mb-2 fw-bold">{label}</h6>}
               <select className={selectClass} {...rest} style={{ width }}>
               {
                    options.map( (option) => 
                         <option id={option} value={option}>{option}</option>
                    )
               }
               </select>
               {errorMessage &&
                    <div class="invalid-feedback d-block">
                              {errorMessage}
                    </div>
               }
          </Fragment>
     );
}

export default Select;