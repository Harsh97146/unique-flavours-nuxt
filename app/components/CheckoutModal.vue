<script setup lang="ts">
import { X, MapPin, Truck, ShieldCheck, Loader2, ArrowLeft, Package } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useProductStore } from '~/stores/products'
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: [] }>()

const cart = useCartStore()
const productStore = useProductStore()
const auth = useAuthStore()
const { $swal }: any = useNuxtApp()
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseUrl

const step = ref<'address' | 'review'>('address')
const loading = ref(false)
const fetchingShipping = ref(false)
const shippingCost = ref<number | null>(null)
const shippingError = ref('')

const form = ref({
  address: '',
  city: '',
  state: '',
  postCode: '',
  phone: '',
})

const totalPayable = computed(() => cart.totalPrice + (shippingCost.value || 0))

const resetModal = () => {
  step.value = 'address'
  shippingCost.value = null
  shippingError.value = ''
  form.value = { address: '', city: '', state: '', postCode: '', phone: '' }
}

watch(() => props.show, (visible) => {
  if (!visible) resetModal()
})

const close = () => emit('close')

const estimateShipping = async () => {
  if (form.value.postCode.length !== 6 || isNaN(Number(form.value.postCode))) {
    shippingCost.value = null
    shippingError.value = 'Please enter a valid 6-digit pincode'
    return false
  }

  fetchingShipping.value = true
  shippingError.value = ''
  try {
    const res: any = await $fetch(`${apiBaseUrl}/api/orders/shipping-estimate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` },
      body: {
        products: cart.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          postCode: form.value.postCode,
          city: form.value.city,
          state: form.value.state || '',
        },
      },
    })
    if (res.success) {
      shippingCost.value = res.shippingCost
      return true
    }
    shippingError.value = res.message || 'Courier service not available'
    shippingCost.value = 100
    return true
  } catch (err: any) {
    shippingError.value = err.data?.message || 'Failed to calculate shipping'
    shippingCost.value = 100
    return true
  } finally {
    fetchingShipping.value = false
  }
}

const handleProcessOrder = async () => {
  if (!form.value.address.trim() || !form.value.city.trim() || !form.value.state.trim()) {
    $swal.toast('Address incomplete', 'warning', 'Please fill in all delivery fields.')
    return
  }
  if (!/^[0-9]{10}$/.test(form.value.phone)) {
    $swal.toast('Invalid phone number', 'warning', 'Enter a valid 10-digit mobile number.')
    return
  }

  const ok = await estimateShipping()
  if (ok) step.value = 'review'
}

const handlePlaceOrder = async () => {
  if (cart.items.length === 0) {
    $swal.toast('Your cart is empty', 'warning', 'Add items before checkout.')
    close()
    return
  }

  loading.value = true
  try {
    const orderData = {
      products: cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress: {
        ...form.value,
        country: 'India',
      },
      totalAmount: cart.totalPrice,
      shippingCost: shippingCost.value || 0,
    }

    const res: any = await $fetch(`${apiBaseUrl}/api/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` },
      body: orderData,
    })

    if (res.success && res.data.paymentSessionId) {
      // @ts-ignore
      const cashfree = new window.Cashfree({ mode: 'sandbox' })
      await cashfree.checkout({
        paymentSessionId: res.data.paymentSessionId,
        returnUrl: res.data.returnUrl,
      })
    }
  } catch (err: any) {
    $swal.error('Order failed', err.data?.message || 'Could not place your order. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="checkout-fade">
      <div v-if="show" class="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="absolute inset-0 bg-brand-purple/30 backdrop-blur-sm" @click="close" />

        <div class="user-panel relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 sm:zoom-in-95">
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            <div class="flex items-center gap-3">
              <span class="user-panel-icon bg-brand-lavender text-brand-purple w-9 h-9">
                <MapPin v-if="step === 'address'" stroke-width="1.75" />
                <Package v-else stroke-width="1.75" />
              </span>
              <div>
                <h2 class="text-base font-semibold text-gray-900">
                  {{ step === 'address' ? 'Delivery Address' : 'Order Summary' }}
                </h2>
                <p class="text-xs text-gray-500">
                  {{ step === 'address' ? 'Step 1 of 2 — Where should we deliver?' : 'Step 2 of 2 — Review and pay' }}
                </p>
              </div>
            </div>
            <button @click="close" class="p-2 text-gray-400 hover:text-brand-purple hover:bg-brand-lavender rounded-lg transition-colors">
              <X class="w-5 h-5" stroke-width="1.75" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto px-5 py-5">
            <!-- Step 1: Address -->
            <form v-if="step === 'address'" @submit.prevent="handleProcessOrder" class="space-y-4">
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-gray-700">Street Address</label>
                <input
                  v-model="form.address"
                  required
                  placeholder="House no., street, area"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none text-sm transition-all"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-gray-700">City</label>
                  <input
                    v-model="form.city"
                    required
                    placeholder="City"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none text-sm transition-all"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-gray-700">State</label>
                  <input
                    v-model="form.state"
                    required
                    placeholder="State"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    v-model="form.postCode"
                    required
                    maxlength="6"
                    placeholder="400001"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none text-sm transition-all"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-gray-700">Mobile</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">+91</span>
                    <input
                      v-model="form.phone"
                      required
                      type="tel"
                      maxlength="10"
                      placeholder="9876543210"
                      class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              <p v-if="shippingError" class="text-red-500 text-xs">{{ shippingError }}</p>

              <div class="flex items-start gap-3 p-3 bg-brand-lavender/50 rounded-lg border border-brand-purple/10">
                <Truck class="w-4 h-4 text-brand-purple shrink-0 mt-0.5" stroke-width="1.75" />
                <p class="text-xs text-gray-600 leading-relaxed">
                  Shipping cost is calculated based on your pincode and order weight after you proceed.
                </p>
              </div>
            </form>

            <!-- Step 2: Order snapshot -->
            <div v-else class="space-y-5">
              <!-- Delivery address recap -->
              <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p class="text-xs font-medium text-gray-500 mb-1">Delivering to</p>
                <p class="text-sm font-medium text-gray-900">{{ form.address }}</p>
                <p class="text-sm text-gray-600">{{ form.city }}, {{ form.state }} — {{ form.postCode }}</p>
                <p class="text-sm text-gray-500 mt-1">+91 {{ form.phone }}</p>
              </div>

              <!-- Items -->
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Order items</p>
                <div class="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                  <div v-for="item in cart.items" :key="item.product._id" class="flex gap-3 p-3 bg-white">
                    <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <img :src="productStore.formatImageUrl(item.product.images?.[0])" :alt="item.product.name" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ item.product.name }}</p>
                      <p class="text-xs text-gray-500">Qty {{ item.quantity }} × ₹{{ item.product.price }}</p>
                    </div>
                    <p class="text-sm font-semibold text-gray-900 shrink-0">₹{{ item.product.price * item.quantity }}</p>
                  </div>
                </div>
              </div>

              <!-- Totals -->
              <div class="space-y-2 p-4 bg-brand-lavender/30 rounded-lg border border-brand-purple/10">
                <div class="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span class="font-medium">₹{{ cart.totalPrice }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Shipping</span>
                  <span v-if="fetchingShipping" class="text-gray-400 animate-pulse text-xs">Calculating...</span>
                  <span v-else class="font-medium text-brand-green">₹{{ shippingCost ?? 0 }}</span>
                </div>
                <div class="flex justify-between items-center pt-2 border-t border-brand-purple/10">
                  <span class="text-base font-semibold text-gray-900">Total</span>
                  <span class="text-xl font-bold text-brand-purple">₹{{ totalPayable }}</span>
                </div>
              </div>

              <div class="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck class="w-4 h-4 text-brand-green shrink-0" stroke-width="1.75" />
                Secure payment via Cashfree
              </div>
            </div>
          </div>

          <!-- Footer actions -->
          <div class="px-5 py-4 border-t border-gray-100 shrink-0 space-y-2">
            <button
              v-if="step === 'address'"
              type="button"
              :disabled="fetchingShipping"
              @click="handleProcessOrder"
              class="w-full py-3 bg-brand-purple hover:bg-brand-purple-dark text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Loader2 v-if="fetchingShipping" class="w-4 h-4 animate-spin" />
              {{ fetchingShipping ? 'Calculating shipping...' : 'Process Order' }}
            </button>

            <template v-else>
              <button
                type="button"
                :disabled="loading"
                @click="handlePlaceOrder"
                class="w-full py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
                <ShieldCheck v-else class="w-4 h-4" stroke-width="1.75" />
                {{ loading ? 'Redirecting to payment...' : 'Place Order' }}
              </button>
              <button
                type="button"
                @click="step = 'address'"
                class="w-full py-2.5 text-sm font-medium text-gray-600 hover:text-brand-purple flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowLeft class="w-4 h-4" stroke-width="1.75" />
                Edit address
              </button>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.checkout-fade-enter-active,
.checkout-fade-leave-active {
  transition: opacity 0.25s ease;
}
.checkout-fade-enter-from,
.checkout-fade-leave-to {
  opacity: 0;
}
</style>
