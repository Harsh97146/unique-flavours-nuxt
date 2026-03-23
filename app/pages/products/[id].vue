<script setup lang="ts">
import { ArrowLeft, ShoppingCart, Heart, Share2, Leaf, Truck, ShieldCheck } from 'lucide-vue-next'
import { products } from '~/data/products'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cart = useCartStore()

const product = computed(() => products.find((p) => p.id === route.params.id))
const quantity = ref(1)
const toast = ref('')

const relatedProducts = computed(() =>
  products.filter((p) => p.category === product.value?.category && p.id !== product.value?.id).slice(0, 3)
)

const handleAddToCart = () => {
  if (!product.value) return
  cart.addToCart(product.value, quantity.value)
  toast.value = `Added ${quantity.value} ${product.value.name} to cart!`
  setTimeout(() => (toast.value = ''), 3000)
}

useHead(() => ({
  title: product.value ? `${product.value.name} - Unique Flavours` : 'Product Not Found'
}))
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Toast notification -->
    <Transition name="fade">
      <div v-if="toast" class="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
        <span>✓</span> {{ toast }}
        <NuxtLink to="/cart" class="underline ml-2 text-sm">View Cart</NuxtLink>
      </div>
    </Transition>

    <div v-if="!product" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <NuxtLink to="/products">
          <button class="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">Back to Products</button>
        </NuxtLink>
      </div>
    </div>

    <template v-else>
      <!-- Back Button -->
      <div class="border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <NuxtLink to="/products" class="inline-flex items-center gap-2 text-gray-600 hover:text-purple-700 transition-colors">
            <ArrowLeft class="w-5 h-5" /> Back to Products
          </NuxtLink>
        </div>
      </div>

      <!-- Product Details -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div class="sticky top-24">
            <div class="rounded-2xl overflow-hidden shadow-xl">
              <img :src="product.image" :alt="product.name" class="w-full h-[500px] object-cover" />
            </div>
            <div v-if="product.inStock" class="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div class="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-green-700">In Stock - Ready to Ship</span>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <p class="text-sm text-green-600 font-medium mb-2">{{ product.category }}</p>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
            <p class="text-lg text-gray-600 mb-6">{{ product.description }}</p>

            <!-- Price -->
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
              <div class="flex items-baseline gap-3 mb-2">
                <span class="text-4xl font-bold text-gray-900">₹{{ product.price }}</span>
                <span class="text-lg text-gray-500">{{ product.weight }}</span>
              </div>
              <p class="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            <!-- Quantity -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div class="flex items-center gap-4">
                <button @click="quantity = Math.max(1, quantity - 1)" class="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium">-</button>
                <span class="text-lg font-medium w-12 text-center">{{ quantity }}</span>
                <button @click="quantity++" class="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium">+</button>
              </div>
            </div>

            <!-- Add to Cart -->
            <div class="flex gap-4 mb-8">
              <button
                @click="handleAddToCart"
                :disabled="!product.inStock"
                class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart class="w-5 h-5" /> Add to Cart
              </button>
              <button class="border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"><Heart class="w-5 h-5" /></button>
              <button class="border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"><Share2 class="w-5 h-5" /></button>
            </div>

            <!-- Features -->
            <div class="grid grid-cols-3 gap-4 mb-8">
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <Leaf class="w-6 h-6 text-green-600 mx-auto mb-2" /><p class="text-xs font-medium">100% Natural</p>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <Truck class="w-6 h-6 text-green-600 mx-auto mb-2" /><p class="text-xs font-medium">24-48h Delivery</p>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <ShieldCheck class="w-6 h-6 text-green-600 mx-auto mb-2" /><p class="text-xs font-medium">Quality Assured</p>
              </div>
            </div>

            <!-- Full Description -->
            <div class="border-t pt-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
              <div class="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{{ product.fullDescription }}</div>
            </div>

            <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p class="text-sm text-yellow-800"><strong>Note:</strong> Available in Mumbai only (Delivered in 24-48 hours)</p>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div v-if="relatedProducts.length > 0" class="mt-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <NuxtLink v-for="rp in relatedProducts" :key="rp.id" :to="`/products/${rp.id}`" class="group">
              <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border">
                <div class="relative overflow-hidden h-64">
                  <img :src="rp.image" :alt="rp.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ rp.name }}</h3>
                  <p class="text-sm text-gray-600 mb-4">{{ rp.description }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-gray-900">₹{{ rp.price }}</span>
                    <span class="text-sm text-gray-500">{{ rp.weight }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
