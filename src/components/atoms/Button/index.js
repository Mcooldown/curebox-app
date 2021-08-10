import React from 'react';

const Button = ({title, ...rest}) => {
     return (
          <button className="btn btn-primary" {...rest} >{title}</button>
     );
}

export default Button;