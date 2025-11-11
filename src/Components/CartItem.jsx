import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';

const formatPrice = (price) => `₹${Number(price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CartItem = React.memo(({ item, onUpdateQuantity, onRemove }) => {
  const { id, title, price, thumbnail, quantity } = item;
  const itemTotal = price * quantity;

  // Memoize handlers to prevent unnecessary re-renders
  const handleDecrease = useCallback(() => {
    onUpdateQuantity(id, Math.max(1, quantity - 1));
  }, [id, quantity, onUpdateQuantity]);

  const handleIncrease = useCallback(() => {
    onUpdateQuantity(id, quantity + 1);
  }, [id, quantity, onUpdateQuantity]);

  const handleRemove = useCallback(() => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      onRemove(id);
    }
  }, [id, onRemove]);

  const handleImageError = useCallback((e) => {
    e.target.src = 'https://via.placeholder.com/100';
    e.target.alt = 'Product image not available';
  }, []);

  return (
    <div className="cart-item" data-testid="cart-item">
      {/* Product Image */}
      <div className="cart-item-image">
        <img 
          src={thumbnail || 'https://via.placeholder.com/100'}
          alt={title || 'Product'} 
          className="cart-item-thumbnail"
          loading="lazy"
          onError={handleImageError}
          width="100"
          height="100"
        />
      </div>
      
      {/* Product Details */}
      <div className="cart-item-details">
        <h3 className="title">{title || 'Unnamed Product'}</h3>
        <p className="price">{formatPrice(price)} each</p>
        
        {/* Quantity Controls */}
        <div className="quantity-controls">
          <button 
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="quantity-btn minus"
            aria-label={`Decrease quantity of ${title}`}
            data-testid="decrease-quantity"
          >
            <span aria-hidden="true">−</span>
          </button>
          
          <span 
            className="quantity-display"
            aria-label={`Current quantity: ${quantity}`}
          >
            {quantity}
          </span>
          
          <button 
            type="button"
            onClick={handleIncrease}
            className="quantity-btn plus"
            aria-label={`Increase quantity of ${title}`}
            data-testid="increase-quantity"
          >
            <span aria-hidden="true">+</span>
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
        type="button"
        onClick={handleRemove}
        className="remove-btn"
        aria-label={`Remove ${title} from cart`}
        title="Remove item"
        data-testid="remove-item"
      >
        <FiTrash2 size={18} aria-hidden="true" />
      </button>
    </div>
  );
});

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;