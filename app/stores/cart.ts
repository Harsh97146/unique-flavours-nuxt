import { defineStore } from 'pinia'

export interface Product {
  id: string
  name: string
  description: string
  fullDescription: string
  price: number
  weight: string
  category: string
  image: string
  inStock: boolean
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
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
      const existing = this.items.find((item) => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },
    removeFromCart(productId: string) {
      this.items = this.items.filter((item) => item.product.id !== productId)
    },
    updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }
      const item = this.items.find((item) => item.product.id === productId)
      if (item) item.quantity = quantity
    },
    clearCart() {
      this.items = []
    },
  },
})
