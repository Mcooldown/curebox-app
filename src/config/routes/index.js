import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Login, Register, Home, CreateProduct, ProductDetail, Cart, 
     CheckoutTransaction, TransactionHeaders, TransactionDetails, Store, 
     EditProduct, ProductSearch, Articles, ArticleDetail, CreateArticle, UserArticles, EditArticle, Forums, CreateForum, ForumDetails} from '../../pages';

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
                    <Route path="/products/search/:searchValue" exact>
                         <ProductSearch />
                    </Route>
                    <Route path="/articles" exact>
                         <Articles />
                    </Route>
                    <Route path="/articles/create" exact>
                         <CreateArticle />
                    </Route>
                    <Route path="/articles/user" exact>
                         <UserArticles />
                    </Route>
                    <Route path="/articles/:id" exact>
                         <ArticleDetail />
                    </Route>
                    <Route path="/articles/edit/:id" exact>
                         <EditArticle />
                    </Route>
                     <Route path="/forums" exact>
                         <Forums />
                    </Route>
                    <Route path="/forums/create" exact>
                         <CreateForum />
                    </Route>
                    <Route path="/forums/:id" exact>
                         <ForumDetails />
                    </Route>
               </Switch>
          </Router>
     )
}

export default Routes;