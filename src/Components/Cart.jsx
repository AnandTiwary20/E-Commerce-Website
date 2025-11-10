import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../app/hooks';
import LazyImage from './LazyImage';
import '../styles/cart.css';

const getImageUrl = (item) => {
  if (item.image && (item.image.startsWith('http') || item.image.startsWith('//'))) return item.image;
  if (item.image) return item.image.startsWith('/') ? item.image : `/${item.image}`;
  return 'https://via.placeholder.com/100';
};

const Cart = () => {
  const { items: cart, totalAmount, deleteFromCart } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={48} className="empty-cart-icon" />
        <h3>Your cart is empty</h3>
        <p>Looks like you haven’t added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping-btn">
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
   
      <div className="cart-items">
        <h2 className="cart-header">Your Shopping Cart</h2>

        {cart.map((item, index) => {
          const price = (item.price || item.unitPrice || 0).toFixed(2);
          const quantity = item.quantity || 1;
          const total = (price * quantity).toFixed(2);
          const imageUrl = getImageUrl(item);
          const name = item.title || item.name || 'Unnamed Product';

          return (
            <div key={`${item.id}-${index}`} className="cart-item">
              <img src={imageUrl} alt={name} className="cart-item-image" />

              <div className="cart-item-details">
                <div className="cart-item-header">
                  <h3 className="cart-item-title">{name}</h3>
                  <button
                    className="delete-item-btn"
                    onClick={() => deleteFromCart(item.id)}
                    aria-label={`Remove ${name}`}
                  >
                    ×
                  </button>
                </div>

                <div className="cart-item-price">
                  <span>${price} each</span>
                  <span className="quantity">× {quantity}</span>
                </div>

                <div className="item-total">
                  <span>Item Total:</span> ${total}
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <div className="cart-summary">
        <h3 className="summary-title">Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <div className="summary-total">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <button className="checkout-btn">Proceed to Checkout</button>

        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
