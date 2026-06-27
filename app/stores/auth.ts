import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  showLoginModal: boolean;
  modalMode: 'login' | 'register';
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    showLoginModal: false,
    modalMode: 'login',
  }),
  actions: {
    async login(credentials: any) {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      this.loading = true;
      this.error = null;
      try {
        const response: any = await $fetch(`${apiBaseUrl}/api/auth/login`, {
          method: 'POST',
          body: credentials
        });
        this.token = response.token;
        this.user = response.user;
        // Save to localStorage or Cookie
        const tokenCookie = useCookie('auth_token');
        tokenCookie.value = response.token;
      } catch (err: any) {
        this.error = err.data?.error || 'Login failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async loginWithGoogle(idToken: string) {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      this.loading = true;
      this.error = null;
      try {
        const response: any = await $fetch(`${apiBaseUrl}/api/auth/google`, {
          method: 'POST',
          body: { idToken }
        });
        this.token = response.token;
        this.user = response.user;
        const tokenCookie = useCookie('auth_token');
        tokenCookie.value = response.token;
      } catch (err: any) {
        this.error = err.data?.error || 'Google login failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async register(userData: any) {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      this.loading = true;
      this.error = null;
      try {
        const response: any = await $fetch(`${apiBaseUrl}/api/auth/register`, {
          method: 'POST',
          body: userData
        });
        this.token = response.token;
        this.user = response.user;
        const tokenCookie = useCookie('auth_token');
        tokenCookie.value = response.token;
      } catch (err: any) {
        this.error = err.data?.error || 'Registration failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      const tokenCookie = useCookie('auth_token');
      tokenCookie.value = null;
    },
    async fetchUser() {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      const tokenCookie = useCookie('auth_token');
      if (!tokenCookie.value) {
        this.loading = false;
        return;
      }

      this.loading = true;
      try {
        const response: any = await $fetch(`${apiBaseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`
          }
        });
        this.user = response.data;
        this.token = tokenCookie.value as string;
      } catch (err) {
        this.logout();
      } finally {
        this.loading = false;
      }
    }
  }
});
