import React from 'react';

const Input = ({label, ...rest}) => {
     return (
          <div className="my-3">
               <p className="mb-1">{label}</p>
               <input className="form-control" {...rest} />
          </div>
     );
}

export default Input;