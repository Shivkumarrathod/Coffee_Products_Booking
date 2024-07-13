/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
       'custom-mixed': '0 0 6px red, 0 0 6px blue,0 0 10px pink',
      },
      fontFamily: {
        cursive: ['"Dancing Script"', 'cursive'],
        sans: ['Roboto', 'sans-serif'],

      },
    },
  },
  plugins: [],
}