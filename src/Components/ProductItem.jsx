import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../app/hooks';
import LazyImage from './LazyImage';
import '../styles/productItem.css';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <LazyImage 
          src={product.thumbnail || product.image || 'https://via.placeholder.com/300'}
          alt={product.title || product.name || 'Product image'}
          className="product-image"
          width="100%"
          height="200"
        />
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <FiShoppingCart size={18} />
        </button>
        <button className="wishlist-btn" aria-label="Add to wishlist">
          <FiHeart size={18} />
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title || product.name || 'Unnamed Product'}</h3>
        <p className="product-price">${product.price || 0}</p>
      </div>
    </Link>
  );
};

export default ProductItem;