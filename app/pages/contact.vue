<script setup lang="ts">
import { Mail, Phone, MapPin, Clock } from 'lucide-vue-next'

useHead({ title: 'Contact - Unique Flavours' })

const formData = reactive({ name: '', email: '', phone: '', subject: '', message: '' })

const { $swal }: any = useNuxtApp()

const handleSubmit = () => {
  $swal.toast('Message sent', 'success', "We'll get back to you soon.")
  Object.assign(formData, { name: '', email: '', phone: '', subject: '', message: '' })
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <section class="bg-gradient-to-br from-purple-50 to-purple-100 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p class="text-xl text-gray-600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <p class="text-lg text-gray-600 mb-8">Feel free to reach out to us through any of these channels.</p>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail class="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
                <p class="text-gray-600">contact@uniqueflavours.com</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone class="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Phone</h3>
                <p class="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin class="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Location</h3>
                <p class="text-gray-600">Mumbai, Maharashtra, India - 400001</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock class="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Business Hours</h3>
                <p class="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p class="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <div class="bg-white rounded-xl shadow-lg p-8 border">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input id="name" v-model="formData.name" type="text" placeholder="John Doe" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700" />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input id="email" v-model="formData.email" type="email" placeholder="john@example.com" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700" />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input id="phone" v-model="formData.phone" type="tel" placeholder="+91 98765 43210" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700" />
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input id="subject" v-model="formData.subject" type="text" placeholder="How can we help?" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700" />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea id="message" v-model="formData.message" rows="5" placeholder="Tell us more..." required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 resize-none"></textarea>
              </div>
              <button type="submit" class="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold text-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
