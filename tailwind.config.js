/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': "#1D3557",
        'secondary-color': '#4361EE'
      }
    },
  },
  plugins: [],
}