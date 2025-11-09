import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHome, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          ShoppyGlobe
        </Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            <FiHome className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsOpen(false)}>
            <div className="cart-icon-container">
              <FiShoppingCart className="nav-icon" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;