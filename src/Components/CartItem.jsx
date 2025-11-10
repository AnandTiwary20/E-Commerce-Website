import React from 'react';


const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// Helper function to handle image errors
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/100';
  e.target.alt = 'Product image not available';
};

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { id, title, price, thumbnail, quantity } = item;
  const itemTotal = price * quantity;

  return (
    <div className="cart-item">
      {/* Product Image */}
      <div className="cart-item-image">
        <img 
          src={thumbnail || 'https://via.placeholder.com/100'} 
          alt={title || 'Product'} 
          className="cart-item-thumbnail"
          onError={handleImageError}
        />
      </div>
      
      {/* Product Details */}
      <div className="cart-item-details">
        <h4 className="title">{title || 'Unnamed Product'}</h4>
        <p className="price">{formatPrice(price)} each</p>
        
        {/* Quantity Controls */}
        <div className="quantity-controls">
          <button 
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
            className="quantity-btn minus"
            aria-label="Decrease quantity"
          >
            −
          </button>
          
          <span className="quantity-display">{quantity}</span>
          
          <button 
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="quantity-btn plus"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        {/* Item Total */}
        <div className="item-total">
          <span>Item Total:</span>
          <span className="total-amount">{formatPrice(itemTotal)}</span>
        </div>
      </div>
      
      {/* Remove Button */}
      <button 
        onClick={() => onRemove(id)}
        className="remove-btn"
        aria-label="Remove item from cart"
        title="Remove item"
      >
        <span className="remove-icon">×</span>
        &times;
      </button>
    </div>
  );
};

export default CartItem;