import { useProducts } from '../hooks/useProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/search/searchSlice.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { addItemToCart } from '../features/cart/cartSlice';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { useContext } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/amazonGrid.css';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({ 
      ...product, 
      quantity: 1,
      price: Number(product.price) || 0
    });
    
    // Show success message
    alert(`${product.title} added to cart!`);
  };

  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    
    return (
      <div className="rating">
        <div className="stars">{stars}</div>
        <span className="rating-count">{Math.floor(Math.random() * 1000)}</span>
      </div>
    );
  };

  return (
    <div className="amazon-container">
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="products-grid" style={{ margin: '0 auto', maxWidth: '100%', padding: '0 20px' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
          <div key={product.id} className="product-card" style={{ display: 'inline-block', float: 'none' }}>
            <div className="product-image-container">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="product-image"
                loading="lazy"
              />
              <div className="product-badges">
                {product.discountPercentage > 10 && (
                  <span className="discount-badge">
                    {Math.round(product.discountPercentage)}% off
                  </span>
                )}
                {product.rating > 4.5 && (
                  <span className="bestseller-badge">Best Seller</span>
                )}
              </div>
            </div>
            
            <div className="product-details">
              <h3 className="product-title">
                {product.title.length > 50 
                  ? `${product.title.substring(0, 50)}...` 
                  : product.title}
              </h3>
              
              {renderRating(product.rating)}
              
              <div className="price-container">
                <span className="current-price">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="original-price">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
                {product.discountPercentage > 10 && (
                  <span className="discount-text">
                    {Math.round(product.discountPercentage)}% off
                  </span>
                )}
              </div>
              
              <p className="shipping-info">
                FREE delivery
                {product.rating > 4 && ' Tomorrow'}
              </p>
              
              <p className="stock-status">
                {product.stock > 10 
                  ? 'In Stock' 
                  : product.stock > 0 
                    ? `Only ${product.stock} left in stock` 
                    : 'Out of Stock'}
              </p>
              
              <button 
                className="add-to-cart-btn"
                onClick={() => {
                  addToCart({
                    ...product,
                    quantity: 1,
                    totalPrice: product.price
                  });
                  navigate('/cart');
                }}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              
            </div>
          </div>
        )) ) : (
          <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
            <p>No products found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;