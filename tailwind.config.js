/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './app/components/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': {
          DEFAULT: '#50267C',
          dark: '#3D1D5F',
          light: '#6B3AA3',
        },
        'brand-green': {
          DEFAULT: '#749D3A',
          dark: '#5D7E2E',
          light: '#8CBF46',
        },
        'brand-lavender': {
          DEFAULT: '#F7F3FF',
          hover: '#E8DFFC',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'brand': '15px',
        'brand-lg': '20px',
      },
      boxShadow: {
        'brand': '0 4px 20px rgba(80, 38, 124, 0.08)',
        'brand-hover': '0 8px 30px rgba(80, 38, 124, 0.12)',
      }
    },
  },
  plugins: [],
}

