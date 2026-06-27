interface Bundle {
  size: number;
  price: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  shippingCost: number;
  category: string;
  images: string[];
  stock: number;
  isFeatured: boolean;
  bundles: Bundle[];
}

const STATIC_PRODUCTS: Product[] = [
  {
    _id: 'static-1',
    name: 'Organic Jamun Pulp',
    description: 'Deep purple, thick, and fiber-less pulp made from wild-harvested Jamun. No added sugar or preservatives. Perfect for smoothies and diabetic-friendly snacks.',
    price: 380,
    shippingCost: 50,
    category: 'Fruit Pulps',
    images: ['/products/jamun-pulp.png'],
    stock: 25,
    isFeatured: true,
    bundles: [{ size: 500, price: 380 }]
  },
  {
    _id: 'static-2',
    name: 'Organic Alphonso Mango Pulp',
    description: 'Luscious, thick, and fiber-less pulp made from the finest handpicked Alphonso mangoes. No added sugar or preservatives. Authentic taste of summer.',
    price: 350,
    shippingCost: 50,
    category: 'Fruit Pulps',
    images: ['/products/mango-pulp.png'],
    stock: 50,
    isFeatured: true,
    bundles: [{ size: 850, price: 350 }]
  },
  {
    _id: 'static-3',
    name: 'Wild Sitaphal (Custard Apple) Pulp',
    description: 'Truly natural and creamy Custard Apple pulp. Hand-extracted from premium fruits sourced from tribal forests. Naturally sweet and rich.',
    price: 420,
    shippingCost: 55,
    category: 'Fruit Pulps',
    images: ['/products/sitaphal-pulp.png'],
    stock: 15,
    isFeatured: false,
    bundles: [{ size: 500, price: 420 }]
  },
  {
    _id: 'static-4',
    name: 'Pink Guava Pulp',
    description: 'Vibrant pink, fragrant, and thick guava pulp. Rich in Vitamin C and fiber. Sourced from organic orchards to ensure premium quality.',
    price: 320,
    shippingCost: 45,
    category: 'Fruit Pulps',
    images: ['/products/guava-pulp.png'],
    stock: 30,
    isFeatured: false,
    bundles: [{ size: 500, price: 320 }]
  },
  {
    _id: 'static-5',
    name: 'Indian Gooseberry (Amla) Pulp',
    description: 'Pure and potent Amla pulp. Cold-processed to retain all nutrients and Vitamin C. A natural powerhouse for immunity and wellness.',
    price: 290,
    shippingCost: 40,
    category: 'Fruit Pulps',
    images: ['/products/amla-pulp.png'],
    stock: 40,
    isFeatured: true,
    bundles: [{ size: 500, price: 290 }]
  }
];

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    topSellers: [] as Product[],
    loading: false,
    topSellersLoading: false,
    error: null as string | null
  }),
  actions: {
    formatImageUrl(url: string | undefined) {
      if (!url) return '/no-photo.jpg'
      if (url.startsWith('http') || url.startsWith('/products/')) return url

      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      const normalizedUrl = url.replace(/\\/g, '/')
      return `${apiBaseUrl}${normalizedUrl}`
    },
    async fetchProducts() {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      this.loading = true;
      try {
        const response: any = await $fetch(`${apiBaseUrl}/api/products`);
        this.products = response.data;
        this.error = null;
      } catch (err: any) {
        console.warn('API Fetch failed, using static fallback products');
        this.products = [...STATIC_PRODUCTS];
        this.error = 'Showing local selection (Offline Mode)';
      } finally {
        this.loading = false;
      }
    },
    async fetchTopSellers() {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      this.topSellersLoading = true
      try {
        const response: any = await $fetch(`${apiBaseUrl}/api/products/top-sellers`)
        this.topSellers = response.data || []
      } catch (err) {
        console.warn('Failed to fetch top sellers from API')
        this.topSellers = []
      } finally {
        this.topSellersLoading = false
      }
    },
    async fetchProduct(id: string) {
      const staticProduct = STATIC_PRODUCTS.find(p => p._id === id);
      if (staticProduct) return staticProduct;

      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      try {
        const response: any = await $fetch(`${apiBaseUrl}/api/products/${id}`);
        return response.data;
      } catch (err) {
        return null;
      }
    }
  }
});
