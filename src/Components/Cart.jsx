import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="empty-cart compact">
        <FiShoppingBag size={32} />
        <h3>Your cart is empty</h3>
        <Link to="/" className="btn btn-sm btn-outline">
          Browse Products
        </Link>
      </div>
    );
  }
  return (
    <div className="compact-cart">
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item compact">
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="item-thumb"
              loading="lazy"
            />
            <div className="item-details">
              <h4 className="item-title">{item.title}</h4>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
              aria-label="Remove item"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary compact">
        <div className="summary-row">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <Link to="/checkout" className="btn btn-primary btn-block">
          Checkout
        </Link>
        <Link to="/" className="text-link">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;