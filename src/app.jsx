import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './app/store';
import Navbar from './Components/Navbar';
import { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, selectCartItems, selectTotalQuantity } from './features/cart/cartSlice';
import './app.css';

// Lazy load components
const ProductList = lazy(() => import('./Components/ProductList'));
const Cart = lazy(() => import('./Components/Cart'));
const NotFound = lazy(() => import('./Components/NotFound'));

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

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <CartProvider>
            {({ cartItems, totalItems, addToCart, removeFromCart, updateQuantity }) => (
              <>
                <Navbar cartCount={totalItems} />
                <main className="main-content">
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route 
                        path="/" 
                        element={
                          <ProductList 
                            addToCart={addToCart} 
                          />
                        } 
                      />
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
