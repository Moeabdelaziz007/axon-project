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
        // Design tokens from CSS variables
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        secondary: '#f97316',
        success: {
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        warning: '#f59e0b',
        info: '#3b82f6',
        // Legacy colors
        neutral: colors.slate,
        accent: { 500: '#00C48C' },
        // Axon Quantum Theme
        carbon: {
          900: '#0B0F18',
          800: '#10141C',
        },
        spaceGray: {
          900: '#23262A',
          800: '#282C34',
        },
        neon: {
          500: '#00FFB9',
          600: '#00FF6A',
          400: '#48FFEA',
        },
        cyberViolet: {
          600: '#7310FF',
          500: '#6141F7',
        },
        mediumGray: '#7C8892',
        axonWhite: '#F6F6F6',
      },
      spacing: {
        '1': '4px', '2': '8px', '3': '12px', '4': '16px',
        '5': '20px', '6': '24px', '8': '32px', '10': '40px',
        '12': '48px', '16': '64px', '20': '80px', '24': '96px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        arabic: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'confetti': 'confetti 1.8s linear forwards',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 700ms ease-out both',
        'slide-up': 'slideUp 700ms ease-out both',
        'glow': 'glow 1500ms ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
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
        pulseGlow: {
          '0%': { filter: 'drop-shadow(0 0 0 rgba(0,255,185,0.0))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(0,255,185,0.5))' },
          '100%': { filter: 'drop-shadow(0 0 0 rgba(0,255,185,0.0))' },
        },
      },
    },
  },
  plugins: [],
}
