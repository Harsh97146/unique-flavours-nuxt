<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronUp, MessageCircle } from 'lucide-vue-next';

const showScroll = ref(false);

const handleScroll = () => {
  showScroll.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-brand-purple/10 selection:text-brand-purple">
    <AppNavigation />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />

    <!-- Utility Buttons -->
    <div class="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <!-- Back to Top -->
      <button 
        v-if="showScroll"
        @click="scrollToTop"
        class="w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center text-brand-purple border border-gray-100 hover:bg-brand-purple hover:text-white transition-all transform hover:scale-110 active:scale-90 group"
      >
        <ChevronUp class="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

      <!-- WhatsApp Floating -->
      <a 
        href="https://wa.me/919876543210" 
        target="_blank"
        class="w-14 h-14 bg-green-500 shadow-2xl rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-all transform hover:scale-110 active:scale-90 group"
      >
        <MessageCircle class="w-7 h-7 fill-white/20 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  </div>
</template>
