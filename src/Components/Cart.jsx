import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { 
  deleteItemFromCart,
  updateItemQuantity, 
  selectCartItems, 
  selectTotalAmount,
  selectTotalQuantity
} from '../features/cart/cartSlice';
import { useEffect, useState } from 'react';
import LazyImage from './LazyImage';
import '../styles/cart.css';

const getImageUrl = (item) => {
  if (item.image && (item.image.startsWith('http') || item.image.startsWith('//'))) return item.image;
  if (item.image) return item.image.startsWith('/') ? item.image : `/${item.image}`;
  if (item.thumbnail) return item.thumbnail;
  return 'https://via.placeholder.com/100';
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalItems = useSelector(selectTotalQuantity);
  const [quantities, setQuantities] = useState({});

  // Initialize quantities from cart
  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    // Update local state
    setQuantities(prev => ({
      ...prev,
      [itemId]: quantity
    }));
    // Update Redux state
    dispatch(updateItemQuantity(itemId, quantity));
  };

  const handleIncrement = (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    const newQuantity = currentQuantity + 1;
    // Update local state
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
    // Update Redux state
    dispatch(updateItemQuantity(itemId, newQuantity));
  };

  const handleDecrement = (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      // Update local state
      setQuantities(prev => ({
        ...prev,
        [itemId]: newQuantity
      }));
      // Update Redux state
      dispatch(updateItemQuantity(itemId, newQuantity));
    }
  };


  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={64} className="empty-cart-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
   
      <div className="cart-items">
        <div className="cart-header">
          <FiShoppingBag size={24} className="cart-icon" aria-hidden="true" />
          <h2>Your Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>
        </div>

        {cartItems.map((item, index) => {
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
                  <div className="delete-item-container" title="Remove item">
                    <button
                      type="button"
                      className="delete-item-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
                          dispatch(deleteItemFromCart(item.id));
                        }
                      }}
                      aria-label={`Remove ${name} from cart`}
                    >
                      <FiTrash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    type="button"
                    className="quantity-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrement(item.id);
                    }}
                    disabled={quantities[item.id] <= 1}
                    aria-label={`Decrease quantity of ${name}`}
                  >
                    <FiMinus size={14} aria-hidden="true" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      handleQuantityChange(item.id, value);
                    }}
                    className="quantity-input"
                    aria-label="Quantity"
                  />
                  <button 
                    type="button"
                    className="quantity-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrement(item.id);
                    }}
                    aria-label={`Increase quantity of ${name}`}
                  >
                    <FiPlus size={14} aria-hidden="true" />
                  </button>
                </div>
                <div className="cart-item-price">
                  <span>${price} each</span>
                  <span className="item-total">${(price * quantity).toFixed(2)}</span>
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
          <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <div className="summary-total">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <button 
          type="button" 
          className="checkout-btn" 
          onClick={() => navigate('/checkout')}
          disabled={!cartItems.length}
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
