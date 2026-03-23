<script setup lang="ts">
import { Search, SlidersHorizontal } from 'lucide-vue-next'
import { products, categories } from '~/data/products'

useHead({ title: 'Products - Unique Flavours' })

const searchQuery = ref('')
const selectedCategory = ref('All Products')
const sortBy = ref('featured')

const filteredProducts = computed(() => {
  let filtered = [...products]
  if (selectedCategory.value !== 'All Products') {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  if (sortBy.value === 'price-low') filtered.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-high') filtered.sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name))
  return filtered
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p class="text-lg text-gray-600">Pure, natural fruit pulps from farm to your table</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24">
            <div class="flex items-center gap-2 mb-6">
              <SlidersHorizontal class="w-5 h-5 text-gray-600" />
              <h2 class="font-semibold text-lg">Filters</h2>
            </div>
            <div class="mb-6">
              <h3 class="font-medium text-sm text-gray-700 mb-3">Category</h3>
              <div class="space-y-2">
                <button
                  v-for="category in categories"
                  :key="category"
                  @click="selectedCategory = category"
                  :class="['w-full text-left px-4 py-2 rounded-lg transition-colors', selectedCategory === category ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-600 hover:bg-gray-100']"
                >
                  {{ category }}
                </button>
              </div>
            </div>
            <div class="mb-6">
              <h3 class="font-medium text-sm text-gray-700 mb-3">Price Range</h3>
              <p class="text-sm text-gray-600">₹380 - ₹520</p>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Search and Sort -->
          <div class="bg-white rounded-lg p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>
              <select v-model="sortBy" class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700 w-full md:w-48">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <p class="text-sm text-gray-600 mb-6">Showing {{ filteredProducts.length }} products</p>

          <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink v-for="product in filteredProducts" :key="product.id" :to="`/products/${product.id}`" class="group">
              <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div class="relative overflow-hidden h-64">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div v-if="product.inStock" class="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">In Stock</div>
                </div>
                <div class="p-6">
                  <p class="text-sm text-green-600 font-medium mb-2">{{ product.category }}</p>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>
                  <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-gray-900">₹{{ product.price }}</span>
                    <span class="text-sm text-gray-500">{{ product.weight }}</span>
                  </div>
                  <button class="w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg font-medium transition-colors">View Details</button>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="bg-white rounded-lg p-12 text-center">
            <p class="text-lg text-gray-600 mb-4">No products found matching your criteria</p>
            <button @click="searchQuery = ''; selectedCategory = 'All Products'" class="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
