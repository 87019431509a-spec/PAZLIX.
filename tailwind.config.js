/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae3',
          300: '#b0b9c9',
          400: '#7d8a9f',
          500: '#5c6878',
          600: '#475160',
          700: '#3a414e',
          800: '#313640',
          900: '#1a1d24',
          950: '#0f1116',
        },
        brand: {
          50: '#eef9f3',
          100: '#d6f0e3',
          200: '#aee0c8',
          300: '#7acaa7',
          400: '#43ad82',
          500: '#22915f',
          600: '#15794c',
          700: '#11623f',
          800: '#0f4e34',
          900: '#0c402b',
          950: '#062418',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdca8',
          300: '#ffc270',
          400: '#ff9b37',
          500: '#ff7f0f',
          600: '#f06806',
          700: '#c74e07',
          800: '#9e3d0d',
          900: '#7f330e',
          950: '#451703',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
