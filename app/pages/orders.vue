<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ShoppingBag, Package, ChevronRight, Clock, MapPin, Truck, CheckCircle2, XCircle, Star } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import { useProductStore } from '~/stores/products'

const auth = useAuthStore()
const productStore = useProductStore()
const route = useRoute()
const { $swal }: any = useNuxtApp()
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseUrl

const orders = ref<any[]>([])
const myReviews = ref<any[]>([])
const loading = ref(true)

// Review Modal State
const showReviewModal = ref(false)
const selectedProductForReview = ref<any>(null)

const isProductReviewed = (productId: string) => {
  return myReviews.value.some(r => r.product === productId)
}

const fetchMyReviews = async () => {
  if (!auth.token) return
  try {
    const res: any = await $fetch(`${apiBaseUrl}/api/reviews/mine`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    if (res.success) {
      myReviews.value = res.data
    }
  } catch (err) {
    console.error('Failed to fetch my reviews:', err)
  }
}

const openReviewModal = (product: any) => {
  selectedProductForReview.value = {
    id: product._id,
    name: product.name,
    image: product.images?.[0]
  }
  showReviewModal.value = true
}

const onReviewSuccess = async () => {
  showReviewModal.value = false
  await fetchMyReviews() // Re-fetch to hide the button
}

onMounted(async () => {
  // Ensure we wait for auth to fetch from cookie
  if (!auth.token) {
    await auth.fetchUser()
  }

  if (!auth.token) {
    auth.modalMode = 'login'
    auth.showLoginModal = true
    navigateTo('/')
    return
  }
  
  fetchMyReviews()

  // Handle Order Placed Popup
  if (route.query.placed === 'true') {
    $swal.alert('Order placed', 'Your order has been placed and is being prepared for delivery.', 'success')
    // Clear query param
    navigateTo('/orders', { replace: true })
  }
  
  try {
    const response: any = await $fetch(`${apiBaseUrl}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    orders.value = response.data
  } catch (err) {
    console.error('Failed to fetch orders:', err)
  } finally {
    loading.value = false
  }
})

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'PAID': return 'bg-green-100 text-green-700 border-green-200'
    case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200'
    case 'FAILED': return 'bg-red-100 text-red-700 border-red-200'
    case 'DELIVERED': return 'bg-brand-lavender text-brand-purple border-brand-purple/20'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

useHead({ title: 'My Orders - Unique Flavours' })
</script>

<template>
  <div class="user-panel min-h-screen bg-gray-50/50 pb-32">
    <!-- Header -->
    <div class="bg-white border-b border-gray-100 pt-32 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <span class="user-panel-icon bg-brand-lavender text-brand-purple w-12 h-12 rounded-xl">
            <ShoppingBag class="w-6 h-6" stroke-width="1.75" />
          </span>
          <div>
            <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">Your Orders</h1>
            <p class="text-sm text-gray-500 mt-0.5">Track and manage your order history</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="loading" class="space-y-6">
        <div v-for="i in 3" :key="i" class="h-48 bg-white rounded-[40px] animate-pulse border border-gray-100"></div>
      </div>

      <div v-else-if="orders.length === 0" class="bg-white rounded-[48px] p-20 text-center border border-gray-100 shadow-xl shadow-brand-purple/5 max-w-2xl mx-auto">
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Package class="w-12 h-12 text-gray-200" />
        </div>
        <h2 class="text-3xl font-black text-brand-purple italic tracking-tight mb-4">No Flavours Here Yet</h2>
        <p class="text-gray-400 font-medium mb-10 max-w-sm mx-auto italic">"You haven't treats yourself yet. Our tribal-sourced pulps are just a click away."</p>
        <NuxtLink to="/products">
          <button class="bg-brand-purple text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-purple/20">
            Start Exploring
          </button>
        </NuxtLink>
      </div>

      <div v-else class="space-y-8">
        <div v-for="order in orders" :key="order._id" class="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
          <!-- Order Summary Header -->
          <div class="bg-gray-50/50 px-10 py-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-6">
            <div class="flex items-center gap-8">
              <div class="space-y-1">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Date</p>
                <p class="font-bold text-brand-purple">{{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="w-px h-10 bg-gray-200"></div>
              <div class="space-y-1">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Amount</p>
                <p class="font-bold text-brand-purple">₹{{ order.totalAmount + (order.shippingCost || 0) }}</p>
              </div>
              <div class="w-px h-10 bg-gray-200"></div>
              <div class="space-y-1">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order ID</p>
                <p class="font-bold text-gray-500 font-mono text-xs">{{ order.paymentInfo?.id || order._id }}</p>
              </div>
            </div>
            
            <div :class="['px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border', getStatusColor(order.status)]">
               {{ order.status }}
            </div>
            <div :class="['px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border', order.isLocked ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200']">
               {{ order.isLocked ? 'Locked' : 'Unlocked' }}
            </div>
          </div>

          <!-- Order Items -->
          <div class="p-10">
            <div class="grid lg:grid-cols-2 gap-12">
              <div class="space-y-6">
                <div v-for="(item, idx) in order.products" :key="idx" class="flex flex-col sm:flex-row sm:items-center gap-6 group/item">
                  <div class="flex items-center gap-6 flex-1">
                    <div class="w-20 h-20 rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-gray-50 border-2 border-white">
                      <img :src="productStore.formatImageUrl(item.product?.images?.[0])" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 space-y-1">
                      <h4 class="font-black text-brand-purple italic tracking-tight">{{ item.product?.name || 'Deleted Product' }}</h4>
                      <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Qty: {{ item.quantity }} × ₹{{ item.price }}</p>
                    </div>
                  </div>
                  
                  <!-- Rate Button (Only if Delivered & Not yet reviewed) -->
                  <button 
                    v-if="order.status === 'DELIVERED' && !isProductReviewed(item.product?._id)"
                    @click="openReviewModal(item.product)"
                    class="sm:w-auto w-full px-6 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-purple hover:bg-brand-purple hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Star class="w-3.5 h-3.5" />
                    Rate product
                  </button>
                  <div v-else-if="isProductReviewed(item.product?._id)" class="text-[10px] font-black uppercase text-green-500 tracking-widest flex items-center gap-1.5 bg-green-50 px-4 py-2 rounded-xl border border-green-100 italic">
                    <CheckCircle2 class="w-3.5 h-3.5" /> Reviewed
                  </div>
                </div>
              </div>

              <!-- Shipping Info -->
              <div class="bg-brand-lavender/20 rounded-[32px] p-8 space-y-6 border border-brand-purple/5 self-start">
                 <div class="flex items-center gap-3 mb-2">
                    <MapPin class="w-5 h-5 text-brand-purple" />
                    <h4 class="text-sm font-black text-brand-purple tracking-widest uppercase">Delivery Address</h4>
                 </div>
                 <div class="space-y-1 text-sm text-gray-600 font-medium">
                    <p class="text-brand-purple font-black">{{ order.user?.name || auth.user?.name || 'Valued Customer' }}</p>
                    <p>{{ order.shippingAddress.address }}</p>
                    <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state || '' }} - {{ order.shippingAddress.postCode }}</p>
                    <p class="pt-2 italic text-gray-400">Phone: {{ order.shippingAddress.phone }}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <ReviewModal 
      :show="showReviewModal" 
      :product="selectedProductForReview" 
      @close="showReviewModal = false" 
      @success="onReviewSuccess" 
    />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
