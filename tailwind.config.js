/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        udea: {
          DEFAULT: '#026937',
          50: '#eefbf3',
          100: '#d6f5e3',
          200: '#b0eacb',
          300: '#7cd8ad',
          400: '#46bf8b',
          500: '#23a370',
          600: '#026937',
          700: '#02542c',
          800: '#064325',
          900: '#063720',
          950: '#031f12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

