import { useProducts } from '../hooks/useProducts';
import { useCart } from '../app/hooks';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

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

  // Function to render star rating
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
      <div className="products-grid">
        {products.map((product) => (
          <span key={product.id} className="product-card">
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
                onClick={() => addToCart({
                  ...product,
                  quantity: 1,
                  totalPrice: product.price
                })}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              
              <div className="product-actions">
                <button className="action-btn">Add to List</button>
                <span className="divider">|</span>
                <button className="action-btn">Add to Compare</button>
              </div>
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductList;