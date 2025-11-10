import { useDispatch, useSelector } from 'react-redux';
import { 
  addItemToCart, 
  removeItemFromCart, 
  deleteItemFromCart, 
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount
} from '../features/cart/cartSlice.jsx';

export const useCart = () => {
  const dispatch = useDispatch();
  
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  const addToCart = (product) => {
    dispatch(addItemToCart({
      id: product.id,
      title: product.title || product.name,
      name: product.name || product.title,
      price: product.price || product.unitPrice || 0,
      image: product.image || product.thumbnail,
      thumbnail: product.thumbnail || product.image,
      quantity: 1
    }));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const deleteFromCart = (productId) => {
    dispatch(deleteItemFromCart(productId));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart: clearCartItems,
  };
};
