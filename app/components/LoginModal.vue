<script setup lang="ts">
import { X, Mail, Lock, Loader2, ArrowRight, User, Phone } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import { nextTick, onMounted, watch } from 'vue'

const auth = useAuthStore()
const { $swal }: any = useNuxtApp()
const config = useRuntimeConfig()
const googleClientId = config.public.googleClientId

const email = ref('')
const password = ref('')
const name = ref('')
const phone = ref('')

const handleSubmit = async () => {
  try {
    if (auth.modalMode === 'login') {
      await auth.login({ email: email.value, password: password.value })
      $swal.toast('Signed in successfully', 'success')
    } else {
      await auth.register({ name: name.value, email: email.value, phone: phone.value, password: password.value })
      $swal.toast('Account created', 'success', 'You can now shop and track orders.')
    }
    auth.showLoginModal = false
    // Clear form
    email.value = ''
    password.value = ''
    name.value = ''
    phone.value = ''
  } catch (err: any) {
    $swal.error('Auth Error', err.data?.error || 'Authentication failed')
  }
}

const toggleMode = () => {
  auth.modalMode = auth.modalMode === 'login' ? 'register' : 'login'
}

// Google Sign-In callback & initialization
const handleGoogleCallback = async (response: any) => {
  try {
    auth.loading = true
    await auth.loginWithGoogle(response.credential)
    $swal.toast('Signed in with Google', 'success')
    auth.showLoginModal = false
    email.value = ''
    password.value = ''
  } catch (err: any) {
    $swal.error('Google Auth Failed', err.data?.error || 'Google Login failed')
  } finally {
    auth.loading = false
  }
}

const initializeGoogleSignIn = () => {
  if (typeof window === 'undefined' || !(window as any).google) {
    console.warn('Google Identity library not loaded yet')
    return
  }

  try {
    ;(window as any).google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleGoogleCallback,
      auto_select: false
    })

    const parent = document.getElementById('google-signin-button')
    if (parent) {
      ;(window as any).google.accounts.id.renderButton(parent, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'pill',
        logo_alignment: 'left',
        width: 320
      })
    }
  } catch (err) {
    console.error('Error rendering Google Sign-In button:', err)
  }
}

watch(() => auth.showLoginModal, (visible) => {
  if (visible) {
    nextTick(() => {
      setTimeout(initializeGoogleSignIn, 200)
    })
  }
})

onMounted(() => {
  if (auth.showLoginModal) {
    setTimeout(initializeGoogleSignIn, 200)
  }
})
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="auth.showLoginModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-brand-purple/40 backdrop-blur-md" @click="auth.showLoginModal = false"></div>
      
      <!-- Modal Container -->
      <div class="relative w-full max-w-[900px] bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(80,38,124,0.3)] overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-modal-in">
        
        <!-- Left Side: Brand & Visuals (Hidden on small mobile) -->
        <div class="hidden md:flex md:w-[40%] bg-brand-purple relative overflow-hidden flex-col justify-between p-12 text-white">
          <!-- Background Decoration -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div class="relative z-10">
            <NuxtLink to="/" class="inline-block mb-12" @click="auth.showLoginModal = false">
              <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl shadow-black/10">
                <img src="~/assets/Images/logo.png" alt="Logo" class="w-full h-full object-contain" />
              </div>
            </NuxtLink>
            
            <h2 class="text-4xl font-black italic tracking-tighter leading-tight mb-6">
              {{ auth.modalMode === 'login' ? 'WELCOME BACK TO THE TRIBE.' : 'JOIN OUR ORGANIC JOURNEY.' }}
            </h2>
            <p class="text-white/70 font-medium leading-relaxed">
              {{ auth.modalMode === 'login' 
                ? 'Sign in to access your exclusive tribal flavours and track your impact.' 
                : 'Create an account to support local farmers and get the purest pulps delivered.' }}
            </p>
          </div>
          
        </div>

        <!-- Right Side: Form -->
        <div class="user-panel flex-1 p-8 md:p-14 relative bg-white">
          <!-- Close Button -->
          <button @click="auth.showLoginModal = false" class="absolute top-8 right-8 p-2 text-gray-400 hover:text-brand-purple hover:bg-brand-lavender rounded-full transition-all z-20">
            <X class="w-6 h-6" />
          </button>

          <div class="max-w-md mx-auto h-full flex flex-col justify-center">
            <div class="text-center md:text-left mb-10">
               <!-- Mobile Only Logo -->
               <div class="md:hidden flex justify-center mb-6">
                  <div class="w-14 h-14 bg-brand-lavender rounded-2xl flex items-center justify-center p-2">
                    <img src="~/assets/Images/logo.png" alt="Logo" class="w-full h-full object-contain" />
                  </div>
               </div>
               
               <h3 class="text-2xl font-semibold text-brand-purple tracking-tight mb-2">
                 {{ auth.modalMode === 'login' ? 'Sign In' : 'Sign Up' }}
               </h3>
               <p class="text-sm text-gray-500">
                 {{ auth.modalMode === 'login' ? 'Pure flavours are just a login away' : 'Start your journey with us today' }}
               </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div v-if="auth.modalMode === 'register'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-medium text-gray-500 ml-1">Full Name</label>
                  <div class="relative group">
                    <User class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-purple transition-colors" stroke-width="1.75" />
                    <input v-model="name" required type="text" placeholder="John Doe" class="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-purple/20 focus:bg-white focus:border-brand-purple font-medium transition-all text-sm" />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="text-xs font-medium text-gray-500 ml-1">Phone</label>
                  <div class="relative group">
                    <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-purple transition-colors" stroke-width="1.75" />
                    <input v-model="phone" required type="tel" placeholder="+91 00000" class="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-purple/20 focus:bg-white focus:border-brand-purple font-medium transition-all text-sm" />
                  </div>
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium text-gray-500 ml-1">Email Address</label>
                <div class="relative group">
                  <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-purple transition-colors" stroke-width="1.75" />
                  <input v-model="email" required type="email" placeholder="name@example.com" class="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-purple/20 focus:bg-white focus:border-brand-purple font-medium transition-all text-sm" />
                </div>
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-between px-1">
                  <label class="text-xs font-medium text-gray-500 tracking-normal">Password</label>
                  <NuxtLink v-if="auth.modalMode === 'login'" to="/forgot-password" @click="auth.showLoginModal = false" class="text-xs font-medium text-brand-purple hover:underline">Forgot?</NuxtLink>
                </div>
                <div class="relative group">
                  <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-purple transition-colors" stroke-width="1.75" />
                  <input v-model="password" required type="password" placeholder="••••••••" class="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-purple/20 focus:bg-white focus:border-brand-purple font-medium transition-all text-sm" />
                </div>
              </div>

              <button 
                type="submit" 
                :disabled="auth.loading"
                class="w-full h-12 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 mt-4 group"
              >
                <template v-if="auth.loading">
                  <Loader2 class="w-4 h-4 animate-spin" stroke-width="1.75" /> Working...
                </template>
                <template v-else>
                  <span>{{ auth.modalMode === 'login' ? 'Sign In' : 'Create Account' }}</span>
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" stroke-width="1.75" />
                </template>
              </button>
            </form>

            <!-- Divider -->
            <div class="my-5 flex items-center justify-between text-xs text-gray-400 font-medium px-1">
              <span class="w-[40%] h-[1px] bg-gray-100"></span>
              <span>OR</span>
              <span class="w-[40%] h-[1px] bg-gray-100"></span>
            </div>

            <!-- Google Sign-In Button -->
            <div class="flex justify-center">
              <div id="google-signin-button" class="w-full flex justify-center min-h-[46px]"></div>
            </div>


            <!-- Toggle Mode -->
            <div class="mt-10 text-center">
               <button @click="toggleMode" class="text-sm text-gray-500 hover:text-brand-purple transition-colors">
                  {{ auth.modalMode === 'login' ? "Don't have an account?" : "Already have an account?" }} 
                  <span class="text-brand-purple font-medium ml-1 hover:underline">
                    {{ auth.modalMode === 'login' ? 'Create one now' : 'Sign in here' }}
                  </span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { 
  transition: opacity 0.4s ease; 
}
.modal-fade-enter-from, .modal-fade-leave-to { 
  opacity: 0; 
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-modal-in {
  animation: modal-in 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom Scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(80, 38, 124, 0.1);
  border-radius: 10px;
}
</style>
