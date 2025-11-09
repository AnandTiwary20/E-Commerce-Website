import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { id, title, price, thumbnail, quantity } = item;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={thumbnail} alt={title} className="cart-item-thumbnail" />
      </div>
      <div className="cart-item-details">
        <h4 className="cart-item-title">{title}</h4>
        <p className="cart-item-price">${price.toFixed(2)}</p>
        <div className="cart-item-quantity">
          <button 
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
            className="quantity-btn"
          >
            −
          </button>
          <span className="quantity">{quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
      </div>
      <button 
        onClick={() => onRemove(id)}
        className="remove-btn"
        aria-label="Remove item"
      >
        &times;
      </button>
    </div>
  );
};

export default CartItem;