import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/" className="logo">E-Commerce</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            Cart 
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;