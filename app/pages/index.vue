<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import {
  ArrowRight, Leaf, Heart, Truck, ShieldCheck, Star, CheckCircle2,
  Sprout, Globe, ChevronLeft, ChevronRight, Play, Zap, Users, Award,
  Package, TreePine, Quote, Gift, FlaskConical, Wheat, Cherry, Shield, Sparkles
} from 'lucide-vue-next'

const productStore = useProductStore()
const cartStore = useCartStore()
const { $swal } : any = useNuxtApp()

const handleAddToCart = (product: any) => {
  cartStore.addToCart(product, 1)
  $swal.toast('Added to cart', 'success', product.name)
}

onMounted(async () => {
  await productStore.fetchProducts()
  startHeroSlider()
  startMarquee()
  animateStats()
  startReviewSlider()
})

onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval)
  if (reviewInterval) clearInterval(reviewInterval)
})

const featuredProducts = computed(() => productStore.products.filter((p: any) => p.isFeatured))
const allProducts = computed(() => productStore.products)

// ─── ANNOUNCEMENT MARQUEE ──────────────────────────────────────────────────
const marqueeItems = [
  { icon: Leaf, text: '100% Natural & Preservative Free' },
  { icon: Truck, text: 'Free Delivery on Orders Above ₹499' },
  { icon: Wheat, text: 'Directly From Tribal Farmers' },
  { icon: Star, text: '2000+ Happy Customers' },
  { icon: Gift, text: 'Gift Packs Available' },
  { icon: FlaskConical, text: 'Lab Tested & FSSAI Certified' },
]

// ─── HERO SLIDER ──────────────────────────────────────────────────────────
const heroSlides = [
  {
    label: 'Pure from the Forest',
    title: 'Savor the Taste of',
    highlight: 'Pure Nature',
    subtitle: 'Experience 100% authentic, farm-fresh fruit pulps and natural wellness essentials. No chemicals, just raw goodness of the wild.',
    cta: 'Shop Now',
    bg: 'from-[#3D1D5F] to-[#50267C]',
    image: '/images/WhatsApp Image 2026-03-26 at 10.39.08 PM (1).jpeg',
  },
  {
    label: 'Empowering Communities',
    title: '15 Million+ Trees',
    highlight: 'Saved & Counting',
    subtitle: 'Every purchase supports tribal women farmers and helps reduce our carbon footprint across rural India.',
    cta: 'Our Mission',
    bg: 'from-[#4A7A20] to-[#749D3A]',
    image: '/images/WhatsApp Image 2026-03-26 at 10.39.09 PM (2).jpeg',
  },
  {
    label: 'Naturally Wellness',
    title: 'Wild Harvested',
    highlight: 'Tribal Goodness',
    subtitle: 'From Jamun pulps to Alphonso mangoes – each product is handpicked, cold-processed, and delivered to your doorstep fresh.',
    cta: 'Explore Products',
    bg: 'from-[#1A3A5F] to-[#2D6A9F]',
    image: '/images/WhatsApp Image 2026-03-26 at 10.39.10 PM (2).jpeg',
  },
]

const currentHeroSlide = ref(0)
let heroInterval: any = null

const startHeroSlider = () => {
  heroInterval = setInterval(() => {
    currentHeroSlide.value = (currentHeroSlide.value + 1) % heroSlides.length
  }, 5000)
}

const goToSlide = (i: number) => {
  currentHeroSlide.value = i
  clearInterval(heroInterval)
  startHeroSlider()
}

const marqueeStart = () => {}

// ─── CATEGORY QUICK LINKS ─────────────────────────────────────────────────
const categoryLinks = [
  { name: 'Fruit Pulps', icon: Cherry, href: '/products' },
  { name: 'Wellness', icon: Leaf, href: '/products' },
  { name: 'Immunity', icon: Shield, href: '/products' },
  { name: 'Combos', icon: Package, href: '/products' },
  { name: 'Gifting', icon: Sparkles, href: '/products' },
]

// ─── SHOP BY CONCERN TABS ─────────────────────────────────────────────────
const concerns = [
  { id: 'immunity', name: 'Immunity', icon: ShieldCheck, color: 'text-emerald-600' },
  { id: 'skincare', name: 'Skin Care', icon: Heart, color: 'text-pink-500' },
  { id: 'weightloss', name: 'Weight Loss', icon: Leaf, color: 'text-brand-green' },
  { id: 'digestion', name: 'Digestion', icon: Sprout, color: 'text-amber-600' },
]
const activeConcern = ref('immunity')

// ─── BENEFITS ─────────────────────────────────────────────────────────────
const benefits = [
  'Rich in Antioxidants', 'Immunity Boosting', 'Blood Sugar Support',
  'Heart Healthy', 'Digestive Aid', 'Weight Management',
  'Vitamin C Rich', 'Detoxifying', 'Anti-inflammatory', 'Energy Boosting'
]

// ─── IMPACT STATS ─────────────────────────────────────────────────────────
const impactStats = ref([
  { label: 'Trees Saved', current: 0, target: 15, suffix: 'M+', icon: TreePine },
  { label: 'Tribal Farmers', current: 0, target: 500, suffix: '+', icon: Users },
  { label: 'Happy Customers', current: 0, target: 2000, suffix: '+', icon: Award },
  { label: '100% Natural', current: 0, target: 100, suffix: '%', icon: CheckCircle2 },
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

// ─── REVIEWS ──────────────────────────────────────────────────────────────
const reviews = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai', rating: 5, comment: 'The Jamun pulp has become my morning ritual — I add it to smoothies and it tastes absolutely divine. Truly wild-harvested freshness!', image: 'https://i.pravatar.cc/150?u=priya' },
  { id: 2, name: 'Rahul Patel', location: 'Ahmedabad', rating: 5, comment: 'Alphonso Mango Pulp is pure liquid gold! No preservatives, real taste, delivered in perfect condition. Will always order from Unique Flavours.', image: 'https://i.pravatar.cc/150?u=rahul' },
  { id: 3, name: 'Anjali Desai', location: 'Pune', rating: 5, comment: 'Finally found 100% natural fruit pulps without chemicals. The Sitaphal pulp is out of this world — creamy and naturally sweet!', image: 'https://i.pravatar.cc/150?u=anjali' },
  { id: 4, name: 'Kiran Nair', location: 'Bangalore', rating: 5, comment: 'Buying from Unique Flavours means supporting tribal communities. The quality is exceptional and every purchase feels meaningful.', image: 'https://i.pravatar.cc/150?u=kiran' },
]

const currentReviewSlide = ref(0)
let reviewInterval: any = null

const startReviewSlider = () => {
  reviewInterval = setInterval(() => {
    currentReviewSlide.value = (currentReviewSlide.value + 1) % reviews.length
  }, 4000)
}

const storyImages = [
  '/images/WhatsApp Image 2026-03-26 at 10.39.07 PM.jpeg',
  '/images/WhatsApp Image 2026-03-26 at 10.39.08 PM.jpeg',
  '/images/WhatsApp Image 2026-03-26 at 10.39.09 PM (1).jpeg',
  '/images/WhatsApp Image 2026-03-26 at 10.39.09 PM.jpeg',
]

const startMarquee = () => {}

useHead({
  title: 'Unique Flavours | Pure & Natural Tribal Wellness',
  meta: [
    { name: 'description', content: 'Authentic 100% natural fruit pulps and wellness products sourced directly from tribal farmers. Jamun, Mango, Sitaphal pulps — no chemicals, just pure goodness.' }
  ]
})
</script>

<template>
  <div class="overflow-x-hidden">

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 1. ANNOUNCEMENT MARQUEE BAR -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div class="bg-brand-green text-white py-2 overflow-hidden relative border-b border-brand-green-dark/30">
      <div class="marquee-track flex whitespace-nowrap animate-marquee text-xs sm:text-sm font-medium tracking-normal">
        <span v-for="(item, i) in [...marqueeItems, ...marqueeItems, ...marqueeItems]" :key="i" class="mx-8 shrink-0 inline-flex items-center gap-2">
          <component :is="item.icon" class="w-4 h-4 opacity-90 shrink-0" stroke-width="1.75" />
          {{ item.text }}
        </span>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 2. HERO SLIDER -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="relative h-[600px] md:h-[680px] overflow-hidden">
      <!-- Slides -->
      <Transition name="hero-fade" mode="out-in">
        <div
          :key="currentHeroSlide"
          class="absolute inset-0 flex items-center"
          :class="`bg-gradient-to-r ${heroSlides[currentHeroSlide].bg}`"
        >
          <!-- Background image -->
          <div class="absolute inset-0 overflow-hidden">
            <img
              :src="heroSlides[currentHeroSlide].image"
              class="w-full h-full object-cover opacity-20 scale-105"
              alt="Hero background"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>

          <!-- Content -->
          <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div class="max-w-2xl">
              <span class="inline-flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
                <span class="w-8 h-px bg-white/60" />
                {{ heroSlides[currentHeroSlide].label }}
              </span>
              <h1 class="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6">
                {{ heroSlides[currentHeroSlide].title }}<br />
                <span class="text-brand-green">{{ heroSlides[currentHeroSlide].highlight }}</span>
              </h1>
              <p class="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                {{ heroSlides[currentHeroSlide].subtitle }}
              </p>
              <div class="flex flex-wrap items-center gap-4">
                <NuxtLink to="/products">
                  <button class="bg-white text-brand-purple px-8 py-4 rounded-full font-black text-base hover:bg-brand-green hover:text-white transition-all shadow-2xl flex items-center gap-2 group">
                    {{ heroSlides[currentHeroSlide].cta }}
                    <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </NuxtLink>
                <NuxtLink to="/about">
                  <button class="border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-base hover:border-white hover:bg-white/10 transition-all">
                    Learn More
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Slider Dots -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        <button
          v-for="(_, i) in heroSlides"
          :key="i"
          @click="goToSlide(i)"
          class="transition-all duration-300 rounded-full"
          :class="i === currentHeroSlide ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/70'"
        />
      </div>

      <!-- Bottom wave -->
      <div class="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 3. WELCOME + CATEGORY QUICK LINKS -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="bg-white py-16 -mt-1">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-3">Welcome to Unique Flavours</p>
        <h2 class="text-4xl md:text-5xl font-black text-brand-purple mb-5 leading-tight">
          Nature's Finest,<br />
          <span class="text-brand-green">Straight to Your Table</span>
        </h2>
        <p class="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-10">
          We are on a mission to connect you with authentic tribal produce. Pure fruit pulps, wellness essentials, and nature's goodness — handpicked, lab-tested, and delivered fresh.
        </p>
        <!-- Category Pill Links -->
        <div class="flex flex-wrap justify-center gap-3">
          <NuxtLink
            v-for="cat in categoryLinks"
            :key="cat.name"
            :to="cat.href"
            class="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-purple/20 text-brand-purple font-bold text-sm hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-sm hover:shadow-lg group"
          >
            <component :is="cat.icon" class="w-4 h-4 group-hover:text-white transition-colors" stroke-width="1.75" />
            {{ cat.name }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 4. FEATURED PROMO BANNER -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-10 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="relative bg-gradient-to-r from-[#EDE7F6] to-[#F3E5F5] rounded-3xl overflow-hidden p-10 md:p-14">
          <!-- Decorative circles -->
          <div class="absolute top-0 right-0 w-80 h-80 bg-brand-purple/5 rounded-full -mr-20 -mt-20" />
          <div class="absolute bottom-0 left-0 w-60 h-60 bg-brand-green/5 rounded-full -ml-20 -mb-20" />

          <div class="relative grid md:grid-cols-2 gap-10 items-center">
            <!-- Left content -->
            <div class="space-y-6">
              <span class="text-brand-purple/60 text-xs font-black uppercase tracking-widest">Bestselling Collection</span>
              <h2 class="text-4xl md:text-5xl font-black text-brand-purple leading-tight">
                Tribal Harvest<br />
                <span class="text-brand-green">Fruit Pulp Bundle</span>
              </h2>
              <p class="text-gray-600 font-medium text-lg leading-relaxed">
                Bring home the essence of the wild with our curated fruit pulp collection. Crafted from handpicked, high-quality fruits — each pack serves pure nourishment with zero additives.
              </p>
              <NuxtLink to="/products">
                <button class="bg-brand-purple text-white px-10 py-4 mt-4 rounded-full font-black text-base hover:bg-brand-purple-dark transition-all shadow-xl shadow-brand-purple/20 flex items-center gap-2 group w-fit">
                  ORDER NOW
                  <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </NuxtLink>
            </div>
            <!-- Right image -->
            <div class="relative flex justify-center">
              <div class="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white">
                <img
                  src="/images/WhatsApp Image 2026-03-26 at 10.39.10 PM (1).jpeg"
                  class="w-full h-full object-cover"
                  alt="Fruit Bundle"
                />
              </div>
              <!-- Floating badge -->
              <div class="absolute -top-4 -right-4 bg-brand-green text-white rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-widest shadow-xl rotate-6 inline-flex items-center gap-1.5">
                Best Seller <Star class="w-3.5 h-3.5 fill-white" stroke-width="1.75" />
              </div>
              <div class="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100">
                <p class="text-brand-purple font-black text-lg">₹380</p>
                <p class="text-gray-400 text-xs font-semibold">Starting from</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 5. SHOP BY CONCERN -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-gray-50/70">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-3">Curated For You</p>
          <h2 class="text-4xl md:text-5xl font-black text-brand-purple">Shop By Concern</h2>
        </div>

        <!-- Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="c in concerns"
            :key="c.id"
            @click="activeConcern = c.id"
            class="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all border-2"
            :class="activeConcern === c.id
              ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20'
              : 'bg-white text-gray-500 border-gray-200 hover:border-brand-purple/40'"
          >
            <component :is="c.icon" class="w-4 h-4" />
            {{ c.name }}
          </button>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="product in featuredProducts.slice(0, 4)"
            :key="product._id"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400"
          >
            <NuxtLink :to="`/products/${product._id}`">
              <div class="relative h-52 bg-brand-lavender/40 overflow-hidden">
                <img :src="productStore.formatImageUrl(product.images?.[0])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute top-3 left-3 bg-brand-green text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Natural</div>
              </div>
            </NuxtLink>
            <div class="p-5">
              <p class="text-[10px] text-brand-green font-black uppercase tracking-widest mb-1">UNIQUE FLAVOURS</p>
              <NuxtLink :to="`/products/${product._id}`">
                <h4 class="font-bold text-brand-purple text-sm leading-snug mb-3 hover:text-brand-green transition-colors line-clamp-2">{{ product.name }}</h4>
              </NuxtLink>
              <div class="flex items-center gap-1 mb-3">
                <Star v-for="i in 5" :key="i" class="w-3 h-3 text-yellow-400 fill-current" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-brand-purple font-black text-base">₹{{ product.price }}</span>
                <button
                  @click="handleAddToCart(product)"
                  class="border-2 border-brand-purple text-brand-purple text-[10px] font-black uppercase px-4 py-2 rounded-full hover:bg-brand-purple hover:text-white transition-all"
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 6. BESTSELLER SECTION -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-2">Top Picks</p>
            <h2 class="text-4xl md:text-5xl font-black text-brand-purple">
              Unique Flavours<br />
              <span class="text-brand-green">Bestsellers</span>
            </h2>
            <p class="text-gray-500 font-medium mt-3 max-w-md">Our most-loved collection of pure tribal fruit pulps — as voted by 2000+ customers.</p>
          </div>
          <NuxtLink to="/products">
            <button class="flex items-center gap-3 bg-brand-purple text-white pl-7 pr-3 py-3 rounded-full font-bold transition-all hover:bg-brand-purple-dark group shrink-0">
              View All Products
              <span class="bg-white p-2 rounded-full text-brand-purple group-hover:translate-x-0.5 transition-transform">
                <ArrowRight class="w-4 h-4" />
              </span>
            </button>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div
            v-for="product in allProducts.slice(0, 4)"
            :key="product._id"
            class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-400 hover:-translate-y-1"
          >
            <NuxtLink :to="`/products/${product._id}`">
              <div class="relative h-52 bg-brand-lavender/40 overflow-hidden">
                <img :src="productStore.formatImageUrl(product.images?.[0])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p class="text-white text-xs font-bold text-center">View Details →</p>
                </div>
              </div>
            </NuxtLink>
            <div class="p-5 text-center">
              <NuxtLink :to="`/products/${product._id}`">
                <h4 class="font-bold text-brand-purple text-sm leading-snug mb-2 hover:text-brand-green transition-colors line-clamp-2">{{ product.name }}</h4>
              </NuxtLink>
              <p class="text-brand-purple font-black text-lg mb-3">₹{{ product.price }}</p>
              <button
                @click="handleAddToCart(product)"
                class="w-full border-2 border-brand-purple/30 text-brand-purple text-[10px] font-black uppercase py-2.5 rounded-full hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all tracking-widest"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 7. IMPACT STATS RIBBON -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-16 bg-brand-purple relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <Leaf class="w-[600px] h-[600px] text-white absolute -right-32 -top-32 rotate-12" />
      </div>
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div v-for="stat in impactStats" :key="stat.label" class="space-y-2 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
            <div class="w-14 h-14 bg-white text-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <component :is="stat.icon" class="w-7 h-7" />
            </div>
            <h3 class="text-4xl md:text-5xl font-black tracking-tight">{{ stat.current }}{{ stat.suffix }}</h3>
            <p class="text-white/60 text-xs font-black uppercase tracking-widest">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 8. WHY OUR FRUITS ARE A SUPERFOOD -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-3">Science-Backed Benefits</p>
        <h2 class="text-4xl md:text-5xl font-black text-brand-purple mb-4">Why Our Fruits Are a Superfood</h2>
        <p class="text-gray-500 font-medium text-lg max-w-2xl mx-auto mb-12">
          These vibrant forest gems aren't just delicious — they're nutritional powerhouses with benefits that go beyond basic nutrition.
        </p>

        <!-- Benefit Pills -->
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="benefit in benefits"
            :key="benefit"
            class="px-5 py-2.5 rounded-full border-2 border-brand-purple/20 text-brand-purple text-sm font-bold hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all cursor-default"
          >
            {{ benefit }}
          </span>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 9. PRODUCT CATEGORY SPOTLIGHT: WELLNESS -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-3">Category Spotlight</p>
          <h2 class="text-4xl font-black text-brand-purple">Wellness Essentials</h2>
          <p class="text-gray-500 font-medium mt-2">Discover the essence of wellness from nature's finest produce</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div
            v-for="product in featuredProducts.slice(0, 4)"
            :key="`w-${product._id}`"
            class="group relative bg-brand-lavender/30 rounded-2xl overflow-hidden border border-brand-purple/5 hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
          >
            <div class="h-56 overflow-hidden">
              <img :src="productStore.formatImageUrl(product.images?.[0])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-5">
              <p class="text-[10px] text-brand-green font-black uppercase tracking-widest mb-1">UNIQUE FLAVOURS</p>
              <h4 class="font-bold text-brand-purple text-sm mb-2 line-clamp-2">{{ product.name }}</h4>
              <p class="text-brand-purple font-black text-base mb-4">₹{{ product.price }}</p>
              <button
                @click="handleAddToCart(product)"
                class="w-full border-2 border-brand-purple text-brand-purple text-[10px] font-black uppercase py-2.5 rounded-full hover:bg-brand-purple hover:text-white transition-all tracking-widest"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <NuxtLink to="/products">
            <button class="bg-brand-purple text-white px-10 py-4 rounded-full font-bold hover:bg-brand-purple-dark transition-all shadow-lg">
              Shop More →
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 10. INSIDER STORIES / GALLERY -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-3">Behind the Scenes</p>
          <h2 class="text-4xl font-black text-brand-purple">The Unique Flavours <span class="text-brand-green">Story</span></h2>
          <p class="text-gray-500 font-medium mt-2 max-w-xl mx-auto">A behind-the-scenes look at our harvesting process and the tribal communities making it possible.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(img, idx) in storyImages"
            :key="idx"
            class="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <img :src="img" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-brand-purple/80 via-transparent to-transparent flex flex-col justify-end p-5">
              <div class="bg-white/20 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:bg-brand-green transition-colors">
                <Play class="w-5 h-5 text-white ml-0.5 fill-current" />
              </div>
              <h4 class="text-white font-bold text-xs">Farm to Table — Episode {{ idx + 1 }}</h4>
              <p class="text-white/60 text-[10px] mt-0.5">Tribal harvest story</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 11. COMMUNITY SECTION -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left: Mission Content -->
          <div class="space-y-5">
            <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em]">Our Mission</p>
            <h2 class="text-4xl md:text-5xl font-black text-brand-purple leading-tight">
              Our Community,<br />
              <span class="text-brand-green">Our Purpose</span>
            </h2>

            <!-- Green intro card -->
            <div class="bg-brand-green/10 border border-brand-green/20 rounded-2xl p-6">
              <p class="text-brand-green font-bold text-sm leading-relaxed">
                At Unique Flavours, community wellbeing is at the heart of all we do. Our mission goes beyond business — we strive to uplift tribal and rural communities by creating sustainable livelihoods and nurturing the environment.
              </p>
            </div>

            <!-- Mission points card -->
            <div class="bg-brand-lavender rounded-2xl p-6 space-y-3">
              <div v-for="(point, i) in [
                'Empowering tribal women through local employment',
                'Promoting health through organic fruit-based nutrition',
                'Creating sustainable livelihood in remote villages',
                'Connecting farm produce directly to consumers',
                'Uplifting local economy with ethical practices',
              ]" :key="i" class="flex items-start gap-3">
                <Star class="w-4 h-4 text-brand-green fill-brand-green/20 shrink-0 mt-0.5" stroke-width="1.75" />
                <p class="text-brand-purple font-semibold text-sm">{{ point }}</p>
              </div>
            </div>

            <!-- Closing card -->
            <div class="bg-brand-green/10 border border-brand-green/20 rounded-2xl p-5">
              <p class="text-gray-600 font-medium text-sm leading-relaxed">
                Through a holistic approach, Unique Flavours has become a catalyst for positive change in the heartlands of India — connecting nature's bounty with modern homes.
              </p>
            </div>
          </div>

          <!-- Right: Image -->
          <div class="relative">
            <div class="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="/images/WhatsApp Image 2026-03-26 at 10.39.11 PM.jpeg"
                class="w-full h-full object-cover"
                alt="Our Community"
              />
            </div>
            <!-- Floating stats badges -->
            <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100">
              <p class="text-brand-purple font-black text-2xl">500+</p>
              <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Tribal Farmers</p>
            </div>
            <div class="absolute -top-6 -right-6 bg-brand-green rounded-2xl shadow-xl px-6 py-4">
              <p class="text-white font-black text-2xl">15M+</p>
              <p class="text-white/80 text-xs font-bold uppercase tracking-wider">Trees Saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 12. CUSTOMER REVIEWS -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-72 h-72 bg-brand-lavender rounded-full blur-3xl opacity-60 -mr-36 -mt-36" />
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12">
          <p class="text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-3">Voices of Our Tribe</p>
          <h2 class="text-4xl md:text-5xl font-black text-brand-purple">Let Customers Speak For Us</h2>
          <div class="flex items-center justify-center gap-2 mt-4">
            <div class="flex gap-0.5">
              <Star v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            <span class="text-gray-500 font-semibold text-sm">from 2,000+ reviews</span>
          </div>
        </div>

        <!-- Review Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
          >
            <Quote class="w-8 h-8 text-brand-purple/10 absolute top-4 right-4" />
            <div class="flex gap-0.5 mb-4">
              <Star v-for="i in review.rating" :key="i" class="w-4 h-4 text-yellow-400 fill-current" />
            </div>
            <p class="text-gray-600 text-sm font-medium leading-relaxed mb-5 line-clamp-4">
              "{{ review.comment }}"
            </p>
            <div class="flex items-center gap-3 pt-4 border-t border-gray-50">
              <img :src="review.image" class="w-10 h-10 rounded-full object-cover border-2 border-brand-lavender" :alt="review.name" />
              <div>
                <p class="font-black text-brand-purple text-sm">{{ review.name }}</p>
                <p class="text-brand-green text-[10px] font-bold uppercase tracking-widest">{{ review.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 13. FINAL CTA -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="py-24 relative bg-brand-purple overflow-hidden">
      <div class="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[120px] -ml-80" />
      <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px] -mr-80 -mb-80" />

      <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div class="w-20 h-20 bg-brand-green rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Leaf class="w-10 h-10 text-white" />
        </div>
        <h2 class="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
          Ready to Taste<br />
          <span class="text-brand-green underline decoration-wavy underline-offset-8">Pure Perfection?</span>
        </h2>
        <p class="text-xl text-white/70 font-medium mb-10 max-w-2xl mx-auto">
          Join thousands of health-conscious families choosing Unique Flavours. Get your first bundle with free delivery today.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <NuxtLink to="/products">
            <button class="bg-white hover:bg-gray-50 text-brand-purple px-12 py-5 rounded-full font-black text-lg shadow-2xl active:scale-95 transition-all">
              Shop Current Offers
            </button>
          </NuxtLink>
          <NuxtLink to="/contact">
            <button class="bg-transparent border-2 border-white/30 hover:border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
              Contact Our Team
            </button>
          </NuxtLink>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-6 text-white/50 text-xs font-black uppercase tracking-widest border-t border-white/10 pt-8">
          <span class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-brand-green" /> FSSAI Certified</span>
          <span class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-brand-green" /> 100% Secure Checkout</span>
          <span class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-brand-green" /> Easy Returns</span>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Hero Transition */
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 0.8s ease;
}
.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

/* Marquee */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
