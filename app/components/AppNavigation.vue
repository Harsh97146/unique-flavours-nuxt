<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { ShoppingCart, Menu, X, ChevronDown, Search, CircleUserRound, Settings, Package, LogOut, LogIn, UserPlus } from "lucide-vue-next";
import { useCartStore } from "~/stores/cart";

const cart = useCartStore();
const mobileMenuOpen = ref(false);
const route = useRoute();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Our Story", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const showSearch = ref(false);
const showUserDropdown = ref(false);
const searchQuery = ref('');

const auth = useAuthStore();

const dropdownContainer = ref<HTMLElement | null>(null);

const isActiveLink = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path === path || route.path.startsWith(`${path}/`);
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    showUserDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <header class="sticky top-0 z-50">
    <nav class="site-nav bg-white/95 backdrop-blur-lg border-b border-gray-200/80 shadow-[0_1px_3px_rgba(80,38,124,0.04)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-[auto_1fr_auto] items-center h-16 lg:h-[72px] gap-4">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0 group min-w-0">
            <img
              src="~/assets/Images/logo.png"
              alt="Unique Flavours Logo"
              class="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
            />
            <div class="hidden sm:block min-w-0">
              <span class="text-base lg:text-lg font-semibold text-brand-purple tracking-tight leading-tight block truncate">
                Unique Flavours
              </span>
              <span class="text-[11px] font-medium text-brand-green leading-none block mt-0.5">
                Pure & Natural
              </span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center justify-center gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              :class="[
                'nav-link relative px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                isActiveLink(link.path)
                  ? 'text-brand-purple bg-brand-lavender/60'
                  : 'text-gray-600 hover:text-brand-purple hover:bg-gray-50',
              ]"
            >
              {{ link.name }}
            </NuxtLink>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-1.5 shrink-0">
            <div class="flex items-center gap-0.5 p-1 rounded-full bg-gray-50 border border-gray-200/70">
              <button
                @click="showSearch = true"
                class="nav-icon-btn"
                aria-label="Search"
              >
                <Search class="w-[18px] h-[18px]" stroke-width="1.75" />
              </button>

              <div class="relative" ref="dropdownContainer">
                <button
                  @click="showUserDropdown = !showUserDropdown"
                  class="nav-icon-btn flex items-center gap-0.5"
                  :class="{ 'bg-brand-lavender text-brand-purple': showUserDropdown }"
                  aria-label="Account menu"
                >
                  <CircleUserRound class="w-[18px] h-[18px]" stroke-width="1.75" />
                  <ChevronDown
                    class="w-3 h-3 transition-transform hidden md:block"
                    :class="{ 'rotate-180': showUserDropdown }"
                    stroke-width="2"
                  />
                </button>

                <!-- User Dropdown -->
                <div
                  v-if="showUserDropdown"
                  class="user-panel absolute right-0 mt-2.5 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] animate-in fade-in zoom-in-95 duration-200"
                >
                  <template v-if="auth.token">
                    <div class="px-4 py-3 border-b border-gray-100">
                      <p class="text-xs font-medium text-gray-500">Signed in as</p>
                      <p class="text-sm font-semibold text-gray-900 truncate mt-0.5">{{ auth.user?.name }}</p>
                    </div>
                    <NuxtLink to="/profile" @click="showUserDropdown = false" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-brand-lavender hover:text-brand-purple transition-colors">
                      <span class="user-panel-icon bg-brand-lavender text-brand-purple">
                        <Settings stroke-width="1.75" />
                      </span>
                      Settings & Profile
                    </NuxtLink>
                    <NuxtLink to="/orders" @click="showUserDropdown = false" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-brand-lavender hover:text-brand-purple transition-colors">
                      <span class="user-panel-icon bg-brand-lavender text-brand-purple">
                        <Package stroke-width="1.75" />
                      </span>
                      Order History
                    </NuxtLink>
                    <div class="my-1 border-t border-gray-100"></div>
                    <button @click="auth.logout(); showUserDropdown = false" class="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                      <span class="user-panel-icon bg-red-50 text-red-500">
                        <LogOut stroke-width="1.75" />
                      </span>
                      Sign Out
                    </button>
                  </template>
                  <template v-else>
                    <button @click="auth.showLoginModal = true; auth.modalMode = 'login'; showUserDropdown = false" class="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-brand-purple hover:bg-brand-lavender transition-colors">
                      <span class="user-panel-icon bg-brand-lavender text-brand-purple">
                        <LogIn stroke-width="1.75" />
                      </span>
                      Sign In
                    </button>
                    <button @click="auth.showLoginModal = true; auth.modalMode = 'register'; showUserDropdown = false" class="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <span class="user-panel-icon bg-gray-100 text-gray-600">
                        <UserPlus stroke-width="1.75" />
                      </span>
                      Create Account
                    </button>
                  </template>
                </div>
              </div>

              <NuxtLink to="/cart" class="nav-icon-btn relative" aria-label="Shopping cart">
                <ShoppingCart class="w-[18px] h-[18px]" stroke-width="1.75" />
                <span
                  v-if="cart.totalItems > 0"
                  class="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[10px] font-semibold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center ring-2 ring-white"
                >
                  {{ cart.totalItems }}
                </span>
              </NuxtLink>
            </div>

            <button
              class="lg:hidden nav-icon-btn"
              @click="mobileMenuOpen = !mobileMenuOpen"
              aria-label="Toggle menu"
            >
              <X v-if="mobileMenuOpen" class="w-5 h-5" stroke-width="1.75" />
              <Menu v-else class="w-5 h-5" stroke-width="1.75" />
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <Transition name="mobile-menu">
          <div
            v-if="mobileMenuOpen"
            class="lg:hidden border-t border-gray-100 bg-white py-3 -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="mobileMenuOpen = false"
              :class="[
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors',
                isActiveLink(link.path)
                  ? 'bg-brand-lavender text-brand-purple'
                  : 'text-gray-700 hover:bg-gray-50',
              ]"
            >
              {{ link.name }}
            </NuxtLink>
            <div class="mt-2 pt-2 border-t border-gray-100 space-y-1">
              <button
                @click="auth.showLoginModal = true; auth.modalMode = 'login'; mobileMenuOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-purple rounded-lg hover:bg-brand-lavender transition-colors"
              >
                <CircleUserRound class="w-4 h-4" stroke-width="1.75" />
                Sign In
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Mobile Backdrop -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden fixed inset-0 top-16 bg-black/20 z-40 backdrop-blur-[1px]"
        @click="mobileMenuOpen = false"
      />

      <!-- Search Modal -->
      <div v-if="showSearch" class="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
        <div class="absolute inset-0 bg-brand-purple/20 backdrop-blur-xl" @click="showSearch = false" />
        <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-300">
          <div class="flex items-center gap-3 mb-6">
            <Search class="w-5 h-5 text-brand-purple shrink-0" stroke-width="1.75" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for pure fruit pulps..."
              class="flex-1 text-base sm:text-lg font-medium border-none outline-none text-gray-900 placeholder-gray-400 bg-transparent"
            />
            <button @click="showSearch = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X class="w-5 h-5 text-gray-400" stroke-width="1.75" />
            </button>
          </div>
          <div class="space-y-3">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Popular Searches</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in ['Mango Pulp', 'Jamun', 'Frozen Berry', 'Immunity Boost']"
                :key="tag"
                class="px-4 py-2 rounded-lg bg-brand-lavender hover:bg-brand-purple hover:text-white text-brand-purple text-xs font-medium transition-colors"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-nav {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.nav-icon-btn {
  @apply relative p-2 text-gray-600 hover:text-brand-purple hover:bg-white rounded-full transition-colors;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
