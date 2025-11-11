import { useDispatch, useSelector } from 'react-redux';
import { 
  addItem, 
  removeItem, 
  deleteItem, 
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount
} from '../features/cart/cartSlice.jsx';

export const useCart = () => {
  const dispatch = useDispatch();

  // Select data from store
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  // Basic actions
  const addToCart = (product) => dispatch(addItem(product));
  const removeFromCart = (id) => dispatch(removeItem(id));
  const deleteFromCart = (id) => dispatch(deleteItem(id));
  const clearCartItems = () => dispatch(clearCart());

  // Update item quantity properly
  const updateQuantity = (productId, newQuantity) => {
    const item = items.find((i) => i.id === productId);
    if (!item) return;

    const quantity = Math.max(1, newQuantity); 

    
    dispatch(deleteItem(productId)); 
    dispatch(addItem({ ...item, quantity })); 
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    addToCart,
    removeFromCart,
    deleteFromCart,
    updateQuantity,
    clearCart: clearCartItems,
  };
};
