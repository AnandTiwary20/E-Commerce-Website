import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiShoppingBag } from 'react-icons/fi';
import '../styles/not-found.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-illustration">
          <div className="error-emoji">😕</div>
          <div className="error-pulse"></div>
        </div>
        
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="back-home-btn">
            <FiArrowLeft className="back-icon" />
            Back to Home
          </Link>
          
          <Link to="/products" className="shop-btn">
            <FiShoppingBag className="shop-icon" />
            Continue Shopping
          </Link>
        </div>
        
        <div className="suggested-links">
          <p>Here are some helpful links:</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Your Cart</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;