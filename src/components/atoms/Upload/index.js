import React from 'react'
import { Fragment } from 'react'
import './upload.scss'

const Upload = ({img, label, ...rest}) => {
     return (
          <Fragment>
               <h6 className="mb-2 fw-bold">{label}</h6>
               {img && <img className="upload-preview" src={img} alt={label} />}
               <input type="file" className="form-control" {...rest} />
          </Fragment>
     )
}

export default Upload