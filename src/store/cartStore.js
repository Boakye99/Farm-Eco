// src/store/cartStore.js
import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  cartItems: [],

  // Add product to cart (only once)
  addToCart: (product) => {
    const cart = get().cartItems
    const exists = cart.find(item => item.id === product.id)

    if (!exists) {
      set({
        cartItems: [...cart, { ...product, quantity: 1 }],
      })
    }
    // If item exists, do nothing (prevent duplicates)
  },

  // Remove product from cart
  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter(item => item.id !== productId),
    })
  },

  // Decrease quantity
  decreaseQuantity: (productId) => {
    const cart = get().cartItems
    set({
      cartItems: cart
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0),
    })
  },

  // Clear all items from cart
  clearCart: () => set({ cartItems: [] }),

  // Get total number of items in cart
  totalItems: () =>
    get().cartItems.reduce((acc, item) => acc + item.quantity, 0),

  // Get total price of items in cart
  totalPrice: () =>
    get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
}))

export default useCartStore
