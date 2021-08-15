import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Login, Register, Home, CreateProduct, ProductDetail, Cart, 
     CheckoutTransaction, TransactionHeaders, TransactionDetails, Store, EditProduct} from '../../pages';

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
                    <Route path="/products/:id" exact>
                         <ProductDetail />
                    </Route>
                    <Route path="/cart" exact>
                         <Cart />
                    </Route>
                    <Route path="/checkout" exact>
                         <CheckoutTransaction />
                    </Route>
                    <Route path="/transactions" exact>
                         <TransactionHeaders />
                    </Route>
                    <Route path="/transactions/:id" exact>
                         <TransactionDetails />
                    </Route>
                     <Route path="/store" exact>
                         <Store />
                    </Route>
                    <Route path="/products/edit/:id" exact>
                         <EditProduct />
                    </Route>
               </Switch>
          </Router>
     )
}

export default Routes;