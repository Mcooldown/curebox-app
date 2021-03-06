import React from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Logo } from '../../../assets';
import { setSearchValue } from '../../../config/redux/action/generalAction';
import { Button } from '../../atoms';
import './navbar.scss'

const Navbar = () => {

     const history = useHistory();
     const dispatch = useDispatch();
     const userName = localStorage.getItem('userName');
     const {searchValue} = useSelector(state => state.generalReducer);

     const logout = () => {
          localStorage.clear();
          history.push('/');
     }

     return (
          <nav class="navbar navbar-expand-lg fixed-top">
               <div class="container">
                    <div class="navbar-brand m-0" onClick={ () => history.push('/')}>
                         <img src={Logo} className="logo" alt="logo" />
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cureboxNavbar" aria-controls="cureboxNavbar" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="menu-icon">≡</span>
                    </button>
                    <div class="collapse navbar-collapse" id="cureboxNavbar">
                         <div class="navbar-nav ms-auto d-lg-flex align-items-center">
                              <div class="input-group">
                                   <input type="text" value={searchValue} onChange={(e) => dispatch(setSearchValue(e.target.value))} className="form-control form-search" placeholder="Find your needs here" />
                                   <span className="input-group-text" onClick={() => history.push(`/products/search/${searchValue}`)}><i className="fa fa-search"></i></span>
                              </div>
                              <button className="btn btn-cart mx-3" onClick={() => history.push('/cart')}><i class="fas fa-shopping-cart"></i></button>
                              <p class="nav-link m-0 px-3" onClick={() => history.push('/articles')}>Articles</p>
                              <p class="nav-link m-0 px-3" onClick={() => history.push('/forums')}>Forum</p>
                              {
                                   userName ?
                                        <Fragment>
                                             <div class="nav-link m-0 mx-2 dropdown">
                                                  <p class="nav-link dropdown-toggle m-0" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                  { localStorage.getItem('userName').substring(0, 15)}
                                                  </p>
                                                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                  <li><p class="dropdown-item" onClick={() => history.push('/profile')}><i class="fas fa-user"></i> My Profile</p></li>
                                                  <li><p class="dropdown-item" onClick={() => history.push('/store')}><i class="fas fa-store"></i> My Store</p></li>
                                                  <li><p class="dropdown-item" onClick={() => history.push('/cart')}><i class="fas fa-shopping-cart"></i> My Cart</p></li>
                                                  <li><p class="dropdown-item" onClick={() => history.push('/transactions')}><i class="fas fa-tags"></i> My Transactions</p></li>
                                                  <li><p class="dropdown-item" onClick={() => history.push('/articles/user')}><i class="fas fa-newspaper"></i> My Articles</p></li>
                                                  <li><p class="dropdown-item" onClick={logout}><i class="fas fa-sign-out-alt" aria-hidden="true"></i> Logout</p></li>
                                                  </ul>
                                             </div>
                                        </Fragment>
                                   : <div className="d-lg-flex align-items-center">
                                        
                                        <p class="nav-link m-0 mx-2" onClick={() => history.push('/login') }>Login</p>
                                        <Button background="#287E00" title="Register" onClick={() => history.push('/register')} />
                                   </div>
                              }
                         </div>
                    </div>
               </div>
          </nav>
     );
}

export default Navbar;