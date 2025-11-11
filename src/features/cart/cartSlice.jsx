import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  items: [],         // Array to store cart items
  totalQuantity: 0,  // Total number of items in cart
  totalAmount: 0,    // Total price of all items in cart
};

// Helper function to calculate item total price
const calculateItemTotal = (price, quantity) => price * quantity;

// Helper to get product details with fallbacks
const getProductDetails = (item) => ({
  id: item.id,
  title: item.title || item.name || 'Unnamed Product',
  price: Number(item.price) || 0,
  thumbnail: item.thumbnail || item.image || 'https://via.placeholder.com/100',
  image: item.image || item.thumbnail || 'https://via.placeholder.com/100',
  quantity: Math.max(1, Number(item.quantity) || 1)
});

// Helper to update cart totals
const updateCartTotals = (state) => {
  state.totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity, 0
  );
  state.totalAmount = state.items.reduce(
    (total, item) => total + item.totalPrice, 0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or update quantity if already exists
    addItemToCart(state, { payload: newItem }) {
      const existingItem = state.items.find(item => item.id === newItem.id);
      const product = getProductDetails(newItem);
      
      if (existingItem) {
        // Update existing item
        existingItem.quantity += product.quantity;
        existingItem.totalPrice = calculateItemTotal(existingItem.price, existingItem.quantity);
      } else {
        // Add new item
        state.items.push({
          ...product,
          totalPrice: calculateItemTotal(product.price, product.quantity),
        });
      }
      
      // Update cart totals
      state.totalQuantity += product.quantity;
      state.totalAmount += calculateItemTotal(product.price, product.quantity);
    },

    // Decrease item quantity or remove if quantity becomes zero
    removeItemFromCart(state, { payload: itemId }) {
      const existingItem = state.items.find(item => item.id === itemId);
      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        // Remove item if quantity becomes zero
        state.items = state.items.filter(item => item.id !== itemId);
      } else {
        // Decrease quantity
        existingItem.quantity--;
        existingItem.totalPrice = calculateItemTotal(existingItem.price, existingItem.quantity);
      }
      
      // Update cart totals
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      
      // Ensure total amount doesn't go below zero
      state.totalAmount = Math.max(0, state.totalAmount);
    },

    // Remove item completely from cart
    deleteItemFromCart(state, { payload: itemId }) {
      const existingItem = state.items.find(item => item.id === itemId);
      if (!existingItem) return;

      state.items = state.items.filter(item => item.id !== itemId);
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
      
      // Ensure totals don't go below zero
      state.totalQuantity = Math.max(0, state.totalQuantity);
      state.totalAmount = Math.max(0, state.totalAmount);
    },

    // Update item quantity in cart
    updateItemQuantity: {
      reducer(state, { payload: { id, quantity } }) {
        const existingItem = state.items.find(item => item.id === id);
        if (!existingItem) return;

        // Ensure quantity is at least 1
        const newQuantity = Math.max(1, quantity);
        const quantityDiff = newQuantity - existingItem.quantity;
        
        if (quantityDiff === 0) return; // No change needed
        
        // Update item quantity and total price
        existingItem.quantity = newQuantity;
        existingItem.totalPrice = calculateItemTotal(existingItem.price, newQuantity);
        
        // Update cart totals
        state.totalQuantity += quantityDiff;
        state.totalAmount += quantityDiff * existingItem.price;
      },
      prepare(id, quantity) {
        return { payload: { id, quantity: Number(quantity) } };
      }
    },
    
    // Clear all items from cart
    clearCart: () => initialState,
  },
});

// Export actions
export const { 
  addItemToCart, 
  removeItemFromCart, 
  deleteItemFromCart, 
  updateItemQuantity,
  clearCart 
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;

// Export reducer
export default cartSlice.reducer;
