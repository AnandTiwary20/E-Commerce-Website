import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import '../styles/product-detail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product (${response.status})`);
      }
      const data = await response.json();
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Product data is empty');
      }
      setProduct(data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    addToCart({
      ...product,
      quantity,
      price: Number(product.price) || 0,
    });

    alert(`${product.title} added to cart for ₹${(product.price * quantity).toLocaleString('en-IN')}!`);
  };

  if (loading) {
    return (
      <div className="loading-container" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message" role="alert">
        <p>Error: {error}</p>
        <div className="button-group">
          <button 
            onClick={fetchProduct} 
            className="retry-button"
            aria-label="Retry loading product"
          >
            <FiRefreshCw /> Try Again
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="back-button"
            aria-label="Back to home"
          >
            <FiArrowLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found" role="alert">
        <h2>Product not found</h2>
        <button 
          onClick={() => navigate('/')} 
          className="back-button"
          aria-label="Back to home"
        >
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail" role="main">
      <button 
        onClick={() => navigate(-1)} 
        className="back-button"
        aria-label="Go back to previous page"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="product-container">

        <div className="product-gallery">
          <div className="main-image">
            <img
              src={product.images ? product.images[selectedImage] : product.thumbnail}
              alt={product.title}
            />
          </div>

          <div className="thumbnail-container">
            {product.images &&
              product.images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.title} ${index + 1}`} />
                </div>
              ))}
          </div>
        </div>

        
        <div className="product-info">
          <h1>{product.title}</h1>

          {/* Price + Discount */}
          <div className="price-container">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.discountPercentage > 0 && (
              <span className="discount">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(product.rating) ? 'star filled' : 'star'}
              >
                ★
              </span>
            ))}
            <span className="rating-count">({product.rating})</span>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <label htmlFor={`quantity-${product.id}`} className="quantity-label">
              Quantity:
            </label>
            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                className="quantity-btn"
                aria-label="Decrease quantity"
                aria-controls={`quantity-${product.id}`}
              >
                -
              </button>

              <input
                type="number"
                id={`quantity-${product.id}`}
                min="1"
                max={product.stock || 99}
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setQuantity(Math.min(Math.max(1, value), product.stock || 99));
                }}
                className="quantity-input"
                aria-label="Quantity"
                aria-valuemin="1"
                aria-valuemax={product.stock || 99}
                aria-valuenow={quantity}
              />

              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.min(prev + 1, product.stock || 99))}
                disabled={quantity >= (product.stock || 99)}
                className="quantity-btn"
                aria-label="Increase quantity"
                aria-controls={`quantity-${product.id}`}
              >
                +
              </button>
            </div>
            {product.stock > 0 && (
              <div className="stock-status" aria-live="polite">
                {product.stock} in stock
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button
              type="button"
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={!product.stock || product.stock <= 0}
              aria-label={`Add ${product.title} to cart`}
              aria-disabled={!product.stock || product.stock <= 0}
            >
              <FiShoppingCart aria-hidden="true" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button 
              type="button" 
              className="buy-now"
              disabled={!product.stock || product.stock <= 0}
              aria-label={`Buy ${product.title} now`}
              aria-disabled={!product.stock || product.stock <= 0}
            >
              Buy Now
            </button>
          </div>

          {/* Description */}
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              <li>
                <strong>Brand:</strong> {product.brand || 'N/A'}
              </li>
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              <li>
                <strong>Stock:</strong> {product.stock} units available
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  // Router props
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  })
};

export default ProductDetail;
