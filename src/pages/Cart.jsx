import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, updateItemQuantity, clearCart, selectCartItems, selectTotalAmount } from '../features/cart/cartSlice';
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import '../styles/cart-page.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  const handleQuantityChange = (id, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleIncrement = (id, currentQuantity) => {
    dispatch(updateItemQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemoveItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      dispatch(removeItemFromCart(id));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (cartItems.length === 0) {
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
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              
              <div className="item-details">
                <h3 className="item-title">
                  <Link to={`/product/${item.id}`}>{item.title}</Link>
                </h3>
                <p className="item-price">${item.price.toFixed(2)} each</p>
                
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDecrement(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus size={14} />
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="quantity-input"
                  />
                  
                  <button 
                    className="quantity-btn"
                    onClick={() => handleIncrement(item.id, item.quantity)}
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
                
                <button 
                  className="remove-item"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FiTrash2 /> Remove
                </button>
              </div>
              
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          
          <div className="cart-actions">
            <button 
              className="clear-cart"
              onClick={handleClearCart}
            >
              <FiTrash2 /> Clear Cart
            </button>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
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
          <button className="checkout-btn">Proceed to Checkout</button>
          <p className="secure-checkout">
            <span>🔒</span> Secure Checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
