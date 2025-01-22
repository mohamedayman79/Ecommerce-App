import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../Components/Assets/images/freshcart-logo.svg";
import { ProductsContext } from "../Context/ProductsContext";

function Navebar(props) {
  const { cartCount, favoriteCount } = useContext(ProductsContext);

  return (
    <div>
      <nav className='navbar fixed-top navbar-expand-md navbar-light navbar-expand-lg py-3 shadow-sm bg-body-tertiary'>
        <div className='container'>
          <Link
            className='navbar-brand'
            to='/home'>
            <img
              src={logo}
              alt='fresh market logo'
            />
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div
            className='collapse navbar-collapse'
            id='navbarNav'>
            {props.userData ? (
              <>
                <ul className='navbar-nav me-auto mt-2 mt-lg-0'>
                  <li className='nav-item active'>
                    <NavLink
                      className='nav-link'
                      to='home'>
                      Home <span className='sr-only'>(current)</span>
                    </NavLink>
                  </li>
                  <li className='nav-item active'>
                    <NavLink
                      className='nav-link'
                      to='products'>
                      Products
                    </NavLink>
                  </li>

                  <li className='nav-item active'>
                    <NavLink
                      className='nav-link'
                      to='categories'>
                      Categories
                    </NavLink>
                  </li>
                  <li className='nav-item active'>
                    <NavLink
                      className='nav-link'
                      to='brands'>
                      Brands
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}

            <ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
              {props.userData ? (
                <>
                  <li className='nav-item active'>
                    <NavLink
                      className='nav-link position-relative'
                      to='cart'>
                      <i className='fa-solid fa-cart-shopping fa-lg text-success'></i>
                      {cartCount > 0 && (
                        <span className='badge position-absolute'>
                          {cartCount}
                        </span>
                      )}
                    </NavLink>
                  </li>

                  <li className='nav-item active'>
                    <NavLink
                      className='nav-link position-relative'
                      to='favorite'>
                      <i className='fa-solid fa-heart fa-xl text-danger'></i>
                      {favoriteCount > 0 && (
                        <span className='badge position-absolute'>
                          {favoriteCount}
                        </span>
                      )}
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <span
                      onClick={props.logOut}
                      className='nav-link pe-5 pointer-cursor'>
                      LogOut
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='login'>
                      Login
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='register'>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navebar;
