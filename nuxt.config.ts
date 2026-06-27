// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com'
    }
  },


  app: {
    head: {
      title: 'Unique Flavours - Pure & Natural Fruit Pulps',
      meta: [
        { name: 'description', content: 'Premium fruit pulps sourced directly from tribal women farmers in Udaipur. 100% natural, no added sugar or preservatives.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      ],
      script: [
        { src: 'https://sdk.cashfree.com/js/v3/cashfree.js' },
        { src: 'https://accounts.google.com/gsi/client', async: true, defer: true }
      ]
    },
  },
})
