/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09090B',
        ink2: '#0F0F12',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F1D785',
          dim: '#8A7027',
        },
        haze: '#4C6EF5',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        script: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(76,110,245,0.18), transparent 60%)',
        'gold-sheen':
          'linear-gradient(100deg, transparent 20%, rgba(212,175,55,0.55) 45%, rgba(241,215,133,0.9) 50%, rgba(212,175,55,0.55) 55%, transparent 80%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-18px,0)' },
        },
        sheen: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        sheen: 'sheen 3.5s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [],
}
