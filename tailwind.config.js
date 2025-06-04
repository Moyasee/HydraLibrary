/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./library.html",
    "./about.html",
    "./changelog.html",
    "./js/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'bg-emerald-600',
    'hover:bg-emerald-500',
    'focus:ring-emerald-500',
    'focus:ring-offset-gray-900',
    'bg-gray-800',
    'border-gray-700',
    'text-emerald-400',
    'text-gray-400',
    'bg-gray-900',
    'border-gray-800',
    'text-gray-300',
    'bg-gray-700',
    'border-gray-600',
    'text-amber-300',
    'focus:ring-amber-500',
    'focus:border-amber-500',
    'focus:ring-1',
    'focus:ring-2',
    'focus:outline-none',
    'transition-colors',
    'rounded',
    'rounded-t-lg',
    'rounded-b-lg',
    'p-4',
    'px-4',
    'py-2',
    'py-2.5',
    'py-3',
    'w-full',
    'text-xs',
    'text-sm',
    'font-medium',
    'min-h-[120px]',
    'resize-none',
    'flex',
    'items-center',
    'justify-center',
    'mr-2',
    'space-y-1',
    'space-y-4',
    'from-purple-900/40',
    'to-blue-900/40',
    'from-purple-500',
    'to-blue-500',
    'from-purple-300',
    'to-blue-300',
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'bg-clip-text',
    'text-transparent',
    'shadow-purple-500/20',
    'flex-col',
    'sticky',
    'top-6',
    'md:w-80',
    'flex-shrink-0'
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'pulse-border': 'pulseBorder 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'trophy-pulse': 'trophyPulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'text-shine': 'textShine 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        trophyPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        textShine: {
          'to': { 'background-position': '200% center' },
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
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        trophyPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        textShine: {
          'to': { 'background-position': '200% center' },
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

