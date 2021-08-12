import React from 'react'
import './upload.scss'

const Upload = ({img, label, ...rest}) => {
     return (
          <div className="my-3">
               <p className="mb-1">{label}</p>
               {img && <img className="upload-preview" src={img} alt={label} />}
               <input type="file" className="form-control" {...rest} />
          </div>
     )
}

export default Upload