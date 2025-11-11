import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const getItemTotal = (price, qty) => price * qty

const formatProduct = (item) => ({
  id: item.id,
  title: item.title || item.name || 'Unnamed Product',
  price: Number(item.price) || 0,
  image: item.image || item.thumbnail || 'https://via.placeholder.com/100',
  thumbnail: item.thumbnail || item.image || 'https://via.placeholder.com/100',
  quantity: Math.max(1, Number(item.quantity) || 1),
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const product = formatProduct(payload)
      const existing = state.items.find((i) => i.id === product.id)

      if (existing) {
        existing.quantity += product.quantity
        existing.totalPrice = getItemTotal(existing.price, existing.quantity)
      } else {
        state.items.push({
          ...product,
          totalPrice: getItemTotal(product.price, product.quantity),
        })
      }

      state.totalQuantity += product.quantity
      state.totalAmount += getItemTotal(product.price, product.quantity)
    },

    removeItem(state, { payload: id }) {
      const item = state.items.find((i) => i.id === id)
      if (!item) return

      if (item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id)
      } else {
        item.quantity -= 1
        item.totalPrice = getItemTotal(item.price, item.quantity)
      }

      state.totalQuantity = Math.max(0, state.totalQuantity - 1)
      state.totalAmount = Math.max(0, state.totalAmount - item.price)
    },

    deleteItem(state, { payload: id }) {
      const item = state.items.find((i) => i.id === id)
      if (!item) return

      state.items = state.items.filter((i) => i.id !== id)
      state.totalQuantity = Math.max(0, state.totalQuantity - item.quantity)
      state.totalAmount = Math.max(0, state.totalAmount - item.totalPrice)
    },

    clearCart() {
      return initialState
    },
  },
})

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions

export default cartSlice.reducer

export const selectCartItems = (state) => state.cart.items
export const selectTotalQuantity = (state) => state.cart.totalQuantity
export const selectTotalAmount = (state) => state.cart.totalAmount
