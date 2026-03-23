<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { ShoppingCart, Menu, X, ChevronDown, ChevronRight, Search, User } from "lucide-vue-next";
import { useCartStore } from "~/stores/cart";
import { categories, products } from "~/data/products";

const cart = useCartStore();
const mobileMenuOpen = ref(false);
const route = useRoute();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Products", path: "/products" },
  { name: "Our Story", path: "/about" },
  { name: "Contact", path: "/contact" },
];

</script>

<template>
  <header class="sticky top-0 z-50">
    <!-- Announcement Bar -->
    <div class="bg-brand-green text-white text-center py-2 px-4 text-sm font-medium">
      <p>🌿 100% Natural & Fresh | Support Tribal Farmers | Free Delivery in Mumbai</p>
    </div>

    <!-- Main Navigation -->
    <nav class="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20 md:h-24">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 shrink-0 group">
            <div class="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-gray-100">
              <img src="~/assets/Images/logo.png" alt="Unique Flavours Logo" class="w-full h-full object-contain" />
            </div>
            <div class="hidden sm:block">
              <span class="text-xl md:text-2xl font-extrabold text-brand-purple tracking-tight leading-none block">Unique Flavours</span>
              <span class="text-[10px] md:text-xs font-semibold text-brand-green uppercase tracking-widest mt-0.5 block">Pure & Natural</span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-8 xl:gap-10 flex-1 justify-center h-full">
            <template v-for="link in navLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                :class="[
                  'font-semibold text-sm uppercase tracking-wide transition-all border-b-2 py-8',
                  route.path === link.path
                    ? 'text-brand-purple border-brand-purple'
                    : 'text-gray-700 border-transparent hover:text-brand-purple hover:border-brand-purple/30',
                ]"
              >
                {{ link.name }}
              </NuxtLink>
            </template>
          </div>

          <!-- Icons -->
          <div class="flex items-center gap-2 md:gap-4 shrink-0">
            <button class="p-2 text-gray-600 hover:text-brand-purple transition-colors">
              <Search class="w-5 h-5" />
            </button>
            <button class="p-2 text-gray-600 hover:text-brand-purple transition-colors">
              <User class="w-5 h-5" />
            </button>
            <NuxtLink to="/cart">
              <button
                class="relative p-2 text-gray-600 hover:text-brand-purple transition-colors group"
              >
                <ShoppingCart class="w-5 h-5" />
                <span
                  v-if="cart.totalItems > 0"
                  class="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white"
                >
                  {{ cart.totalItems }}
                </span>
              </button>
            </NuxtLink>

            <!-- Mobile Menu Button -->
            <button class="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" @click="mobileMenuOpen = !mobileMenuOpen">
              <X v-if="mobileMenuOpen" class="w-6 h-6" />
              <Menu v-else class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <div v-if="mobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 max-h-[calc(100vh-120px)] overflow-y-auto z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
          <div class="px-4 py-6">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="mobileMenuOpen = false"
              :class="[
                'block py-4 px-4 font-bold transition-colors rounded-xl mb-2 text-lg',
                route.path === link.path ? 'bg-brand-lavender text-brand-purple shadow-sm' : 'text-gray-800 hover:bg-gray-50',
              ]"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Mobile Backdrop -->
      <div 
        v-if="mobileMenuOpen" 
        class="lg:hidden fixed inset-0 top-[124px] bg-black/30 w-full h-[calc(100vh-124px)] z-40 backdrop-blur-[2px]" 
        @click="mobileMenuOpen = false"
      ></div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-active {
  color: #50267C;
}
</style>

