import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useMemo } from 'react';
import '../styles/cart.css';

const getImageUrl = (item) => {
  if (item.image && (item.image.startsWith('http') || item.image.startsWith('//'))) return item.image;
  if (item.image) return item.image.startsWith('/') ? item.image : `/${item.image}`;
  return 'https://via.placeholder.com/100';
};

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items: cart = [], 
    totalAmount = 0, 
    deleteFromCart,
    updateQuantity,
    removeFromCart 
  } = useCart();
  
  // Handle quantity updates
  const handleQuantityChange = (itemId, currentQty, action) => {
    if (action === 'increment') {
      updateQuantity(itemId, currentQty + 1);
    } else if (action === 'decrement' && currentQty > 1) {
      updateQuantity(itemId, currentQty - 1);
    }
  };
  
  // Handle item removal
  const handleRemoveItem = (itemId) => {
    if (deleteFromCart) {
      deleteFromCart(itemId);
    } else if (removeFromCart) {
      removeFromCart(itemId);
    }
  };
  
  const handleCheckout = () => {
    // Save cart data to localStorage before navigating
    localStorage.setItem('checkoutData', JSON.stringify({
      items: cart,
      total: totalAmount
    }));
    navigate('/checkout');
  };
  
  // Format price in Indian Rupees
  const formatPrice = useMemo(() => (amount) => {
    return `₹${Number(amount).toLocaleString('en-IN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }, []);

  if (!cart || cart.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={48} className="empty-cart-icon" />
        <h3 class ="empty-cart-title">Your cart is empty</h3>
        <p class = "empty-cart-title">Looks like you haven’t added anything to your cart yet.</p>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item.id);
                    }}
                    aria-label={`Remove ${name}`}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                <div className="cart-item-price">
                  <span className="price-text">{formatPrice(price)} each</span>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity, 'decrement');
                      }}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity, 'increment');
                      }}
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <span>Item Total:</span> {formatPrice(total)}
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
          <span>{formatPrice(totalAmount)}</span>
        </div>

        <div className="summary-total">
          <span>Total:</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>

        <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={!cart || cart.length === 0}
        >
          Proceed to Checkout
        </button>

        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
