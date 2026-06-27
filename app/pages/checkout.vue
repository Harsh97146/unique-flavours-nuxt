<script setup lang="ts">
const cart = useCartStore()
const auth = useAuthStore()

onMounted(async () => {
  if (!auth.token) {
    await auth.fetchUser()
  }
  if (!auth.token) {
    auth.modalMode = 'login'
    auth.showLoginModal = true
    navigateTo('/products')
    return
  }
  if (cart.items.length === 0) {
    navigateTo('/cart')
    return
  }
  navigateTo('/cart?checkout=true')
})

useHead({ title: 'Checkout - Unique Flavours' })
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <p class="text-sm text-gray-500">Redirecting to checkout...</p>
  </div>
</template>
