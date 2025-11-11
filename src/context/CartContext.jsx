import { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addItemToCart, 
  removeItemFromCart, 
  updateItemQuantity, 
  clearCart as clearCartAction,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount
} from '../features/cart/cartSlice';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  const addToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      dispatch(updateItemQuantity({ id: productId, quantity }));
    }
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const value = {
    cartItems,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity: updateCartItemQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
