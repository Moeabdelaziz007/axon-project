const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        neutral: colors.slate,
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.red,
        accent: { 500: '#00C48C' },
      },
      spacing: {
        '1': '4px', '2': '8px', '3': '12px', '4': '16px',
        '5': '20px', '6': '24px', '8': '32px', '10': '40px',
        '12': '48px', '16': '64px', '20': '80px', '24': '96px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      animation: {
        'confetti': 'confetti 1.8s linear forwards',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 700ms ease-out both',
        'slide-up': 'slideUp 700ms ease-out both',
        'glow': 'glow 1500ms ease-in-out infinite',
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(-50vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(99,102,241,0.1)' },
          '100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.0)' },
        },
      },
    },
  },
  plugins: [],
}
