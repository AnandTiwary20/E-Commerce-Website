import { useProducts } from '../hooks/useProducts';


const ProductList = ({ addToCart }) => {
  const { products, loading, error } = useProducts();


  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="product-image"
            />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <p className="description">{product.description}</p>
            <div className="rating">
              Rating: {product.rating} ⭐
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;