/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        alfaSlab: ['Alfa Slab One', 'cursive'],
        yantramanav: ['Yantramanav', 'cursive'],
      },
    },
  },
  plugins: [],
};
