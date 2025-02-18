/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./library.html",
    "./about.html",
    "./js/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'pulse-border': 'pulseBorder 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        pulseBorder: {
          '0%, 100%': {
            'border-color': 'rgba(239, 68, 68, 0.1)',
          },
          '50%': {
            'border-color': 'rgba(239, 68, 68, 0.2)',
          },
        },
      },
    },
  },
  plugins: [],
}

