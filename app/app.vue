<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
onMounted(() => {
  auth.fetchUser()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <LoginModal />
  </NuxtLayout>
</template>
