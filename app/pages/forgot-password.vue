<template>
  <div class="auth-container min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="glass-card max-w-md w-full space-y-8 p-10 rounded-brand-lg shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Recover Password
        </h2>
        <p class="mt-3 text-center text-sm text-gray-600">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>
      <form v-if="!submitted" class="mt-8 space-y-6" @submit.prevent="handleForgot">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="relative group mb-4">
            <input 
              v-model="email" 
              type="email" 
              required 
              class="appearance-none rounded-brand relative block w-full px-4 py-4 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-300" 
              placeholder="Email address" 
            />
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-brand text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg transform active:scale-95 transition-all"
          >
            <span v-if="loading">Sending Link...</span>
            <span v-else>Send Reset Link</span>
          </button>
        </div>
        
        <div class="text-center mt-6">
          <NuxtLink to="/login" class="font-semibold text-green-600 hover:text-green-500 transition-colors">
            Back to Login
          </NuxtLink>
        </div>
      </form>
      <div v-else class="text-center py-10">
        <div class="text-green-600 text-6xl mb-4">✓</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Check your email</h3>
        <p class="text-gray-600">We've sent a password reset link to {{ email }}.</p>
        <button @click="submitted = false" class="mt-6 font-semibold text-green-600">Try another email</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const loading = ref(false);
const submitted = ref(false);
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const handleForgot = async () => {
  loading.value = true;
  try {
    const response = await $fetch(`${apiBaseUrl}/api/auth/forgotpassword`, {
      method: 'POST',
      body: { email: email.value }
    });
    submitted.value = true;
  } catch (error) {
    alert(error.data?.error || 'Something went wrong');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  background: linear-gradient(135deg, #f0f7f4 0%, #e0efe9 100%);
}
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
input {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
</style>
