import { Link } from 'react-router-dom';
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../app/hooks';
import LazyImage from './LazyImage';
import '../styles/cart.css';


const getProductImage = (item) => {
  const imageUrl = item.thumbnail || item.image || 'https://via.placeholder.com/100';
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/100';
  };
  
  return (
    <img 
      src={imageUrl} 
      alt={item.title || 'Product'} 
      className="cart-item-image"
      onError={handleImageError}
    />
  );
};

// Helper function to calculate item total
const calculateItemTotal = (item) => {
  const price = item.price || item.unitPrice || 0;
  const quantity = item.quantity || 1;
  return (price * quantity).toFixed(2);
};

const Cart = () => {
  const { items: cart, totalAmount, deleteFromCart } = useCart();

  // Show empty cart message if no items
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={48} className="empty-cart-icon" />
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping-btn">
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      
      <div className="cart-items">
        {cart.map(item => {
          const price = (item.price || item.unitPrice || 0).toFixed(2);
          const itemTotal = calculateItemTotal(item);
          const productName = item.title || item.name || 'Unnamed Product';
          const imageUrl = item.image || item.thumbnail || 'https://via.placeholder.com/100';
          
          return (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image-container">
                <LazyImage 
                  src={imageUrl}
                  alt={productName}
                  className="cart-item-image"
                  width="80"
                  height="80"
                />
              </div>
              
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <h3>{productName}</h3>
                  <button 
                    onClick={() => deleteFromCart(item.id)}
                    className="delete-item-btn"
                    aria-label={`Remove ${productName} from cart`}
                  >
                    ×
                  </button>
                </div>
                
                <div className="cart-item-price">
                  <span>${price}</span>
                  <span className="quantity">× {item.quantity || 1}</span>
                </div>
                
                <p className="item-total">
                  <strong>Total:</strong> ${itemTotal}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="cart-summary">
        <div className="summary-row total">
          <span>Order Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;