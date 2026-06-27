<script setup lang="ts">
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useProductStore } from '~/stores/products'
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Shopping Cart - Unique Flavours' })

const cart = useCartStore()
const productStore = useProductStore()
const auth = useAuthStore()
const route = useRoute()
const total = computed(() => cart.totalPrice)

const showCheckoutModal = ref(false)

onMounted(() => {
  if (route.query.checkout === 'true' && cart.items.length > 0 && auth.token) {
    showCheckoutModal.value = true
  }
})

const handleCheckout = async () => {
  if (!auth.token) {
    await auth.fetchUser()
  }
  if (!auth.token) {
    auth.modalMode = 'login'
    auth.showLoginModal = true
    return
  }
  if (cart.items.length === 0) return
  showCheckoutModal.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Empty Cart -->
    <div v-if="cart.items.length === 0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="bg-white rounded-xl shadow-md p-12 text-center">
          <ShoppingBag class="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p class="text-lg text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <NuxtLink to="/products">
            <button class="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">Continue Shopping</button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Cart with Items -->
    <template v-else>
      <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NuxtLink to="/products" class="inline-flex items-center gap-2 text-gray-600 hover:text-purple-700 transition-colors mb-4">
            <ArrowLeft class="w-5 h-5" /> Continue Shopping
          </NuxtLink>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p class="text-gray-600 mt-2">{{ cart.totalItems }} {{ cart.totalItems === 1 ? 'item' : 'items' }} in your cart</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-4">
            <div v-for="item in cart.items" :key="item.product._id" class="bg-white rounded-xl shadow-md p-6">
              <div class="flex gap-6">
                <div class="w-32 h-32 flex-shrink-0">
                  <img :src="productStore.formatImageUrl(item.product.images?.[0])" :alt="item.product.name" class="w-full h-full object-cover rounded-lg" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <NuxtLink :to="`/products/${item.product._id}`">
                        <h3 class="text-xl font-bold text-gray-900 hover:text-purple-700 transition-colors">{{ item.product.name }}</h3>
                      </NuxtLink>
                      <p class="text-sm text-green-600 font-medium mt-1">{{ item.product.category }}</p>
                    </div>
                    <button @click="cart.removeFromCart(item.product._id)" class="text-red-600 hover:text-red-700 transition-colors" title="Remove">
                      <Trash2 class="w-5 h-5" />
                    </button>
                  </div>
                  <div class="flex items-center justify-between mt-4">
                    <div class="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <button @click="cart.updateQuantity(item.product._id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors">
                        <Minus class="w-4 h-4" />
                      </button>
                      <span class="text-lg font-semibold w-8 text-center">{{ item.quantity }}</span>
                      <button @click="cart.updateQuantity(item.product._id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors">
                        <Plus class="w-4 h-4" />
                      </button>
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-bold text-gray-900">₹{{ item.product.price * item.quantity }}</p>
                      <p v-if="item.quantity > 1" class="text-sm text-gray-500">₹{{ item.product.price }} each</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span><span class="font-semibold">₹{{ cart.totalPrice }}</span>
                </div>

                <div class="border-t pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-gray-900">Total</span>
                    <span class="text-2xl font-bold text-gray-900">₹{{ total }}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>
              </div>
              <button @click="handleCheckout" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors mb-4">Proceed to Checkout</button>
              <NuxtLink to="/products">
                <button class="w-full border-2 border-purple-700 text-purple-700 hover:bg-purple-50 py-3 rounded-lg font-semibold transition-colors">Continue Shopping</button>
              </NuxtLink>

              <div class="mt-6 space-y-3">
                <div class="flex items-start gap-3"><div class="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p class="text-sm text-gray-600">100% Natural - No added sugar or preservatives</p></div>
                <div class="flex items-start gap-3"><div class="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p class="text-sm text-gray-600">Supporting tribal women farmers</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <CheckoutModal :show="showCheckoutModal" @close="showCheckoutModal = false" />
  </div>
</template>
