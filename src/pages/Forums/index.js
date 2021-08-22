import React from 'react';
import { Fragment } from 'react';
import { useHistory } from 'react-router';
import { Button, Footer, Navbar } from '../../components';

const Forums = () => {

     const history = useHistory();

     return (
          <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    Ini forum
                    <hr />
                    <Button background="gray" title="Create New Forum" onClick={() => history.push('/forums/create')} />
               </div>
               <Footer />
          </Fragment>
     )
}

export default Forums;