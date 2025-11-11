import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import Navbar from './Components/Navbar';
import { selectTotalQuantity } from './features/cart/cartSlice';
import './app.css';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./Components/ProductDetail'));
const CartPage = lazy(() => import('./Components/Cart'));
const Checkout = lazy(() => import('./Components/Checkout'));
const NotFound = lazy(() => import('./Components/NotFound'));

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // TODO: Replace with actual auth check
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const totalItems = useSelector(selectTotalQuantity);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar cartCount={totalItems} />
          <main className="main-content">
            <Suspense fallback={
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App
