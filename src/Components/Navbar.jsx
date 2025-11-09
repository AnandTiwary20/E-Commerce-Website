import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHome, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import '../styles/navbar.css';

// Add Inter font
const interFont = document.createElement('link');
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
interFont.rel = 'stylesheet';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>
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