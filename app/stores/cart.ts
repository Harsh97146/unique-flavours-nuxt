import { defineStore } from 'pinia'

export interface Product {
  _id: string
  name: string
  price: number
  category: string
  images: string[]
  shippingCost?: number
  weight?: number
  bundles?: { size: number; price: number }[]
}

export interface CartItem {
  product: Product
  quantity: number
  /** Set when the item was added as a bundle offer (equals bundle.size) */
  bundleSize?: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
  },
  actions: {
    addToCart(product: Product, quantity: number) {
      const existing = this.items.find((item) => item.product._id === product._id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },
    removeFromCart(productId: string) {
      this.items = this.items.filter((item) => item.product._id !== productId)
    },
    updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }
      const item = this.items.find((item) => item.product._id === productId)
      if (item) item.quantity = quantity
    },
    clearCart() {
      this.items = []
    },
  },
})
