import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Login, Register, Home, CreateProduct} from '../../pages';

const Routes = () => {
     return (
          <Router>
               <Switch>
                    <Route path="/login" exact>
                         <Login />
                    </Route>
                    <Route path="/register" exact>
                         <Register />
                    </Route>
                    <Route path="/" exact>
                         <Home />
                    </Route>
                    <Route path="/products/create" exact>
                         <CreateProduct />
                    </Route>
               </Switch>
          </Router>
     )
}

export default Routes;