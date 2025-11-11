import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './app/store';
import Navbar from './Components/Navbar';
import { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, selectCartItems, selectTotalQuantity } from './features/cart/cartSlice';
import './app.css';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const Loading = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// CartProvider component to handle cart operations
const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalQuantity);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      handleRemoveFromCart(id);
    } else {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return children({
    cartItems,
    totalItems,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
  });
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Replace with actual auth check
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
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
                      <Route 
                        path="/cart" 
                        element={
                          <Cart 
                            cartItems={cartItems}
                            removeFromCart={removeFromCart} 
                            updateQuantity={updateQuantity} 
                          />
                        } 
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
              </>
            )}
          </CartProvider>
        </div>
      </Router>
    </Provider>
  );
}

export default App
