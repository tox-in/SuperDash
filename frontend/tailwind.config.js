/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Enables dark mode using 'dark' class
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#3b82f6',
          green: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}