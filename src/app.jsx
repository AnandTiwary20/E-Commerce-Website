import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import './app.css';

function App() {
  const [cart, setCart] = useState([]);

  

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  const updateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) return;
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
};

  
  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<ProductList addToCart={addToCart} />} 

            />
            
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart} 
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;