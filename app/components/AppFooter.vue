<script setup lang="ts">
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-brand-lavender pt-20 pb-10 border-t border-brand-purple/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <!-- Brand -->
        <div class="space-y-6">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-sm ring-1 ring-gray-100">
              <img src="~/assets/Images/logo.png" alt="Logo" class="w-full h-full object-contain" />
            </div>
            <div>
              <span class="text-xl font-extrabold text-brand-purple tracking-tight leading-none block uppercase">Unique Flavours</span>
              <span class="text-[10px] font-semibold text-brand-green uppercase tracking-widest mt-0.5 block">Pure & Natural</span>
            </div>
          </NuxtLink>
          <p class="text-gray-600 text-sm leading-relaxed max-w-xs">
            Bringing you the purest, 100% natural fruit pulps directly from tribal women farmers in Udaipur. No sugar, no preservatives, just nature.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">
              <Facebook class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">
              <Youtube class="w-4 h-4" />
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

        <!-- Categories -->
        <div>
          <h4 class="text-brand-purple font-bold text-lg mb-6 uppercase tracking-wider">Top Sellers</h4>
          <ul class="space-y-4 text-sm font-medium text-gray-600">
            <li><NuxtLink to="/products" class="hover:text-brand-purple transition-colors">Natural Mango Pulp</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-brand-purple transition-colors">Pure Jamun Wellness</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-brand-purple transition-colors">Frozen Fruit Treats</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-brand-purple transition-colors">Healthy Breakfast Mix</NuxtLink></li>
          </ul>
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

