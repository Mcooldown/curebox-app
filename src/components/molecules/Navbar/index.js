import React from 'react';
import { useHistory } from 'react-router-dom';
import './navbar.scss'

const Navbar = () => {

     const history = useHistory();

     return (
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
               <div class="container-fluid">
                    <p class="navbar-brand m-0" onClick={ () => history.push('/')}>Logo</p>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cureboxNavbar" aria-controls="cureboxNavbar" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="cureboxNavbar">
                         <div class="navbar-nav ms-auto">
                              <p class="nav-link m-0" onClick={() => history.push('/register') }>Register</p>
                              <p class="nav-link m-0" onClick={() => history.push('/login')}>Login</p>
                         </div>
                    </div>
               </div>
          </nav>
     );
}

export default Navbar;