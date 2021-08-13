import React from 'react';
import { useHistory } from 'react-router';
import { LogoWhite } from '../../../assets';
import './footer.scss';

const Footer = () => {

     const history = useHistory();

     return (
          <div className="footer">
               <div className="container">
                    <div className="row justify-content-center">
                         <div className="col-md-2 my-3">
                              <img src={LogoWhite} className="img-footer" alt="img-footer" />
                         </div>
                         <div className="col-md-2 my-3">
                              <h5 className="mb-3">Curebox</h5>
                              <p>About Us</p>
                              <p>Carrier</p>
                              <p>FAQ</p>
                              <p>Partnership</p>
                         </div>
                         <div className="col-md-2 my-3">
                              <h5 className="mb-3">Help</h5>
                              <p>Security and Privacy</p>
                              <p>Terms and Condition</p>
                         </div>
                         <div className="col-md-3 my-3">
                              <h5 className="mb-3">Contact Us</h5>
                              <p>Curebox Tower, Jl. Kebayoran Baru No. 2 Jakarta Selatan 12784</p>
                              <p className="mt-4"><span className="fw-bold">Email:</span> customerservice@curebox.com</p>
                              <p><span className="fw-bold">Phone:</span> 021-4466-8111</p>
                         </div>
                         <div className="col-md-3 my-3">
                              <h5 className="mb-3">Do you have a pharmacy?</h5>
                              <button className="btn btn-footer" onClick={() => history.push('/register')}>REGISTER</button>
                              
                              <h5 className="mt-4 mb-3">Follow us:</h5>
                              <div className="d-flex align-items-center">
                                   <div className="icon-footer"><i class="fab fa-instagram"></i></div>
                                   <div className="icon-footer"><i class="fab fa-facebook"></i></div>
                                   <div className="icon-footer"><i class="fab fa-twitter"></i></div>
                                   <div className="icon-footer"><i class="fab fa-youtube"></i></div>
                                   <div className="icon-footer"><i class="fab fa-linkedin"></i></div>
                              </div>
                         </div>
                    </div>
                    <hr />
                    <p className="text-center m-0">Copyright &copy; 2021 CureBox</p>
               </div>
          </div>
     );
}

export default Footer;