<script setup lang="ts">
import {
  Star, Minus, Plus, ShoppingCart, ChevronDown, ChevronRight,
  Leaf, ShieldCheck, CheckCircle, MessageCircle, ArrowLeft,
  HelpingHand, Zap, MapPin, Quote, Package
} from "lucide-vue-next";
import { useProductStore } from "~/stores/products";
import { useCartStore } from "~/stores/cart";

const route = useRoute();
const productStore = useProductStore();
const cart = useCartStore();
const { $swal }: any = useNuxtApp();

const product = ref<any>(null);
const loading = ref(true);
const quantity = ref(1);
const selectedBundle = ref<any>(null);
const reviews = ref<any[]>([]);
const activeAccordion = ref<string | null>(null);
const selectedImageIndex = ref(0);
const activeTab = ref("description");
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const fetchReviews = async () => {
  try {
    const res: any = await $fetch(`${apiBaseUrl}/api/reviews/product/${route.params.id}`);
    if (res.success) reviews.value = res.data;
  } catch { /* silent */ }
};

onMounted(async () => {
  if (productStore.products.length === 0) await productStore.fetchProducts();
  product.value = await productStore.fetchProduct(route.params.id as string);
  fetchReviews();
  loading.value = false;

  window.addEventListener("scroll", () => {
    const sticky = document.getElementById("sticky-cart");
    if (sticky) {
      sticky.style.transform = window.scrollY > 600 ? "translateY(0)" : "translateY(100%)";
    }
  });
});

const selectedImage = computed(
  () => product.value?.images[selectedImageIndex.value] || product.value?.images[0]
);

const availableBundles = computed(() =>
  (product.value?.bundles || [])
    .filter((b: any) => b?.size && b?.price)
    .sort((a: any, b: any) => a.size - b.size)
);

const currentPrice = computed(() => {
  if (selectedBundle.value) return selectedBundle.value.price;
  return (product.value?.price || 0) * quantity.value;
});

const handleAddToCart = () => {
  if (!product.value) return;
  const itemToAdd = {
    ...product.value,
    price: selectedBundle.value
      ? selectedBundle.value.price / (selectedBundle.value.size || 1)
      : product.value.price,
    name: selectedBundle.value
      ? `${product.value.name} (Pack of ${selectedBundle.value.size})`
      : product.value.name,
  };
  const qty = selectedBundle.value ? selectedBundle.value.size : quantity.value;
  cart.addToCart(itemToAdd, qty);
  // Track bundleSize on the cart item for accurate shipping weight calculation
  if (selectedBundle.value) {
    const cartItem = cart.items.find(i => i.product._id === itemToAdd._id);
    if (cartItem) cartItem.bundleSize = selectedBundle.value.size;
  }
  $swal.toast("Added to cart", "success", product.value.name);
};

const handleBuyNow = () => {
  handleAddToCart();
  navigateTo("/cart");
};

const trustBadges = [
  { icon: Leaf, label: "100% Organic" },
  { icon: ShieldCheck, label: "Lab Tested" },
  { icon: CheckCircle, label: "No Added Sugar" },
  { icon: HelpingHand, label: "Tribal Handpicked" },
  { icon: Zap, label: "Natural Energy" },
];

const relatedProducts = computed(() =>
  productStore.products
    .filter((p: any) => p.category === product.value?.category && p._id !== product.value?._id)
    .slice(0, 4)
);

const faqs = [
  { q: "How long can I store this product?", a: "Our products have a shelf life of 12 months when stored in a cool, dry place. Once opened, consume within 30 days for best flavour." },
  { q: "Is it safe for diabetic patients?", a: "Yes, 100%! Our pulps and products have zero added sugar and are traditionally known to help manage blood sugar levels. Always consult your doctor." },
  { q: "Where do these fruits come from?", a: "Sourced directly from the tribal forests of Rajasthan, hand-harvested by local tribal community members and women farmers." },
  { q: "Do you offer bulk or combo orders?", a: "Yes! We have bundle packs available. Check our combo offers or contact us directly at hello@uniqueflavours.com for bulk pricing." },
];


useHead(() => ({
  title: product.value ? `${product.value.name} – Unique Flavours` : "Product – Unique Flavours",
  meta: [{ name: "description", content: product.value?.description || "Pure tribal wellness product." }],
}));
</script>

<template>
  <div class="min-h-screen bg-white">

    <!-- Loading Spinner -->
    <div v-if="loading" class="min-h-screen fixed inset-0 flex items-center justify-center bg-white z-[60]">
      <div class="w-14 h-14 border-4 border-brand-lavender border-t-brand-purple rounded-full animate-spin" />
    </div>

    <template v-else-if="product">

      <!-- ─── BREADCRUMBS ─────────────────────────────────── -->
      <div class="bg-gray-50 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav class="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <NuxtLink to="/" class="hover:text-brand-purple transition-colors">Home</NuxtLink>
            <ChevronRight class="w-3.5 h-3.5" />
            <NuxtLink to="/products" class="hover:text-brand-purple transition-colors">All Products</NuxtLink>
            <ChevronRight class="w-3.5 h-3.5" />
            <span class="text-brand-purple font-bold truncate max-w-[200px]">{{ product.name }}</span>
          </nav>
        </div>
      </div>

      <!-- ─── MAIN PRODUCT SECTION ─────────────────────────── -->
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">

          <!-- LEFT: Image Gallery (col 1–5) -->
          <div class="lg:col-span-5">
            <!-- Thumbnail strip + Main image layout (like Tribalveda) -->
            <div class="flex gap-3">
              <!-- Vertical thumbnails -->
              <div v-if="product.images?.length > 1" class="flex flex-col gap-2.5 w-16 shrink-0">
                <button
                  v-for="(img, idx) in product.images"
                  :key="idx"
                  @click="selectedImageIndex = idx"
                  class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all"
                  :class="selectedImageIndex === idx
                    ? 'border-brand-purple shadow-md'
                    : 'border-gray-100 opacity-60 hover:opacity-100'"
                >
                  <img :src="productStore.formatImageUrl(img)" class="w-full h-full object-cover" />
                </button>
              </div>

              <!-- Main Image -->
              <div class="flex-1 relative bg-brand-lavender/30 rounded-2xl overflow-hidden aspect-square shadow-sm border border-gray-100">
                <img
                  :src="productStore.formatImageUrl(selectedImage)"
                  :alt="product.name"
                  class="w-full h-full object-cover transition-all duration-500"
                />
                <!-- Stock badge -->
                <div class="absolute top-4 left-4">
                  <span
                    v-if="product.stock > 0"
                    class="bg-brand-green text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  >In Stock</span>
                  <span
                    v-else
                    class="bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  >Sold Out</span>
                </div>
                <!-- Category label -->
                <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-brand-purple text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {{ product.category }}
                </div>
              </div>
            </div>

            <!-- Mobile horizontal thumbnails -->
            <div v-if="product.images?.length > 1" class="flex gap-2 mt-3 lg:hidden overflow-x-auto no-scrollbar">
              <button
                v-for="(img, idx) in product.images"
                :key="idx"
                @click="selectedImageIndex = idx"
                class="w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all"
                :class="selectedImageIndex === idx ? 'border-brand-purple' : 'border-gray-100 opacity-60'"
              >
                <img :src="productStore.formatImageUrl(img)" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- RIGHT: Purchase Info (col 6–12) -->
          <div class="lg:col-span-7 space-y-7">

            <!-- Brand + Title -->
            <div>
              <p class="text-[10px] text-brand-green font-black uppercase tracking-[0.3em] mb-2">UNIQUE FLAVOURS</p>
              <h1 class="text-3xl md:text-4xl font-black text-brand-purple leading-tight tracking-tight mb-4">
                {{ product.name }}
              </h1>

              <!-- Stars -->
              <div class="flex items-center gap-3 mb-4">
                <div class="flex gap-0.5">
                  <Star v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <span class="text-sm text-gray-500 font-semibold">4.9 · {{ reviews.length }} reviews</span>
                <a href="#reviews" class="text-xs text-brand-green font-bold hover:underline">Read reviews →</a>
              </div>

              <!-- Price -->
              <div class="flex items-baseline gap-4">
                <span class="text-3xl font-black text-brand-green">₹{{ currentPrice }}</span>
                <span class="text-base text-gray-400 line-through font-semibold">₹{{ Math.round(currentPrice * 1.25) }}</span>
                <span class="bg-brand-green/10 text-brand-green text-xs font-black px-3 py-1 rounded-full">20% OFF</span>
              </div>
            </div>

            <!-- Trust Badges (like reference) -->
            <div class="flex flex-wrap gap-3 py-5 border-y border-gray-100">
              <div
                v-for="badge in trustBadges"
                :key="badge.label"
                class="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-100"
              >
                <div class="w-6 h-6 text-brand-green">
                  <component :is="badge.icon" class="w-full h-full stroke-[1.5]" />
                </div>
                <span class="text-[10px] font-black text-gray-600 uppercase tracking-wider">{{ badge.label }}</span>
              </div>
            </div>

            <!-- Short Description -->
            <p class="text-gray-600 font-medium leading-relaxed text-[15px]">
              {{ product.description }}
            </p>

            <!-- Bundle Selection -->
            <div v-if="availableBundles.length > 0" class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-black uppercase tracking-[0.2em] text-brand-purple">Bundle Offers</h3>
                <button v-if="selectedBundle" @click="selectedBundle = null" class="text-[10px] font-bold text-gray-400 hover:text-brand-purple transition-colors">
                  Use single quantity
                </button>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="bundle in availableBundles"
                  :key="`${bundle.size}-${bundle.price}`"
                  @click="selectedBundle = bundle"
                  class="rounded-xl border-2 px-4 py-3 text-left transition-all"
                  :class="selectedBundle?.size === bundle.size && selectedBundle?.price === bundle.price
                    ? 'border-brand-purple bg-brand-lavender/40 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-brand-purple/40'"
                >
                  <p class="text-[9px] uppercase tracking-widest font-black text-gray-500">Pack of {{ bundle.size }}</p>
                  <p class="text-lg font-black text-brand-green">₹{{ bundle.price }}</p>
                </button>
              </div>
            </div>

            <!-- Quantity + Actions -->
            <div class="space-y-3">
              <p class="text-xs font-black uppercase tracking-widest text-gray-500">Quantity</p>
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <!-- Qty Stepper -->
                <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-fit">
                  <button
                    @click="selectedBundle = null; quantity = Math.max(1, quantity - 1)"
                    class="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Minus class="w-4 h-4" />
                  </button>
                  <span class="w-12 text-center font-black text-lg text-brand-purple">{{ quantity }}</span>
                  <button
                    @click="selectedBundle = null; quantity++"
                    class="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Plus class="w-4 h-4" />
                  </button>
                </div>

                <!-- CTA Buttons -->
                <div class="flex gap-3 flex-1">
                  <button
                    @click="handleAddToCart"
                    :disabled="product.stock === 0"
                    class="flex-1 h-12 border-2 border-brand-purple text-brand-purple font-black uppercase text-xs tracking-widest rounded-xl hover:bg-brand-purple hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                  <button
                    @click="handleBuyNow"
                    :disabled="product.stock === 0"
                    class="flex-1 h-12 bg-brand-purple text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-brand-purple-dark transition-all shadow-lg shadow-brand-purple/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Buy It Now
                  </button>
                </div>
              </div>
            </div>

            <!-- Special Offers Row -->
            <div class="bg-brand-lavender/40 rounded-2xl p-4 flex items-center gap-3 border border-brand-purple/10">
              <Package class="w-8 h-8 text-brand-purple shrink-0" />
              <div>
                <p class="text-xs font-black text-brand-purple uppercase tracking-wider">Special Offer</p>
                <p class="text-sm font-medium text-gray-600 mt-0.5">Use code <span class="text-brand-green font-black">SAVE10</span> — Get 5% off on orders above ₹1000</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ─── PRODUCT DETAIL TABS ───────────────────────────── -->
      <div class="border-t border-gray-100 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <!-- Tab Nav -->
          <div class="flex gap-0 border-b border-gray-200">
            <button
              v-for="tab in [
                { id: 'description', label: 'Product Detail' },
                { id: 'benefits', label: 'Benefits' },
                { id: 'faq', label: 'FAQs' },
              ]"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-8 py-5 font-bold text-sm transition-all border-b-2"
              :class="activeTab === tab.id
                ? 'text-brand-purple border-brand-purple'
                : 'text-gray-400 border-transparent hover:text-brand-purple'"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="py-12">

            <!-- Description Tab -->
            <div v-if="activeTab === 'description'" class="grid md:grid-cols-2 gap-12 items-start">
              <div class="space-y-6">
                <h2 class="text-2xl font-black text-brand-purple">About This Product</h2>
                <p class="text-gray-600 leading-relaxed font-medium text-[15px]">{{ product.description }}</p>

                <!-- Product meta -->
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="item in [
                    { label: 'Category', value: product.category },
                    { label: 'Stock', value: product.stock > 0 ? `${product.stock} units` : 'Out of stock' },
                    { label: 'Product Code', value: product.productCode || 'UF-' + product._id.slice(-4).toUpperCase() },
                    { label: 'Delivery', value: product.shippingCost === 0 ? 'Free' : `₹${product.shippingCost}` },
                  ]" :key="item.label" class="bg-white rounded-xl border border-gray-100 p-4">
                    <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">{{ item.label }}</p>
                    <p class="text-brand-purple font-black text-sm">{{ item.value }}</p>
                  </div>
                </div>
              </div>

              <!-- Side image -->
              <div class="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] md:aspect-square">
                <img
                  :src="productStore.formatImageUrl(product.images?.[0])"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <!-- Connection Notes (inside Description tab) -->
            <div v-if="activeTab === 'description' && product.connectionNotes?.length" class="mt-10 max-w-2xl">
              <h3 class="text-lg font-black text-brand-purple mb-4 uppercase tracking-wide">🌿 Connection Notes</h3>
              <ul class="space-y-3">
                <li
                  v-for="(note, idx) in product.connectionNotes"
                  :key="idx"
                  class="flex items-start gap-3 bg-white border border-brand-purple/10 rounded-2xl px-5 py-4"
                >
                  <span class="w-6 h-6 flex-shrink-0 rounded-full bg-brand-lavender flex items-center justify-center text-brand-purple font-black text-xs">{{ idx + 1 }}</span>
                  <span class="text-gray-700 font-medium text-sm leading-relaxed">{{ note }}</span>
                </li>
              </ul>
            </div>

            <!-- Benefits Tab -->
            <div v-if="activeTab === 'benefits'" class="max-w-3xl">
              <h2 class="text-2xl font-black text-brand-purple mb-4">Key Benefits</h2>

              <!-- Use real keyBenefits from product if available -->
              <template v-if="product.keyBenefits?.length">
                <ul class="space-y-4">
                  <li
                    v-for="(benefit, idx) in product.keyBenefits"
                    :key="idx"
                    class="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm"
                  >
                    <span class="w-8 h-8 flex-shrink-0 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <CheckCircle class="w-4 h-4 text-brand-green" />
                    </span>
                    <span class="text-gray-700 font-medium text-[15px] leading-relaxed">{{ benefit }}</span>
                  </li>
                </ul>
              </template>

              <!-- Fallback if no keyBenefits set -->
              <template v-else>
                <p class="text-gray-400 font-medium text-sm">No key benefits listed for this product yet.</p>
              </template>
            </div>

            <!-- FAQ Tab -->
            <div v-if="activeTab === 'faq'" class="max-w-3xl space-y-3">
              <div
                v-for="(faq, idx) in faqs"
                :key="idx"
                class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <button
                  @click="activeAccordion = activeAccordion === faq.q ? null : faq.q"
                  class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span class="text-sm font-bold text-gray-700">{{ faq.q }}</span>
                  <ChevronDown class="w-5 h-5 text-brand-purple transition-transform duration-300 shrink-0"
                    :class="{ 'rotate-180': activeAccordion === faq.q }"
                  />
                </button>
                <Transition name="accordion">
                  <div v-if="activeAccordion === faq.q" class="px-6 pb-6 text-sm text-gray-500 font-medium leading-relaxed">
                    {{ faq.a }}
                  </div>
                </Transition>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ─── SUPERFOOD / BENEFITS PURPLE BANNER ────────────── -->
      <div class="bg-brand-purple py-20 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -top-20 -right-20 w-[500px] h-[500px] bg-white rounded-full blur-[100px]" />
        </div>
        <div class="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p class="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Science-Backed</p>
          <h2 class="text-4xl md:text-5xl font-black mb-4">Why Our Fruits Are a Superfood</h2>
          <p class="text-white/70 font-medium max-w-xl mx-auto mb-12 text-lg">
            These vibrant purple gems aren't just delicious — they're nutritional powerhouses with benefits that go beyond basic nutrition.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <span
              v-for="benefit in benefits"
              :key="benefit"
              class="px-6 py-2.5 bg-white/10 backdrop-blur rounded-full text-xs font-black uppercase tracking-widest border border-white/20 hover:bg-white hover:text-brand-purple transition-all cursor-default"
            >
              {{ benefit }}
            </span>
          </div>
        </div>
      </div>

      <!-- ─── WHY UNIQUE FLAVOURS ─────────────────────────── -->
      <div class="py-16 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div v-for="item in [
              { icon: Leaf, title: 'Purely Organic', desc: 'No chemicals or pesticides' },
              { icon: MapPin, title: 'Udaipur Roots', desc: 'Sourced from tribal forests' },
              { icon: ShieldCheck, title: 'Lab Tested', desc: 'Rigorous quality checks' },
              { icon: HelpingHand, title: 'Social Impact', desc: 'Empowering tribal women' },
            ]" :key="item.title" class="group space-y-3">
              <div class="w-14 h-14 bg-brand-lavender text-brand-purple rounded-2xl flex items-center justify-center mx-auto group-hover:bg-brand-purple group-hover:text-white transition-all shadow-sm">
                <component :is="item.icon" class="w-7 h-7" />
              </div>
              <h4 class="text-xs font-black uppercase tracking-widest text-brand-purple">{{ item.title }}</h4>
              <p class="text-[11px] text-gray-400 font-medium">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── RELATED PRODUCTS ────────────────────────────── -->
      <div v-if="relatedProducts.length > 0" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="text-center mb-12">
            <p class="text-brand-green text-[10px] font-black uppercase tracking-[0.3em] mb-2">You May Also Like</p>
            <h2 class="text-4xl font-black text-brand-purple">Related Products</h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div
              v-for="rp in relatedProducts"
              :key="rp._id"
              class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
            >
              <NuxtLink :to="`/products/${rp._id}`" class="block">
                <div class="relative h-48 overflow-hidden bg-brand-lavender/30">
                  <img :src="productStore.formatImageUrl(rp.images?.[0])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" :alt="rp.name" />
                </div>
              </NuxtLink>
              <div class="p-4">
                <p class="text-[9px] text-brand-green font-black uppercase tracking-widest mb-1">{{ rp.category }}</p>
                <NuxtLink :to="`/products/${rp._id}`">
                  <h4 class="font-bold text-brand-purple text-sm leading-snug mb-2 hover:text-brand-green transition-colors line-clamp-2">{{ rp.name }}</h4>
                </NuxtLink>
                <div class="flex items-center justify-between">
                  <span class="text-brand-purple font-black">₹{{ rp.price }}</span>
                  <button
                    @click="cart.addToCart(rp, 1); $swal.toast('Added to cart', 'success', rp.name)"
                    class="border-2 border-brand-purple/30 text-brand-purple text-[9px] font-black uppercase px-3 py-1.5 rounded-full hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── REVIEWS ──────────────────────────────────────── -->
      <div id="reviews" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p class="text-brand-green text-[10px] font-black uppercase tracking-[0.3em] mb-2">Customer Feedback</p>
              <h2 class="text-4xl font-black text-brand-purple">Let Customers Speak</h2>
            </div>
            <div class="flex items-center gap-4 bg-brand-lavender rounded-2xl px-6 py-4 border border-brand-purple/10">
              <div class="flex gap-0.5">
                <Star v-for="i in 5" :key="i" class="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <span class="text-brand-purple font-black text-sm">{{ reviews.length }} Verified Reviews</span>
            </div>
          </div>

          <!-- No reviews -->
          <div v-if="reviews.length === 0" class="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Quote class="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p class="text-gray-400 font-medium italic">"This product is awaiting its first review."</p>
          </div>

          <!-- Review Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="review in reviews"
              :key="review._id"
              class="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 relative"
            >
              <Quote class="w-8 h-8 text-brand-purple/10 absolute top-4 right-4" />
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center text-white font-black text-sm overflow-hidden shrink-0">
                  <span v-if="!review.user?.image">{{ review.user?.name?.charAt(0) }}</span>
                  <img v-else :src="review.user.image" class="w-full h-full object-cover" />
                </div>
                <div>
                  <p class="font-black text-brand-purple text-sm">{{ review.user?.name }}</p>
                  <div class="flex gap-0.5 mt-0.5">
                    <Star v-for="i in 5" :key="i" class="w-3 h-3"
                      :class="i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'" />
                  </div>
                </div>
              </div>
              <p class="text-gray-600 text-sm font-medium leading-relaxed line-clamp-4">"{{ review.comment }}"</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── STICKY ADD TO CART BAR ───────────────────────── -->
      <div
        id="sticky-cart"
        class="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur border-t border-gray-100 shadow-2xl z-40 transition-transform duration-500 translate-y-full hidden lg:block"
      >
        <div class="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-8">
          <div class="flex items-center gap-4">
            <img :src="productStore.formatImageUrl(product.images?.[0])" class="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0" />
            <div>
              <h4 class="text-xs font-black text-brand-purple uppercase tracking-wider line-clamp-1">{{ product.name }}</h4>
              <span class="text-lg font-black text-brand-green">₹{{ currentPrice }}</span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center bg-gray-50 rounded-xl h-11 border border-gray-200 overflow-hidden">
              <button @click="quantity = Math.max(1, quantity - 1)" class="px-3 h-full hover:bg-gray-100 transition-colors">
                <Minus class="w-3.5 h-3.5 text-gray-400" />
              </button>
              <span class="w-10 text-center font-black text-sm text-brand-purple">{{ quantity }}</span>
              <button @click="quantity++" class="px-3 h-full hover:bg-gray-100 transition-colors">
                <Plus class="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <button
              @click="handleAddToCart"
              class="px-10 h-11 bg-brand-purple text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-brand-purple/20 hover:bg-brand-purple-dark transition-all active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </template>

    <!-- Not Found -->
    <div v-else class="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div class="w-20 h-20 bg-brand-lavender rounded-full flex items-center justify-center">
        <span class="text-3xl">🌿</span>
      </div>
      <h2 class="text-3xl font-black text-brand-purple">Product Not Found</h2>
      <p class="text-gray-400 font-medium">This product doesn't exist or has been removed.</p>
      <NuxtLink to="/products">
        <button class="bg-brand-purple text-white px-8 py-3 rounded-full font-bold hover:bg-brand-purple-dark transition-all">
          Browse All Products
        </button>
      </NuxtLink>
    </div>

  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.accordion-enter-active, .accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
