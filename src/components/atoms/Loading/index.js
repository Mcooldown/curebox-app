import React from 'react';
import './loading.scss'

const Loading = (props) => {
     return (
          <div className="my-3 d-flex align-items-center justify-content-center">
               <span className="spinner-border loading" role="status">
               </span>
               <span className="ms-3">{props.title}</span>
          </div>
     )
}

export default Loading;