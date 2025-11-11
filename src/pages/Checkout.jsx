import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartItems, selectTotalAmount } from '../features/cart/cartSlice';
import { FiCheckCircle, FiArrowLeft, FiCreditCard, FiTruck, FiLock } from 'react-icons/fi';
import '../styles/checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  });
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    console.log('Order submitted:', { ...formData, items: cartItems, total: totalAmount });
    
    // Simulate API call
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
          className="back-to-shop"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-icon">
          <FiCheckCircle size={64} />
        </div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been received.</p>
        <p>We've sent a confirmation email to {formData.email} with your order details.</p>
        <div className="order-actions">
          <button 
            className="continue-shopping"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
          <button 
            className="order-details"
            onClick={() => navigate('/orders')}
          >
            View Order Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className="step active">1. Shipping</div>
            <div className="step">2. Payment</div>
            <div className="step">3. Confirmation</div>
          </div>
        </div>
        
        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Shipping Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">ZIP/Postal Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Save this information for next time
              </label>
            </div>
            
            <h2>Payment Method</h2>
            
            <div className="payment-methods">
              <label className={`payment-method ${formData.paymentMethod === 'credit-card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={formData.paymentMethod === 'credit-card'}
                  onChange={handleChange}
                />
                <div className="payment-method-content">
                  <FiCreditCard className="payment-icon" />
                  <span>Credit Card</span>
                </div>
              </label>
              
              <label className={`payment-method ${formData.paymentMethod === 'paypal' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                />
                <div className="payment-method-content">
                  <img src="/paypal-logo.png" alt="PayPal" className="payment-logo" />
                </div>
              </label>
            </div>
            
            {formData.paymentMethod === 'credit-card' && (
              <div className="credit-card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="order-summary-mobile">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <span className="item-name">{item.title} × {item.quantity}</span>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="secure-checkout">
              <FiLock /> Secure Checkout
            </div>
            
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    <img src={item.thumbnail} alt={item.title} />
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
                  <span className="item-name">{item.title}</span>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="subtotal">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="shipping">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="shipping-info">
              <FiTruck className="shipping-icon" />
              <div>
                <p>Free shipping on orders over $50</p>
                <p>Estimated delivery: 2-5 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
