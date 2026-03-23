<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-purple-700 mb-4">404</h1>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p class="text-lg text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <NuxtLink to="/">
        <button class="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
          Back to Home
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
