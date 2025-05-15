/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          primary: '#1B1B1E',
          secondary: '#373F51',
        },
        teal: {
          DEFAULT: '#006666',
          50: '#E6F3F3',
          100: '#CCE6E6',
          200: '#99CCCC',
          300: '#66B3B3',
          400: '#339999',
          500: '#006666',
          600: '#005C5C',
          700: '#004D4D',
          800: '#003F3F',
          900: '#003333',
        },
      },
      boxShadow: {
        'enterprise': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'enterprise-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'border-flow': 'border-flow 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 2px rgba(139, 92, 246, 0.5), 0 0 4px rgba(139, 92, 246, 0.3), 0 0 8px rgba(139, 92, 246, 0.2), 0 0 16px rgba(139, 92, 246, 0.1), inset 0 0 8px rgba(139, 92, 246, 0.2)',
          },
          '50%': {
            'box-shadow': '0 0 4px rgba(139, 92, 246, 0.8), 0 0 8px rgba(139, 92, 246, 0.5), 0 0 16px rgba(139, 92, 246, 0.3), 0 0 32px rgba(139, 92, 246, 0.2), inset 0 0 16px rgba(139, 92, 246, 0.4)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
        },
        'border-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
    },
  },
  plugins: [],
};