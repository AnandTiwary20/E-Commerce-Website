import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useCart } from './app/hooks';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import './app.css';
import NotFound from './Components/NotFound';

function AppContent() {
  const { totalQuantity } = useCart();
  
  return (
    <div className="app">
      <Navbar cartCount={totalQuantity} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;