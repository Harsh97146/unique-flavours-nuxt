<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const auth = useAuthStore()
const cart = useCartStore()
const { $swal }: any = useNuxtApp()
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseUrl

const status = ref<'LOADING' | 'SUCCESS' | 'FAILED'>('LOADING')
const orderDetails = ref<any>(null)

onMounted(async () => {
  const orderId = route.query.order_id as string
  if (!orderId) {
    status.value = 'FAILED'
    showFailureAndRedirect()
    return
  }

  // Ensure we have a token before proceeding
  let token: any = useCookie('auth_token').value
  if (!token) {
    await auth.fetchUser()
    token = auth.token
  }

  if (!token) {
    status.value = 'FAILED'
    showFailureAndRedirect()
    return
  }

  try {
    // 1. Verify Payment on Backend
    if (!orderId) {
      console.error('No orderId found in query');
      status.value = 'FAILED';
      showFailureAndRedirect()
      return;
    }
    const res: any = await $fetch(`${apiBaseUrl}/api/orders/verify/${orderId}`)

    if (res.status === 'PAID') {
      status.value = 'SUCCESS'
      orderDetails.value = res.order
      // 2. Clear Cart on Success
      cart.clearCart()
      
      // AUTO REDIRECT with Popup trigger
      setTimeout(() => {
        navigateTo('/orders?placed=true')
      }, 1500)
    } else {
      status.value = 'FAILED'
      showFailureAndRedirect()
    }
  } catch (err) {
    status.value = 'FAILED'
    showFailureAndRedirect()
  }
})

const showFailureAndRedirect = () => {
  // Show error toast immediately
  $swal.toast('Payment unsuccessful', 'error', 'Please try again or choose another method.')
  // Redirect to products page after 3 seconds so user sees the toast
  setTimeout(() => {
    navigateTo('/products')
  }, 3000)
}

useHead({ title: 'Payment Verification - Unique Flavours' })
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white rounded-[48px] shadow-2xl p-12 text-center space-y-8 border border-gray-100 relative overflow-hidden">
      <!-- Loading State -->
      <div v-if="status === 'LOADING'" class="space-y-6">
        <div class="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto animate-spin">
          <Loader2 class="w-12 h-12 text-indigo-600" />
        </div>
        <h2 class="text-3xl font-black italic tracking-tighter uppercase">Syncing Pulp Funds...</h2>
        <p class="text-gray-400 font-medium">Please do not refresh as we verify your transaction.</p>
      </div>

      <!-- Success State -->
      <div v-else-if="status === 'SUCCESS'" class="space-y-6 animate-in zoom-in duration-500">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto scale-in duration-500">
          <CheckCircle class="w-12 h-12 text-green-600" />
        </div>
        <div class="space-y-2">
            <h2 class="text-3xl font-black italic tracking-tighter uppercase text-green-600">Pulp Secured!</h2>
            <p class="text-gray-500 font-medium">Payment verified successfully. Your fresh batch is being prepared.</p>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4 text-left">
           <div class="flex justify-between items-center text-[10px] font-black uppercase text-gray-400 tracking-widest">
              <span>Order Reference</span>
              <span class="text-gray-900">#{{ orderDetails?.paymentInfo?.id }}</span>
           </div>
           <div class="flex justify-between items-center font-black text-gray-900 border-t border-gray-100 pt-3">
              <span class="italic text-xs">AMOUNT PAID</span>
              <span class="text-xl tracking-tighter italic">₹{{ orderDetails?.totalAmount }}</span>
           </div>
        </div>

        <div class="pt-6">
            <NuxtLink to="/products">
                <button class="w-full h-16 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-600/20 transform active:scale-95">
                    Continue Shopping <ArrowRight class="w-5 h-5" />
                </button>
            </NuxtLink>
        </div>
      </div>

      <!-- Failed State -->
      <div v-else class="space-y-6 animate-in zoom-in duration-500">
        <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <XCircle class="w-12 h-12 text-red-600" />
        </div>
        <div class="space-y-2">
            <h2 class="text-3xl font-black italic tracking-tighter uppercase text-red-600">Payment Failed</h2>
            <p class="text-gray-500 font-medium">Your payment was not completed. No funds were captured.</p>
            <p class="text-xs text-gray-400 font-medium mt-1">Redirecting you to products in a moment...</p>
        </div>
        
        <div class="pt-6 space-y-4">
            <NuxtLink to="/checkout">
                <button class="w-full h-16 bg-gray-900 hover:bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-black/10 transform active:scale-95">
                    Retry Payment
                </button>
            </NuxtLink>
            <NuxtLink to="/products">
                <button class="w-full h-16 border-2 border-gray-100 hover:bg-gray-50 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                    Go to Products
                </button>
            </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
