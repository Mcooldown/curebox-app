import React from 'react';

const Select = ({label, options, ...rest}) => {
     console.log(options);
     return (
          <div className="my-3">
               <p className="mb-1">{label}</p>
               <select className="form-select" {...rest} >
                    <option value="">Choose...</option>
                    {
                         options.map( (option) => 
                              <option value={option}>{option}</option>
                         )
                    }
               </select>
          </div>
     );
}

export default Select;