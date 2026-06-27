<script setup lang="ts">
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-vue-next'
import { useProductStore } from '~/stores/products'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchTopSellers()
})

const topSellers = computed(() => productStore.topSellers)
</script>

<template>
  <footer class="bg-brand-lavender pt-20 pb-10 border-t border-brand-purple/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Newsletter Section -->
      <div class="mb-20 bg-brand-purple rounded-[40px] p-8 md:p-14 relative overflow-hidden shadow-2xl">
        <div class="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div class="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">Stay Pure, Stay Informed</h3>
            <p class="text-brand-lavender/70 font-medium">Join 5000+ healthy families and get exclusive offers, tribal stories, and wellness tips.</p>
          </div>
          <div class="relative">
            <input type="email" placeholder="Enter your email address" class="w-full h-16 px-8 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green outline-none font-medium pr-40 transition-all" />
            <button class="absolute right-2 top-2 bottom-2 bg-brand-green hover:bg-brand-green-dark text-white px-8 rounded-xl font-bold shadow-lg transition-all active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <!-- Brand -->
        <div class="space-y-6">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 shadow-md ring-1 ring-gray-100 group-hover:scale-110 transition-transform">
              <img src="~/assets/Images/logo.png" alt="Logo" class="w-full h-full object-contain" />
            </div>
            <div>
              <span class="text-xl font-black text-brand-purple tracking-tight leading-none block uppercase">Unique Flavours</span>
              <span class="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em] mt-0.5 block">Pure & Natural</span>
            </div>
          </NuxtLink>
          <p class="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
            Empowering 500+ tribal women farmers while delivering 100% natural fruit pulps to your home.
          </p>
          <div class="flex gap-4 pt-2">
            <a v-for="(icon, idx) in [Instagram, Facebook, Youtube, Twitter]" :key="idx" href="#" class="w-11 h-11 bg-white shadow-sm border border-gray-50 rounded-2xl flex items-center justify-center hover:bg-brand-purple hover:text-white hover:shadow-brand-hover hover:-translate-y-1 transition-all">
              <component :is="icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-brand-purple font-bold text-lg mb-6 uppercase tracking-wider">Explore</h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/" class="text-gray-600 hover:text-brand-purple font-medium text-sm transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/products" class="text-gray-600 hover:text-brand-purple font-medium text-sm transition-colors">All Products</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-600 hover:text-brand-purple font-medium text-sm transition-colors">Our Story</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-600 hover:text-brand-purple font-medium text-sm transition-colors">Contact Us</NuxtLink></li>
          </ul>
        </div>

        <!-- Top Sellers -->
        <div>
          <h4 class="text-brand-purple font-bold text-lg mb-6 uppercase tracking-wider">Top Sellers</h4>
          <ul v-if="topSellers.length > 0" class="space-y-4 text-sm font-medium text-gray-600">
            <li v-for="product in topSellers" :key="product._id">
              <NuxtLink
                :to="`/products/${product._id}`"
                class="hover:text-brand-purple transition-colors line-clamp-2"
              >
                {{ product.name }}
              </NuxtLink>
            </li>
          </ul>
          <p v-else-if="!productStore.topSellersLoading" class="text-sm text-gray-400">
            No featured products yet.
          </p>
          <p v-else class="text-sm text-gray-400 animate-pulse">Loading...</p>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-brand-purple font-bold text-lg mb-6 uppercase tracking-wider">Get In Touch</h4>
          <ul class="space-y-5">
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-brand-purple/5 flex items-center justify-center shrink-0">
                <Mail class="w-4 h-4 text-brand-purple" />
              </div>
              <span class="text-gray-600 text-sm font-medium">hello@uniqueflavours.com</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-brand-purple/5 flex items-center justify-center shrink-0">
                <Phone class="w-4 h-4 text-brand-purple" />
              </div>
              <span class="text-gray-600 text-sm font-medium">+91 98765 43210</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-brand-purple/5 flex items-center justify-center shrink-0">
                <MapPin class="w-4 h-4 text-brand-purple" />
              </div>
              <span class="text-gray-600 text-sm font-medium leading-relaxed">Mumbai, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-brand-purple/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
        <p>© {{ new Date().getFullYear() }} Unique Flavours. All rights reserved.</p>
        <div class="flex gap-8">
          <a href="#" class="hover:text-brand-purple transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-brand-purple transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

