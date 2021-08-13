import React from 'react';
import { Fragment } from 'react';
import { useHistory} from 'react-router-dom';
import { Logo } from '../../../assets';
import { Button, Input } from '../../atoms';
import './navbar.scss'

const Navbar = () => {

     const history = useHistory();
     const userName = localStorage.getItem('userName');

     const logout = () => {
          localStorage.clear();
          history.push('/');
     }

     return (
          <nav class="navbar navbar-expand-lg fixed-top">
               <div class="container">
                    <div class="navbar-brand m-0" onClick={ () => history.push('/')}>
                         <img src={Logo} className="logo" />
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cureboxNavbar" aria-controls="cureboxNavbar" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="menu-icon">≡</span>
                    </button>
                    <div class="collapse navbar-collapse" id="cureboxNavbar">
                         <div class="navbar-nav ms-auto">
                              <form className="m-0 p-0">
                                   <Input type="text" errorMessage={''} placeholder="Find your needs here" />
                              </form>
                              {
                                   userName  &&
                                   <button className="btn btn-cart mx-3"><i class="fas fa-shopping-cart" onClick={() => history.push('/cart')}></i></button>
                              }
                              
                              <p class="nav-link m-0 px-3">Article</p>
                              <p class="nav-link m-0 px-3">Forum</p>
                              {
                                   userName ?
                                        <Fragment>
                                             <p class="nav-link m-0 px-3" onClick={logout}>Logout</p>
                                        </Fragment>
                                   : <div className="d-lg-flex align-items-center">
                                        
                                        <p class="nav-link m-0 mx-2" onClick={() => history.push('/login') }>Login</p>
                                        <Button title="Register" onClick={() => history.push('/register')} />
                                   </div>
                              }
                         </div>
                    </div>
               </div>
          </nav>
     );
}

export default Navbar;