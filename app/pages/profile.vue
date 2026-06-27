<template>
  <div class="user-panel profile-container min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-3 mb-8 px-4">
        <span class="user-panel-icon bg-brand-lavender text-brand-purple w-10 h-10 rounded-xl">
          <UserCircle stroke-width="1.75" class="w-5 h-5" />
        </span>
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">Your Profile</h1>
          <p class="text-sm text-gray-500 mt-0.5">Manage your account details and security</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Profile Info Card -->
        <div class="glass-card p-6 md:p-8 rounded-xl shadow-sm md:col-span-2 space-y-8">
          <div class="flex items-center gap-5">
            <div class="h-20 w-20 bg-brand-lavender rounded-full flex items-center justify-center text-brand-purple text-2xl font-semibold ring-2 ring-brand-purple/10">
              {{ auth.user?.name?.charAt(0) || 'U' }}
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ auth.user?.name }}</h2>
              <p class="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                <Mail class="w-3.5 h-3.5" stroke-width="1.75" />
                {{ auth.user?.email }}
              </p>
              <span class="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-brand-lavender text-brand-purple text-xs font-medium rounded-md">
                <BadgeCheck class="w-3.5 h-3.5" stroke-width="1.75" />
                {{ auth.user?.role }}
              </span>
            </div>
          </div>

          <form @submit.prevent="handleUpdateDetails" class="space-y-5 pt-6 border-t border-gray-100">
            <div class="flex items-center gap-2">
              <span class="user-panel-icon bg-brand-lavender text-brand-purple w-8 h-8">
                <User stroke-width="1.75" />
              </span>
              <h3 class="text-base font-semibold text-gray-900">Personal Details</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-gray-700">Full Name</label>
                <input v-model="name" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all text-sm" />
              </div>
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-gray-700">Email Address</label>
                <input v-model="email" type="email" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all text-sm" />
              </div>
            </div>
            <button type="submit" :disabled="loading" class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple text-white text-sm font-medium rounded-lg hover:bg-brand-purple-dark shadow-sm transition-all disabled:opacity-50">
              <Save class="w-4 h-4" stroke-width="1.75" />
              Save Changes
            </button>
          </form>
        </div>

        <!-- Security / Change Password Card -->
        <div class="glass-card p-6 md:p-8 rounded-xl shadow-sm space-y-6">
          <div class="flex items-center gap-2">
            <span class="user-panel-icon bg-brand-lavender text-brand-purple w-8 h-8">
              <Shield stroke-width="1.75" />
            </span>
            <h3 class="text-base font-semibold text-gray-900">Security</h3>
          </div>
          <form @submit.prevent="handleChangePassword" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <KeyRound class="w-3.5 h-3.5 text-gray-400" stroke-width="1.75" />
                Current Password
              </label>
              <input v-model="currentPassword" type="password" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all text-sm" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700">New Password</label>
              <input v-model="newPassword" type="password" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all text-sm" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700">Confirm New Password</label>
              <input v-model="confirmNewPassword" type="password" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all text-sm" />
            </div>
            <button type="submit" :disabled="passLoading" class="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black shadow-sm transition-all disabled:opacity-50">
              <KeyRound class="w-4 h-4" stroke-width="1.75" />
              Update Password
            </button>
          </form>

          <div class="pt-4 border-t border-gray-100">
            <button @click="auth.logout()" class="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-all">
              <LogOut class="w-4 h-4" stroke-width="1.75" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserCircle, User, Mail, BadgeCheck, Save, Shield, KeyRound, LogOut } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const router = useRouter();
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

onMounted(async () => {
  await auth.fetchUser();
  if (!auth.token) {
    auth.modalMode = 'login'
    auth.showLoginModal = true
    router.push('/');
  }
});

const name = ref(auth.user?.name || '');
const email = ref(auth.user?.email || '');
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const loading = ref(false);
const passLoading = ref(false);

const handleUpdateDetails = async () => {
  loading.value = true;
  try {
    const token = useCookie('auth_token').value;
    await $fetch(`${apiBaseUrl}/api/auth/updatedetails`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: { name: name.value, email: email.value }
    });
    alert('Profile updated successfully');
    await auth.fetchUser();
  } catch (error) {
    alert(error.data?.error || 'Update failed');
  } finally {
    loading.value = false;
  }
};

const handleChangePassword = async () => {
  if (newPassword.value !== confirmNewPassword.value) {
    alert('New passwords do not match');
    return;
  }
  passLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    await $fetch(`${apiBaseUrl}/api/auth/updatepassword`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: { 
        currentPassword: currentPassword.value, 
        newPassword: newPassword.value 
      }
    });
    alert('Password updated successfully');
    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
  } catch (error) {
    alert(error.data?.error || 'Failed to update password');
  } finally {
    passLoading.value = false;
  }
};
</script>

<style scoped>
.profile-container {
  background-color: #f8fafc;
}
.glass-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
</style>
