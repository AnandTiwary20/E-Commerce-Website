import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      padding: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{
          fontSize: '4rem',
          margin: '0',
          color: '#2563eb'
        }}>404</h1>
        
        <h2 style={{
          margin: '0.5rem 0 1rem',
          color: '#1f2937'
        }}>Page Not Found</h2>
        
        <p style={{
          marginBottom: '1.5rem',
          color: '#4b5563'
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '2rem'
        }}>
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'background-color 0.2s'
          }}>
            <FiArrowLeft />
            Back to Home
          </Link>
          
          <Link to="/products" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            border: '1px solid #2563eb',
            color: '#2563eb',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'background-color 0.2s'
          }}>
            <FiShoppingBag />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;