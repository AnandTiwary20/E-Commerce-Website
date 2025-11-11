import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../Components/ProductList';

const Home = () => {
  const { products, loading, error } = useProducts();

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

  return (
    <div className="home">
      <div className="banner">
        <h1>Welcome to Our Store</h1>
        <p>Discover amazing deals on our products</p>
      </div>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <ProductList products={products} />
      </section>
      
      <div className="cta-section">
        <h2>Ready to shop?</h2>
        <Link to="/products" className="cta-button">View All Products</Link>
      </div>
    </div>
  );
};

export default Home;
