import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/not-found.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
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
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
