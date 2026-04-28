/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c8102e', // CPCR Red
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#c8102e', 
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#450a0a',
        },
        secondary: {
          DEFAULT: '#1a1a1a', // Black
        },
        sidebar: '#FFFFFF',
        background: '#F8FAFB',
        surface: '#FFFFFF',
        content: '#1A1B1F',
        subtext: '#64748B',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
