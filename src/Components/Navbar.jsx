import { Link } from 'react-router-dom'
import { FiShoppingBag, FiHome } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import '../styles/navbar.css'

const Navbar = ({ cartCount }) => {
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

        <div className="nav-links">
          <Link to="/" className="nav-link">
            <FiHome className="nav-icon" />
            <span>Home</span>
          </Link>

          <Link to="/cart" className="nav-link">
            <div className="cart-container">
              <FiShoppingBag className="nav-icon" />
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
