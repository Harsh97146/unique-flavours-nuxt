<template>
  <div class="auth-container min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="glass-card max-w-md w-full space-y-8 p-10 rounded-brand-lg shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Reset Password
        </h2>
        <p class="mt-3 text-center text-sm text-gray-600">
          Enter your new password below.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleReset">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="relative group mb-4">
            <input 
              v-model="password" 
              type="password" 
              required 
              class="appearance-none rounded-brand relative block w-full px-4 py-4 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-300" 
              placeholder="New Password" 
            />
          </div>
          <div class="relative group">
            <input 
              v-model="confirmPassword" 
              type="password" 
              required 
              class="appearance-none rounded-brand relative block w-full px-4 py-4 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-300" 
              placeholder="Confirm Password" 
            />
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-brand text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg transform active:scale-95 transition-all"
          >
            <span v-if="loading">Resetting Password...</span>
            <span v-else>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const token = route.query.token || route.params.token;
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const handleReset = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  loading.value = true;
  try {
    const response = await $fetch(`${apiBaseUrl}/api/auth/resetpassword/${token}`, {
      method: 'PUT',
      body: { password: password.value }
    });
    alert('Password reset successful. You can now login.');
    router.push('/login');
  } catch (error) {
    alert(error.data?.error || 'Failed to reset password');
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
}
</style>
