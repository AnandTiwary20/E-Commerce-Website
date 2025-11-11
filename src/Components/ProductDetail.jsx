import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    addToCart({
      ...product,
      quantity,
      price: Number(product.price) || 0,
    });

    alert(`${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        <FiArrowLeft /> Back
      </button>

      <div className="product-container">
        {/* ====== Image Gallery ====== */}
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

        {/* ====== Product Info ====== */}
        <div className="product-info">
          <h1>{product.title}</h1>

          {/* Price + Discount */}
          <div className="price-container">
            <span className="current-price">${product.price.toFixed(2)}</span>
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
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>

              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                aria-label="Quantity"
              />

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button
              className="add-to-cart"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button className="buy-now">Buy Now</button>
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

export default ProductDetail;
