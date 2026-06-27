<script setup lang="ts">
import { X, Star, Upload, Loader2, Camera } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{
  product: {
    id: string;
    name: string;
    image: string;
  } | null;
  show: boolean;
}>()

const emit = defineEmits(['close', 'success'])
const auth = useAuthStore()
const { $swal }: any = useNuxtApp()
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseUrl

const rating = ref(5)
const comment = ref('')
const submitting = ref(false)

const handleSubmit = async () => {
  if (!props.product) return
  
  submitting.value = true
  try {
    const response: any = await $fetch(`${apiBaseUrl}/api/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: {
        productId: props.product.id,
        rating: rating.value,
        comment: comment.value
      }
    })

    if (response.success) {
      $swal.toast('Review submitted', 'success', 'Pending admin approval.')
      emit('success')
      resetForm()
    }
  } catch (err: any) {
    $swal.error('Submission Failed', err.data?.error || 'Could not post review')
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  rating.value = 5
  comment.value = ''
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div class="fixed inset-0 bg-brand-purple/40 backdrop-blur-md" @click="emit('close')"></div>
      
      <div class="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-modal-in">
        <div class="p-8 md:p-12">
          <!-- Header -->
          <div class="flex items-center justify-between mb-10">
            <div>
              <h3 class="text-2xl font-black text-brand-purple italic tracking-tight uppercase">Share Your Experience</h3>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Reviewing: {{ product?.name }}</p>
            </div>
            <button @click="emit('close')" class="p-2 hover:bg-brand-lavender rounded-full transition-all">
              <X class="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Rating -->
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Overall Satisfaction</label>
              <div class="flex gap-3">
                <button 
                  v-for="i in 5" 
                  :key="i" 
                  type="button"
                  @click="rating = i"
                  class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2"
                  :class="i <= rating ? 'bg-yellow-50 border-yellow-200 text-yellow-400 scale-110 shadow-lg shadow-yellow-200/50' : 'bg-gray-50 border-gray-100 text-gray-200'"
                >
                  <Star :class="['w-6 h-6', i <= rating ? 'fill-yellow-400' : '']" />
                </button>
              </div>
            </div>

            <!-- Comment -->
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Detailed Message</label>
              <textarea 
                v-model="comment" 
                required
                rows="6"
                placeholder="Tell the tribe about the flavours, texture and quality..."
                class="w-full p-6 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple font-bold text-sm transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="submitting"
              class="w-full h-16 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-[24px] font-black uppercase tracking-[0.2em] italic text-xs shadow-2xl shadow-brand-purple/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <template v-if="submitting">
                <Loader2 class="w-5 h-5 animate-spin" /> Authorizing Review...
              </template>
              <template v-else>
                Submit Evaluation
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.4s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(40px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in { animation: modal-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
</style>
