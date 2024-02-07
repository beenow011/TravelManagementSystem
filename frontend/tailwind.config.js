/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      banner: ["Protest Riot", "sans-serif"],

    },
    extend: {
      backgroundImage: {
        'login': "url('/src/assets/login.jpg')",
        'home': "url('/src/assets/home.png')",
        'banner': "url('/src/assets/banner.png')",
        'sketch': "url('/src/assets/homeart.jpg')",
        'hotel': "url('/src/assets/hotel.png')",
        'dinocar': "url('/src/assets/dinocar.png')",
        'elephant': "url('/src/assets/elephant.jpg')",

      }
    },
  },
  plugins: [],
}

