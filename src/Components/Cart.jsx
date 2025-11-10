import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../app/hooks';
import '../styles/cart.css';

const Cart = () => {
  const { 
    items: cart, 
    removeFromCart, 
    updateQuantity, 
    totalAmount,
    clearCart
  } = useCart();

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
      <div className="cart-header">
        <Link to="/" className="cart-header-link">
          <FiArrowLeft size={16} />
          Continue Shopping
        </Link>
        <span className="cart-header-separator">•</span>
        <span>Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} {cart.length === 1 ? 'item' : 'items'})</span>
        {cart.length > 0 && (
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        )}
      </div>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image-container">
              <img 
                src={item.images?.[0] || item.thumbnail || 'https://via.placeholder.com/100'} 
                alt={item.title}
                className="cart-item-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100';
                }}
              />
            </div>
            <div className="cart-item-details">
              <h4 className="cart-item-title">{item.title || item.name || 'Product'}</h4>
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
                <span className="item-price">${((item.price || 0) * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => dispatch(removeFromCart(item.id))}
              className="remove-item-btn"
              aria-label="Remove item"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" disabled={cart.length === 0}>
          Proceed to Checkout
        </button>
        <Link to="/" className="continue-shopping-link">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;