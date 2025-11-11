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
        <ProductList products={products} />
      </section>
    </div>
  );
};

export default Home;
