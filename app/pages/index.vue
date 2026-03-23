<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ArrowRight, Leaf, Heart, Truck, ShieldCheck, Star, Play, CheckCircle2, Sprout, Globe, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { products } from '~/data/products'

const featuredProducts = products.filter((p) => p.featured)


const concerns = [
  { id: 1, name: 'Immunity', icon: ShieldCheck },
  { id: 2, name: 'Skin Care', icon: Heart },
  { id: 3, name: 'Weight Loss', icon: Leaf },
  { id: 4, name: 'Digestion', icon: Sprout },
]

const activeConcern = ref('Immunity')

const reviews = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai', rating: 5, comment: "The Jamun frozen fruit has become my family's favorite breakfast snack. It feels so pure and revitalizing to know it's 100% natural.", image: 'https://i.pravatar.cc/150?u=priya' },
  { id: 2, name: 'Rahul Patel', location: 'Ahmedabad', rating: 5, comment: 'Absolutely love the mango pulp! It\'s so pure and natural, tastes just like fresh Alphanzo mangoes.', image: 'https://i.pravatar.cc/150?u=rahul' },
  { id: 3, name: 'Anjali Desai', location: 'Pune', rating: 5, comment: 'Finally found 100% natural fruit pulps without any chemicals! The Jamun health benefits are real.', image: 'https://i.pravatar.cc/150?u=anjali' },
]

const currentReviewIndex = ref(0)
const nextReview = () => {
  currentReviewIndex.value = (currentReviewIndex.value + 1) % reviews.length
}
const prevReview = () => {
  currentReviewIndex.value = (currentReviewIndex.value - 1 + reviews.length) % reviews.length
}

const currentReview = computed(() => {
  return reviews[currentReviewIndex.value] || reviews[0]
})

let reviewInterval: any = null
const impactStats = ref([
  { label: 'Trees Saved', current: 0, target: 15, suffix: ' Million+', icon: Leaf },
  { label: 'Farmers Empowered', current: 0, target: 500, suffix: '+', icon: Heart },
  { label: 'Natural Products', current: 0, target: 100, suffix: '%', icon: CheckCircle2 },
])

const animateStats = () => {
  impactStats.value.forEach((stat) => {
    const duration = 2000
    const steps = 60
    const increment = stat.target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.target) {
        stat.current = stat.target
        clearInterval(timer)
      } else {
        stat.current = Math.floor(current)
      }
    }, duration / steps)
  })
}

onMounted(() => {
  animateStats()
  reviewInterval = setInterval(() => {
    nextReview()
  }, 3000)
})

onUnmounted(() => {
  if (reviewInterval) clearInterval(reviewInterval)
})

useHead({ 
  title: 'Unique Flavours | Pure & Natural Tribal Wellness',
  meta: [
    { name: 'description', content: 'Authentic 100% natural fruit pulps and wellness products sourced directly from tribal farmers.' }
  ]
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Hero Slider Section -->
    <section class="relative bg-brand-lavender min-h-[600px] flex items-center pt-8 pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-7 z-10 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div class="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ring-1 ring-brand-green/20">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              Directly from tribal farmers
            </div>
            
            <h1 class="text-5xl md:text-7xl font-extrabold text-brand-purple leading-[1.1]">
              Savor the Taste <br/>
              <span class="text-brand-green">of Pure Nature</span>
            </h1>
            
            <p class="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed font-medium">
              Experience 100% authentic, farm-fresh fruit pulps and natural wellness essentials. No chemicals, just the raw goodness of the wild.
            </p>
            
            <div class="flex flex-wrap items-center gap-6">
              <NuxtLink to="/products">
                <button class="bg-brand-purple hover:bg-brand-purple-dark text-white px-10 py-5 rounded-brand-lg font-bold text-lg shadow-xl shadow-brand-purple/20 flex items-center gap-3 active:scale-95 transition-all">
                  Shop Best-Sellers <ArrowRight class="w-6 h-6" />
                </button>
              </NuxtLink>
              <div class="flex -space-x-3 overflow-hidden">
                <img v-for="i in 3" :key="i" class="inline-block h-12 w-12 rounded-full ring-4 ring-white object-cover" :src="`https://i.pravatar.cc/150?u=${i}`" alt="" />
                <div class="flex items-center justify-center h-12 w-12 rounded-full ring-4 ring-white bg-brand-green text-white text-xs font-bold">+2k</div>
              </div>
              <p class="text-sm font-bold text-brand-purple/60 uppercase tracking-wider">Trusted by 2000+ Customers</p>
            </div>
          </div>
          
          <!-- Image Content -->
          <div class="lg:col-span-5 relative group animate-in fade-in zoom-in-95 duration-700">
            <div class="absolute -inset-4 bg-brand-purple/5 rounded-[40px] rotate-3 group-hover:rotate-1 transition-transform border border-brand-purple/10"></div>
            <div class="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] md:aspect-square">
              <img 
                src="/images/hero-banner.png" 
                alt="Natural Fruit Delights" 
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-purple/40 to-transparent"></div>
              
              <!-- Floating Badge -->
              <div class="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-brand shadow-xl border border-white animate-bounce-slow">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white shadow-lg">
                    <Globe class="w-6 h-6" />
                  </div>
                  <div>
                    <h4 class="text-xl font-extrabold text-brand-purple">100%</h4>
                    <p class="text-[10px] font-bold text-brand-green uppercase tracking-widest">Global Purity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Welcome Section (About Preview) -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <img src="/images/strawberry-pulp.jpg" class="rounded-3xl h-64 w-full object-cover mt-12 shadow-2xl border-4 border-white" alt="Fresh Strawberry Pulp" />
              <img src="/images/tribal-farming.png" class="rounded-3xl h-80 w-full object-cover -mt-12 shadow-2xl border-4 border-white" alt="Tribal Farming" />
            </div>
            <!-- Trust Badge -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-green/20 backdrop-blur-sm rounded-full flex items-center justify-center p-4">
              <div class="w-full h-full bg-brand-green text-white rounded-full flex flex-col items-center justify-center text-center p-2 shadow-2xl">
                <span class="text-2xl font-black">15+</span>
                <span class="text-[8px] font-bold uppercase tracking-widest">Years of Trust</span>
              </div>
            </div>
          </div>
          
          <div class="space-y-8">
            <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em] mb-2 px-1 border-l-4 border-brand-green ml-1">Welcome to Tribalveda</h2>
            <h3 class="text-4xl md:text-5xl font-extrabold text-brand-purple leading-tight">
              Honest Nutrition <br/>
              <span class="text-gray-400">Pure Joy of Life</span>
            </h3>
            <p class="text-lg text-gray-600 leading-relaxed font-medium">
              We started with a simple mission: to bridge the gap between pure tribal wisdom and modern wellness. Every product you buy directly impacts the lives of over 500 tribal women farmers.
            </p>
            
            <div class="grid grid-cols-2 gap-6 pt-4">
              <div class="flex items-start gap-4 p-4 rounded-brand bg-brand-lavender/50 border border-brand-purple/5">
                <Leaf class="w-6 h-6 text-brand-green shrink-0" />
                <div>
                  <h4 class="font-bold text-brand-purple text-sm">Organically Grown</h4>
                  <p class="text-xs text-gray-500 mt-1">Sourced from wild forests</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-brand bg-brand-lavender/50 border border-brand-purple/5">
                <ShieldCheck class="w-6 h-6 text-brand-green shrink-0" />
                <div>
                  <h4 class="font-bold text-brand-purple text-sm">Lab Tested</h4>
                  <p class="text-xs text-gray-500 mt-1">100% Purity guaranteed</p>
                </div>
              </div>
            </div>
            
            <NuxtLink to="/about">
              <button class="flex items-center gap-3 font-bold text-brand-purple group border-b-2 border-brand-purple/10 py-2 hover:border-brand-purple transition-all">
                Learn our unique processing <ArrowRight class="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop By Concern Section -->
    <section class="py-24 bg-brand-lavender/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em]">Curated For You</h2>
          <h3 class="text-4xl md:text-5xl font-extrabold text-brand-purple">Shop By Concern</h3>
        </div>
        
        <!-- Tabs -->
        <div class="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          <button 
            v-for="con in concerns" :key="con.id" 
            @click="activeConcern = con.name"
            :class="[
              'px-8 py-4 rounded-brand-lg font-bold text-sm uppercase tracking-wider transition-all shadow-sm border flex items-center gap-3',
              activeConcern === con.name 
                ? 'bg-brand-purple text-white border-brand-purple shadow-brand-purple/20 -translate-y-1' 
                : 'bg-white text-gray-500 border-gray-100 hover:bg-white hover:shadow-md'
            ]"
          >
            <component :is="con.icon" class="w-5 h-5" />
            {{ con.name }}
          </button>
        </div>

        <!-- Featured Products for Concern -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="product in featuredProducts.slice(0, 4)" :key="product.id" class="group bg-white rounded-brand-lg overflow-hidden border border-gray-100 shadow-brand hover-lift transition-all duration-500">
            <NuxtLink :to="`/products/${product.id}`">
              <div class="relative h-64 overflow-hidden">
                <img :src="product.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Product" />
                <div class="absolute top-4 right-4 group-hover:rotate-12 transition-transform">
                  <div class="bg-brand-green text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">New Arrival</div>
                </div>
              </div>
            </NuxtLink>
            <div class="p-6 space-y-4 text-center">
              <div class="inline-flex gap-1">
                <Star v-for="i in 5" :key="i" class="w-3 h-3 text-yellow-500 fill-current" />
              </div>
              <NuxtLink :to="`/products/${product.id}`">
                <h4 class="font-bold text-brand-purple text-lg leading-tight group-hover:text-brand-green transition-colors">{{ product.name }}</h4>
              </NuxtLink>
              <div class="flex items-center justify-center gap-4 border-t border-gray-50 pt-4">
                <span class="text-2xl font-black text-brand-purple">₹{{ product.price }}</span>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest line-through">₹{{ Math.round(product.price * 1.4) }}</span>
              </div>
              <button class="w-full bg-brand-lavender text-brand-purple font-bold py-3 rounded-brand text-xs uppercase tracking-widest group-hover:bg-brand-purple group-hover:text-white transition-all">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Ribbon -->
    <section class="py-12 bg-brand-green overflow-hidden relative">
      <div class="absolute inset-0 opacity-10 flex justify-center items-center pointer-events-none">
        <Leaf class="w-[500px] h-[500px] text-white rotate-12" />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
          <div v-for="item in impactStats" :key="item.label" class="space-y-2 group">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <component :is="item.icon" class="w-8 h-8" />
            </div>
            <h4 class="text-4xl font-extrabold">{{ item.current }}{{ item.suffix }}</h4>
            <p class="text-xs font-bold uppercase tracking-[0.3em] opacity-80">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bestseller Section -->
    <section class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div class="space-y-4 max-w-xl">
            <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em]">Pure Indulgence</h2>
            <h3 class="text-4xl md:text-5xl font-extrabold text-brand-purple">Shark's Bestseller Bundle</h3>
            <p class="text-gray-600 font-medium">As seen on national TV! Our most loved collection of pure tribal delights that keep you healthy and energized.</p>
          </div>
          <NuxtLink to="/products">
            <button class="group flex items-center gap-4 bg-brand-purple text-white pl-8 pr-2 py-2 rounded-full font-bold transition-all hover:bg-brand-purple-dark">
              Explore All <span class="bg-white p-2 rounded-full text-brand-purple ml-2 group-hover:translate-x-1 transition-transform"><ArrowRight class="w-5 h-5" /></span>
            </button>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <NuxtLink v-for="product in featuredProducts.slice(0, 3)" :key="product.id" :to="`/products/${product.id}`" class="group relative bg-brand-lavender/30 rounded-[40px] p-8 hover:bg-brand-purple/5 transition-all duration-500 overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
            
            <div class="relative space-y-6">
              <div class="aspect-square rounded-brand-lg overflow-hidden shadow-xl ring-1 ring-black/5">
                <img :src="product.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="space-y-2">
                <h4 class="text-2xl font-extrabold text-brand-purple tracking-tight">{{ product.name }}</h4>
                <p class="text-sm text-gray-500 line-clamp-2 font-medium">{{ product.description }}</p>
              </div>
              <div class="flex items-center justify-between pt-4">
                <span class="text-3xl font-black text-brand-purple">₹{{ product.price }}</span>
                <span class="text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-4 py-2 rounded-full">{{ product.weight }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Visual Story / Instagram Feed Placeholder -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 space-y-4">
        <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em]">Our Daily Journey</h2>
        <h3 class="text-4xl font-extrabold text-brand-purple">Follow Our Tribal Story</h3>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-8 no-scrollbar px-4 sm:px-10">
        <div v-for="i in 5" :key="i" class="min-w-[280px] h-[500px] relative rounded-brand-lg overflow-hidden group shadow-lg">
          <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-purple/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <div class="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-green transition-colors">
              <Play class="w-6 h-6 text-white ml-1 fill-current" />
            </div>
            <h4 class="text-white font-bold text-sm">Farm to Wellness Episode {{ i }}</h4>
            <p class="text-white/70 text-xs mt-1">12k Views • 2 days ago</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-gray-50/50 relative overflow-hidden">
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-lavender rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl opacity-50 -ml-48 -mb-48"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em]">Voices of our Tribe</h2>
          <h3 class="text-4xl md:text-5xl font-extrabold text-brand-purple">Real Stories, Real Trust</h3>
        </div>

        <div class="relative max-w-5xl mx-auto">
          <!-- Main Testimonial Card -->
          <div class="bg-white rounded-[40px] md:rounded-[60px] shadow-2xl shadow-brand-purple/5 p-8 md:p-20 border border-brand-purple/5 relative overflow-hidden min-h-[450px] flex items-center justify-center">
            
            <!-- Floating Quote Icon -->
            <div class="absolute top-10 left-10 text-brand-purple/5">
              <svg class="w-20 h-20 md:w-32 md:h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>

            <Transition name="fade" mode="out-in">
              <div v-if="currentReview" :key="currentReviewIndex" class="relative z-10 w-full">
                <div class="flex flex-col items-center text-center space-y-8 md:space-y-12">
                  <!-- Rating -->
                  <div class="flex gap-1.5">
                    <Star v-for="i in 5" :key="i" :class="['w-5 h-5 md:w-6 md:h-6', i <= currentReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-200']" />
                  </div>
                  
                  <!-- Quote -->
                  <blockquote class="text-xl md:text-3xl font-extrabold text-brand-purple leading-relaxed max-w-3xl mx-auto tracking-tight italic">
                    "{{ currentReview.comment }}"
                  </blockquote>
                  
                  <!-- Author -->
                  <div class="flex flex-col items-center gap-4 pt-4">
                    <div class="relative">
                      <div class="absolute inset-0 bg-brand-green/20 rounded-full blur-lg"></div>
                      <img :src="currentReview.image" class="relative w-24 h-24 rounded-full border-4 border-brand-lavender shadow-xl object-cover" :alt="currentReview.name" />
                    </div>
                    <div class="text-center">
                      <h4 class="text-xl md:text-2xl font-black text-brand-purple">{{ currentReview.name }}</h4>
                      <div class="flex items-center justify-center gap-2 mt-1">
                        <span class="w-1.5 h-1.5 bg-brand-green rounded-full"></span>
                        <p class="text-sm font-bold text-brand-green uppercase tracking-widest">{{ currentReview.location }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Discrete Navigation Buttons -->
          <div class="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-20">
            <button @click="prevReview" class="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-50 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all transform hover:scale-110 active:scale-95 group">
              <ChevronLeft class="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div class="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-20">
            <button @click="nextReview" class="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-50 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all transform hover:scale-110 active:scale-95 group">
              <ChevronRight class="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <!-- Pagination Progress Dots -->
          <div class="flex justify-center gap-3 mt-12">
            <button 
              v-for="(_, i) in reviews" 
              :key="i" 
              @click="currentReviewIndex = i"
              class="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
              :class="currentReviewIndex === i ? 'w-12 bg-brand-purple' : 'w-2 bg-gray-200 hover:bg-brand-purple/30'"
            >
              <div 
                v-if="currentReviewIndex === i"
                class="absolute inset-0 bg-brand-green/50 animate-progress-mini"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-24 relative bg-brand-purple overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[120px] -ml-96"></div>
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-purple-light/20 rounded-full blur-[120px] -mr-96 -mb-96"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center space-y-10 max-w-3xl mx-auto">
          <div class="w-20 h-20 bg-brand-green rounded-3xl rotate-12 flex items-center justify-center mx-auto shadow-2xl">
            <Leaf class="w-10 h-10 text-white" />
          </div>
          <h2 class="text-4xl md:text-6xl font-black text-white leading-tight">
            Ready to taste <br /> 
            <span class="text-brand-green underline decoration-wavy underline-offset-8">pure perfection?</span>
          </h2>
          <p class="text-xl text-brand-lavender/80 font-medium">
            Join thousands of health-conscious Indians choosing Tribalveda. Get your first immunity bundle with free delivery today.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <NuxtLink to="/products">
              <button class="bg-white hover:bg-gray-100 text-brand-purple px-12 py-5 rounded-brand-lg font-black text-lg shadow-2xl active:scale-95 transition-all">
                Shop Current Offers
              </button>
            </NuxtLink>
            <NuxtLink to="/contact">
              <button class="bg-transparent border-2 border-white/20 hover:border-white text-white px-10 py-5 rounded-brand-lg font-black text-lg hover:bg-white/5 transition-all">
                Contact Our Team
              </button>
            </NuxtLink>
          </div>
          <div class="pt-6 flex items-center justify-center gap-8 border-t border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest">
            <span class="flex items-center gap-2 px-2"><CheckCircle2 class="w-4 h-4 text-brand-green" /> FSAAI Certified</span>
            <span class="flex items-center gap-2 px-2"><CheckCircle2 class="w-4 h-4 text-brand-green" /> 100% Secure Checkout</span>
            <span class="flex items-center gap-2 px-2"><CheckCircle2 class="w-4 h-4 text-brand-green" /> Easy Returns</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes progress-mini {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
.animate-progress-mini {
  animation: progress-mini 3s linear infinite;
}
</style>

