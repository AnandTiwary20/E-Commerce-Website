import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../app/hooks';
import '../styles/cart.css';

const Cart = () => {
  const { items: cart, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={48} className="empty-cart-icon" />
        <h3 className="empty-cart-title">Your cart is empty</h3>
        <p className="empty-cart-message">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image-container">
              <img 
                src={item.thumbnail || item.image || 'https://via.placeholder.com/100'} 
                alt={item.title || 'Product'}
                className="cart-item-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100';
                }}
              />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title || item.name || 'Product'}</h3>
              <div className="cart-item-price">
                <span>${(item.price || item.unitPrice || 0).toFixed(2)}</span>
                <span className="quantity">× {item.quantity || 1}</span>
              </div>
              <p className="item-total">
                Total: ${((item.price || item.unitPrice || 0) * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="summary-row total">
          <span>Total</span>
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