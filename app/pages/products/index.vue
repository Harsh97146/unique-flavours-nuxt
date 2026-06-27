<script setup lang="ts">
import { Search, SlidersHorizontal, ChevronDown, Star, ArrowRight, Grid2x2, LayoutList, X, Leaf, Truck, FlaskConical, Wheat } from "lucide-vue-next";
import { useProductStore } from "~/stores/products";
import { useCartStore } from "~/stores/cart";

const productStore = useProductStore();
const cartStore = useCartStore();
const { $swal }: any = useNuxtApp();

onMounted(async () => {
  await productStore.fetchProducts();
});

useHead({
  title: "All Products – Unique Flavours | Pure & Natural",
  meta: [{ name: "description", content: "Browse our full range of 100% natural, tribal-sourced fruit pulps and wellness products. No preservatives, no chemicals — just pure goodness." }]
});

const selectedCategory = ref("All");
const sortBy = ref("featured");
const searchQuery = ref("");
const showFilters = ref(false);
const viewMode = ref<"grid" | "list">("grid");

const trustItems = [
  { icon: Leaf, title: '100% Natural', sub: 'No chemicals, ever' },
  { icon: Truck, title: 'Free Delivery', sub: 'On orders above ₹499' },
  { icon: FlaskConical, title: 'Lab Tested', sub: 'FSSAI Certified' },
  { icon: Wheat, title: 'Tribal Sourced', sub: '500+ farmer families' },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
];

const categories = computed(() => {
  const cats = ["All", ...new Set(productStore.products.map((p: any) => p.category))];
  return cats;
});

const filteredProducts = computed(() => {
  let filtered = [...productStore.products];

  if (selectedCategory.value !== "All") {
    filtered = filtered.filter((p: any) => p.category === selectedCategory.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter((p: any) =>
      p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    );
  }

  switch (sortBy.value) {
    case "price-asc":
      filtered.sort((a: any, b: any) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a: any, b: any) => b.price - a.price);
      break;
    case "name-asc":
      filtered.sort((a: any, b: any) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a: any, b: any) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return filtered;
});

const handleAddToCart = (product: any, e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  cartStore.addToCart(product, 1);
  $swal.toast("Added to cart", "success", product.name);
};

const currentSortLabel = computed(
  () => sortOptions.find((o) => o.value === sortBy.value)?.label ?? "Featured"
);
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 pb-24">

    <!-- ─── HERO BANNER ─────────────────────────────────────── -->
    <div class="relative bg-brand-purple overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl -mr-60 -mt-60" />
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -ml-40 -mb-40" />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span class="inline-flex items-center gap-2 bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/20 mb-6">
              <span class="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              Sourced Directly From Tribal Farmers
            </span>
            <h1 class="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-4">
              The Purest<br />
              <span class="text-brand-green">Tribal Flavours</span>
            </h1>
            <p class="text-white/70 text-lg font-medium max-w-xl">
              100% natural, hand-harvested fruit pulps and organic wellness essentials — straight from tribal forests to your doorstep.
            </p>
          </div>
        </div>
      </div>

      <!-- Wave bottom -->
      <div class="relative -mb-1">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 50L1440 50L1440 20C1200 50 960 0 720 20C480 40 240 0 0 20L0 50Z" fill="rgb(249 250 251 / 0.5)" />
        </svg>
      </div>
    </div>

    <!-- ─── OFFLINE BANNER ──────────────────────────────────── -->
    <div v-if="productStore.error" class="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
        <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
          <span class="text-amber-600 text-lg">⚠️</span>
        </div>
        <div class="flex-1">
          <p class="text-amber-900 font-bold text-sm">{{ productStore.error }}</p>
          <p class="text-amber-700/70 text-xs mt-0.5">Showing our curated offline selection.</p>
        </div>
        <button @click="productStore.fetchProducts()" class="bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-700 transition-all">
          Retry
        </button>
      </div>
    </div>

    <!-- ─── FILTERS + TOOLBAR ───────────────────────────────── -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 mt-8">

      <!-- Category Pills -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2"
          :class="selectedCategory === cat
            ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20'
            : 'bg-white text-gray-500 border-gray-200 hover:border-brand-purple/40 hover:text-brand-purple'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
        <p class="text-gray-500 text-sm font-medium">
          Showing <span class="text-brand-purple font-bold">{{ filteredProducts.length }}</span> product{{ filteredProducts.length !== 1 ? 's' : '' }}
          <span v-if="selectedCategory !== 'All'" class="ml-2 text-brand-green font-bold">in {{ selectedCategory }}</span>
        </p>

        <div class="flex items-center gap-3">
          <!-- View Toggle -->
          <div class="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="viewMode = 'grid'"
              class="p-2.5 transition-all"
              :class="viewMode === 'grid' ? 'bg-brand-purple text-white' : 'text-gray-400 hover:text-brand-purple'"
            >
              <Grid2x2 class="w-4 h-4" />
            </button>
            <button
              @click="viewMode = 'list'"
              class="p-2.5 transition-all"
              :class="viewMode === 'list' ? 'bg-brand-purple text-white' : 'text-gray-400 hover:text-brand-purple'"
            >
              <LayoutList class="w-4 h-4" />
            </button>
          </div>

          <!-- Sort Dropdown -->
          <div class="relative">
            <select
              v-model="sortBy"
              class="appearance-none bg-white border-2 border-gray-200 text-sm font-bold text-brand-purple pl-4 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-brand-purple cursor-pointer"
            >
              <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- ─── PRODUCT GRID ──────────────────────────────────── -->
      <div v-if="filteredProducts.length > 0">

        <!-- Grid View -->
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
        >
          <div
            v-for="product in filteredProducts"
            :key="product._id"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400"
          >
            <!-- Image -->
            <NuxtLink :to="`/products/${product._id}`" class="block">
              <div class="relative overflow-hidden bg-brand-lavender/30 aspect-square">
                <img
                  :src="productStore.formatImageUrl(product.images?.[0])"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <!-- Badges -->
                <div class="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span v-if="product.isFeatured" class="bg-brand-green text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                    Best Seller
                  </span>
                  <span v-if="product.stock === 0" class="bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                    Sold Out
                  </span>
                </div>
                <!-- Hover overlay -->
                <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <button
                    @click="handleAddToCart(product, $event)"
                    class="w-full bg-brand-purple text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-brand-purple-dark transition-all"
                    :disabled="product.stock === 0"
                  >
                    {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
                  </button>
                </div>
              </div>
            </NuxtLink>

            <!-- Info -->
            <div class="p-4">
              <p class="text-[9px] text-brand-green font-black uppercase tracking-widest mb-1">{{ product.category }}</p>
              <NuxtLink :to="`/products/${product._id}`">
                <h3 class="font-bold text-brand-purple text-sm leading-snug mb-2 hover:text-brand-green transition-colors line-clamp-2">
                  {{ product.name }}
                </h3>
              </NuxtLink>
              <div class="flex items-center gap-1 mb-3">
                <Star v-for="i in 5" :key="i" class="w-3 h-3 text-yellow-400 fill-current" />
                <span class="text-[10px] text-gray-400 font-semibold ml-1">4.9</span>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-brand-purple font-black text-base">₹{{ product.price }}</span>
                  <span v-if="product.shippingCost === 0" class="ml-2 text-[9px] text-brand-green font-bold">Free Ship</span>
                </div>
                <NuxtLink :to="`/products/${product._id}`">
                  <button class="w-8 h-8 bg-brand-lavender text-brand-purple rounded-lg flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">
                    <ArrowRight class="w-4 h-4" />
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="product in filteredProducts"
            :key="product._id"
            class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 flex gap-0"
          >
            <NuxtLink :to="`/products/${product._id}`" class="w-36 md:w-52 shrink-0 block">
              <div class="relative h-full overflow-hidden bg-brand-lavender/30">
                <img
                  :src="productStore.formatImageUrl(product.images?.[0])"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </NuxtLink>
            <div class="flex-1 p-5 md:p-6 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p class="text-[9px] text-brand-green font-black uppercase tracking-widest mb-1">{{ product.category }}</p>
                    <NuxtLink :to="`/products/${product._id}`">
                      <h3 class="font-bold text-brand-purple text-lg leading-snug hover:text-brand-green transition-colors">
                        {{ product.name }}
                      </h3>
                    </NuxtLink>
                  </div>
                  <span v-if="product.isFeatured" class="shrink-0 bg-brand-green text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Best Seller</span>
                </div>
                <p class="text-gray-500 text-sm font-medium line-clamp-2 mb-3">{{ product.description }}</p>
                <div class="flex items-center gap-1">
                  <Star v-for="i in 5" :key="i" class="w-3.5 h-3.5 text-yellow-400 fill-current" />
                  <span class="text-xs text-gray-400 font-semibold ml-1">4.9 (50+ reviews)</span>
                </div>
              </div>
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <div>
                  <span class="text-brand-purple font-black text-xl">₹{{ product.price }}</span>
                  <span v-if="product.shippingCost > 0" class="text-gray-400 text-xs font-medium ml-2">+ ₹{{ product.shippingCost }} shipping</span>
                  <span v-else class="text-brand-green text-xs font-bold ml-2">Free Delivery</span>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    @click="handleAddToCart(product, $event)"
                    class="border-2 border-brand-purple text-brand-purple text-[10px] font-black uppercase px-5 py-2.5 rounded-full hover:bg-brand-purple hover:text-white transition-all tracking-widest"
                    :disabled="product.stock === 0"
                  >
                    {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
                  </button>
                  <NuxtLink :to="`/products/${product._id}`">
                    <button class="bg-brand-lavender text-brand-purple text-[10px] font-black uppercase px-5 py-2.5 rounded-full hover:bg-brand-purple hover:text-white transition-all tracking-widest">
                      View Details
                    </button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── EMPTY STATE ───────────────────────────────────── -->
      <div v-else class="py-32 text-center">
        <div class="w-24 h-24 bg-brand-lavender rounded-full flex items-center justify-center mx-auto mb-6">
          <Search class="w-10 h-10 text-brand-purple/30" />
        </div>
        <h2 class="text-3xl font-black text-brand-purple tracking-tight mb-3">No Products Found</h2>
        <p class="text-gray-400 font-medium mb-8 max-w-sm mx-auto">
          No products match your current search or filter. Try clearing filters.
        </p>
        <div class="flex items-center justify-center gap-3">
          <button @click="selectedCategory = 'All'; searchQuery = ''" class="bg-brand-purple text-white px-8 py-3 rounded-full font-bold hover:bg-brand-purple-dark transition-all">
            Clear All Filters
          </button>
        </div>
      </div>

    </div>

    <!-- ─── TRUST STRIP ──────────────────────────────────────── -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
      <div class="bg-brand-purple rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
        <div v-for="item in trustItems" :key="item.title" class="flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <component :is="item.icon" class="w-5 h-5" stroke-width="1.75" />
          </div>
          <p class="font-semibold text-sm">{{ item.title }}</p>
          <p class="text-white/60 text-xs">{{ item.sub }}</p>
        </div>
      </div>
    </div>

  </div>
</template>
