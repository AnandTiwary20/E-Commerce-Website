import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartItems, selectTotalAmount } from '../features/cart/cartSlice';
import { FiCheckCircle, FiCreditCard, FiUser, FiMail, FiMapPin, FiLock } from 'react-icons/fi';
import '../styles/checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    console.log('Processing payment with:', formData);
    
    // Simulate payment processing
    setTimeout(() => {
      setOrderPlaced(true);
      dispatch(clearCart());
    }, 1500);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>There are no items in your cart to checkout.</p>
        <button 
          onClick={() => navigate('/')} 
          className="continue-shopping"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <FiCheckCircle className="success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
        <p>Order Number: #{Math.floor(Math.random() * 1000000)}</p>
        <button 
          onClick={() => navigate('/')} 
          className="back-to-shop"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><FiUser /> Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label><FiMail /> Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
              />
            </div>
            
            <div className="form-group">
              <label><FiMapPin /> Shipping Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="123 Main St, City, Country"
                rows="3"
              ></textarea>
            </div>
            
            <h2>Payment Information</h2>
            
            <div className="form-group">
              <label><FiCreditCard /> Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              
              <div className="form-group">
                <label>CVV</label>
                <div className="cvv-input">
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    placeholder="123"
                    maxLength="3"
                  />
                  <FiLock className="lock-icon" />
                </div>
              </div>
            </div>
            
            <button type="submit" className="place-order-btn">
              Place Order - ${totalAmount.toFixed(2)}
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <img 
                  src={item.image || item.thumbnail} 
                  alt={item.title} 
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="order-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
