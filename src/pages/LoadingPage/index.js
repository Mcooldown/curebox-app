import React from 'react';
import { Loading } from '../../components';
import './loadingPage.scss'

const LoadingPage = (props) => {

     return (
          <div className="loading-page">
               <Loading title={props.title} />
          </div>
     )
}

export default LoadingPage;