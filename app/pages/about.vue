<script setup lang="ts">
import { Heart, Leaf, Users, TrendingUp } from 'lucide-vue-next'

useHead({ title: 'About Us - Unique Flavours' })
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-purple-50 to-purple-100 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p class="text-xl text-gray-600">Bringing you the purest flavors of nature while empowering tribal communities in Udaipur</p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1609252285522-ed0ebdd43551?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Tribal women farmers"
              class="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Empowering Communities, One Fruit at a Time</h2>
            <p class="text-lg text-gray-600 mb-6">TribalVeda was founded with a simple yet powerful mission: to bring authentic, farm-fresh fruit pulps to your table while supporting the livelihoods of tribal women farmers in Udaipur, Rajasthan.</p>
            <p class="text-lg text-gray-600 mb-6">We believe that the best products come from nature, untouched by artificial additives. That's why every product we offer is 100% natural, with no added sugar or preservatives – just pure, unadulterated goodness.</p>
            <p class="text-lg text-gray-600">By choosing TribalVeda, you're not just choosing quality; you're choosing to support sustainable farming practices and empower women entrepreneurs in rural India.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p class="text-lg text-gray-600">What drives us every day</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-md text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">100% Natural</h3>
            <p class="text-gray-600">We never compromise on purity. No artificial additives, no preservatives – just nature's best.</p>
          </div>
          <div class="bg-white rounded-xl p-8 shadow-md text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Social Impact</h3>
            <p class="text-gray-600">Every purchase directly supports tribal women farmers and their families.</p>
          </div>
          <div class="bg-white rounded-xl p-8 shadow-md text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Community First</h3>
            <p class="text-gray-600">We work hand-in-hand with local communities to ensure fair trade and sustainable practices.</p>
          </div>
          <div class="bg-white rounded-xl p-8 shadow-md text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Quality Excellence</h3>
            <p class="text-gray-600">From farm to your table, we maintain the highest standards of quality at every step.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="py-16 bg-green-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div><p class="text-4xl md:text-5xl font-bold mb-2">100+</p><p class="text-green-100">Farmers Supported</p></div>
          <div><p class="text-4xl md:text-5xl font-bold mb-2">100%</p><p class="text-green-100">Natural Products</p></div>
          <div><p class="text-4xl md:text-5xl font-bold mb-2">5000+</p><p class="text-green-100">Happy Customers</p></div>
          <div><p class="text-4xl md:text-5xl font-bold mb-2">24-48h</p><p class="text-green-100">Fast Delivery</p></div>
        </div>
      </div>
    </section>

    <!-- Commitment Section -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
        <p class="text-lg text-gray-600 mb-6">At TribalVeda, we promise to deliver only the finest quality products. Every batch is carefully inspected to ensure it meets our rigorous standards. We believe in transparency, which is why we're proud to share that our packaging may vary, but our quality never does.</p>
        <p class="text-lg text-gray-600">When you choose TribalVeda, you're choosing authenticity, sustainability, and a commitment to making a positive impact on the lives of tribal communities.</p>
      </div>
    </section>
  </div>
</template>
