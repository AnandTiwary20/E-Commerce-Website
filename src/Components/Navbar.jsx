import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHome, FiMenu, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import '../styles/navbar.css'

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">ShoppyGlobe</Link>

        <button 
          className="menu-btn" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="toggle menu"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            <FiHome className="nav-icon" />
            <span>Home</span>
          </Link>

          <Link to="/cart" className="nav-link" onClick={() => setIsOpen(false)}>
            <div className="cart-container">
              <FiShoppingCart className="nav-icon" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
