import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f6ff',
          100: '#e9ebff',
          200: '#c8ccff',
          300: '#a6adff',
          400: '#838cff',
          500: '#616cff',
          600: '#3e4dff',
          700: '#2938e6',
          800: '#1d2a99',
          900: '#141d66',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
