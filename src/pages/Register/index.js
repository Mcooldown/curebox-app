import React from 'react';
import { Fragment } from 'react';
import { Button, Footer, Input, Navbar, Select } from '../../components';

const Register = () => {

     const gender = ['Male', 'Female'];

     return (
          <Fragment>
               <Navbar />
               <div className="container my-5 py-5">
                    <h1 className="text-center text-dark">Register</h1>
                    <hr />
                    <Input type="text" label="Name" />
                    <Select label="Gender" options={gender} />
                    <Input type="text" label="Address" />
                    <Input type="date" label="Date Of Birth" />
                    <Input type="text" label="Phone Number" />
                    <Input type="text" label="Email" />
                    <Input type="password" label="Password" />
                    <Input type="password" label="Confirm Password" />
                    <Button title="Register" />
               </div>
               <Footer />
          </Fragment>
     )
}

export default Register;