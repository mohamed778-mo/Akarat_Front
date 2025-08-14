/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#EC407A',
        'brand-purple': '#8E24AA',
        'brand-orange': '#F57C00',
        'brand-yellow': '#FBC02D',
      },
      fontFamily: {
        'brand': ['Cairo', 'sans-serif'],
        'sans': ['Tajawal', 'sans-serif'],
      },
      
    
 keyframes: {
        'slow-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 rgba(34, 197, 94, 0.7)' 
          },
          '50%': { 
            transform: 'scale(1.05)',
            'box-shadow': '0 0 0 10px rgba(34, 197, 94, 0)' 
          },
        },
      },
      animation: {
        'slow-pulse': 'slow-pulse 2.5s infinite',
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-gradient-brand': {
          '@apply bg-gradient-to-br from-brand-yellow via-brand-pink to-brand-purple bg-clip-text text-transparent': {},
        }
      })
    })
  ],
}