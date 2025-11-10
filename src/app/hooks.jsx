import { useDispatch, useSelector } from 'react-redux';
import { 
  addItemToCart, 
  removeItemFromCart, 
  deleteItemFromCart, 
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount
} from '../features/cart/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  const addToCart = (product) => {
    dispatch(addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
