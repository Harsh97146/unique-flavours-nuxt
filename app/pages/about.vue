<script setup lang="ts">
import { Heart, Leaf, Users, ShieldCheck, Globe, Star, ArrowRight, Sprout, CheckCircle2 } from 'lucide-vue-next'

useHead({ 
  title: 'Our Story | Unique Flavours - Tribal Wisdom Meets Modern Wellness',
  meta: [
    { name: 'description', content: 'Discover the heart behind Unique Flavours. Empowering 500+ tribal women farmers while delivering 100% natural fruit excellence.' }
  ]
})

const milestones = [
  { year: '2010', title: 'The Vision', desc: 'Started with a simple goal to preserve tribal fruit processing wisdom.' },
  { year: '2015', title: 'Community Growth', desc: 'Partnered with 200+ women farmers in the Udaipur region.' },
  { year: '2020', title: 'Digital Transformation', desc: 'Launched our online platform to reach a pan-India audience.' },
  { year: 'Today', title: 'National Impact', desc: 'Now empowering 500+ farmers and serving thousands of happy families.' }
]
</script>

<template>
  <div class="overflow-x-hidden pt-12">
    <!-- Hero Section -->
    <section class="relative bg-brand-lavender/40 py-24 overflow-hidden">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[120px] -mr-96 -mt-96"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center space-y-8 max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-brand-purple/10 text-brand-purple px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ring-1 ring-brand-purple/20 shadow-sm animate-bounce-slow">
            Authenticity Guaranteed
          </div>
          <h1 class="text-5xl md:text-7xl font-extrabold text-brand-purple leading-tight tracking-tighter">
            We are on a Mission to <br/>
            <span class="text-brand-green underline decoration-wavy underline-offset-8">Heal the World</span>
          </h1>
          <p class="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Bridging the gap between ancient tribal wisdom and your modern kitchen shelf. Pure, natural, and honest.
          </p>
        </div>
      </div>
    </section>

    <!-- Our Journey Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="relative group">
            <div class="absolute -inset-4 bg-brand-green/5 rounded-[40px] -rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
            <div class="relative rounded-[32px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/images/WhatsApp Image 2026-03-26 at 10.39.07 PM.jpeg" 
                class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                alt="Our Heritage"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-purple/40 to-transparent"></div>
            </div>
            
            <!-- Quality Badge Overlay -->
            <div class="absolute -bottom-10 -right-10 bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100 max-w-[240px] text-center hidden md:block animate-in fade-in slide-in-from-bottom-10 duration-1000">
               <div class="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-brand-green/20">
                  <CheckCircle2 class="w-8 h-8" />
               </div>
               <h4 class="text-lg font-black text-brand-purple mb-1">Purity First</h4>
               <p class="text-xs text-gray-500 font-bold uppercase tracking-widest">0% Chemicals Added</p>
            </div>
          </div>

          <div class="space-y-10">
            <div class="space-y-4">
               <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em] border-l-4 border-brand-green pl-4">Our Heritage</h2>
               <h3 class="text-4xl md:text-5xl font-extrabold text-brand-purple">Born in the Depths of Udaipur's Forests</h3>
            </div>
            <div class="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
               <p>Our journey began in the tribal belts surrounding Udaipur, where the knowledge of fruit preservation has been passed down through generations. We saw a dying art and decided to give it a global stage.</p>
               <p>Every product we create is 100% natural, sourced directly from wild forests where fruits grow without a single drop of artificial pesticide. It's flavor the way nature intended.</p>
            </div>
            <div class="flex items-center gap-8 pt-6 border-t border-gray-50">
               <div class="text-center">
                  <p class="text-3xl font-black text-brand-purple">500+</p>
                  <p class="text-[10px] uppercase font-black text-brand-green tracking-widest mt-1">Women Farmers</p>
               </div>
               <div class="text-center">
                  <p class="text-3xl font-black text-brand-purple">12+</p>
                  <p class="text-[10px] uppercase font-black text-brand-green tracking-widest mt-1">States Served</p>
               </div>
               <div class="text-center">
                  <p class="text-3xl font-black text-brand-purple">100%</p>
                  <p class="text-[10px] uppercase font-black text-brand-green tracking-widest mt-1">Direct Profit</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Timeline -->
    <section class="py-24 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 space-y-4">
           <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em]">Growth & Impact</h2>
           <h3 class="text-4xl font-extrabold text-brand-purple">Milestones of Progress</h3>
        </div>
        <div class="grid md:grid-cols-4 gap-8">
           <div v-for="m in milestones" :key="m.year" class="bg-white p-10 rounded-brand-lg border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <span class="text-xs font-black text-brand-green bg-brand-green/10 px-4 py-1 rounded-full uppercase tracking-tighter">{{ m.year }}</span>
              <h4 class="text-xl font-extrabold text-brand-purple mt-6 mb-4 group-hover:text-brand-green transition-colors">{{ m.title }}</h4>
              <p class="text-sm text-gray-500 font-medium leading-relaxed">{{ m.desc }}</p>
           </div>
        </div>
      </div>
    </section>

    <!-- Values Grid -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-12">
           <div class="lg:col-span-1 space-y-6">
              <h2 class="text-sm font-black text-brand-green uppercase tracking-[0.3em]">The Unique Flavours Code</h2>
              <h3 class="text-4xl font-extrabold text-brand-purple">Values that Define Our Existence</h3>
              <p class="text-lg text-gray-600 font-medium">We don't just sell fruit pulps; we preserve a culture of honesty and unadulterated wellness.</p>
              <div class="pt-8">
                 <button class="bg-brand-purple text-white px-8 py-4 rounded-brand-lg font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                   Partner with us <ArrowRight class="w-5 h-5" />
                 </button>
              </div>
           </div>
           <div class="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              <div v-for="(v, i) in [
                { title: 'Zero Additives', desc: 'No sugar, no chemicals, no shortcuts. Just pure fruit in its wildest form.', icon: ShieldCheck },
                { title: 'Women Empowerment', desc: 'Providing economic independence to 500+ tribal families across Udaipur.', icon: Heart },
                { title: 'Wild Sourced', desc: 'Our fruits are handpicked from the wild, ensuring maximum nutrient density.', icon: Leaf },
                { title: 'Waste Conscious', desc: 'We utilize traditional methods that produce zero environmental waste.', icon: Globe }
              ]" :key="i" class="p-8 rounded-[32px] border border-gray-50 shadow-sm hover:bg-brand-lavender/30 transition-all duration-500 group">
                 <div class="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <component :is="v.icon" class="w-7 h-7 text-brand-green" />
                 </div>
                 <h4 class="text-xl font-extrabold text-brand-purple mb-3">{{ v.title }}</h4>
                 <p class="text-sm text-gray-500 font-medium leading-relaxed">{{ v.desc }}</p>
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- Trust Building Footer Section -->
    <section class="py-24 relative overflow-hidden bg-brand-purple">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-12">
        <h2 class="text-4xl md:text-6xl font-black text-white italic tracking-tighter">"Honest nutrition, <br/> from our forests to your family."</h2>
        <div class="flex flex-col md:flex-row items-center justify-center gap-8">
           <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
              <div class="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white"><Users class="w-5 h-5" /></div>
              <p class="text-white text-xs font-bold uppercase tracking-widest">500k+ Units Sold</p>
           </div>
           <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
              <div class="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white"><Star class="w-5 h-5" /></div>
              <p class="text-white text-xs font-bold uppercase tracking-widest">4.9/5 Average Rating</p>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
