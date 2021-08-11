import React from 'react';
import { Fragment } from 'react';

const Select = ({label, errorMessage, options, ...rest}) => {
     return (
          <div className="my-3">
               <p className="mb-1">{label}</p>
               {
                    errorMessage !== '' ?
                    <Fragment>
                         <select className="form-select is-invalid" {...rest} >
                              <option value="">Choose...</option>
                              {
                                   options.map( (option) => 
                                        <option id={option} value={option}>{option}</option>
                                   )
                              }
                         </select>
                         <div class="invalid-feedback d-block">
                                   {errorMessage}
                         </div>
                    </Fragment>
                    :
                    <select className="form-select" {...rest} >
                         <option value="">Choose...</option>
                         {
                              options.map( (option) => 
                                   <option id={option} value={option}>{option}</option>
                              )
                         }
                    </select>
               }
          </div>
     );
}

export default Select;