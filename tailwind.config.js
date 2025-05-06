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
    },
  },
  plugins: [],
};