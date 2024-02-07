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
        'suite': "url('/src/assets/SUITE.png')",
        'deluxe': "url('/src/assets/DELUXE.png')",
        'standard': "url('/src/assets/Standard.png')",
        'audi': "url('/src/assets/audi.png')",
        'benz': "url('/src/assets/benz.png')",
        'bmw': "url('/src/assets/bmw3.png')",
        'camry': "url('/src/assets/camry.png')",
        'civic': "url('/src/assets/civic.png')",
        'cruze': "url('/src/assets/cruze.png')",
        'mustang': "url('/src/assets/mustang.png')",
        'nissan': "url('/src/assets/nissan.png')",
        'tesla': "url('/src/assets/tesla.png')",
        'vw': "url('/src/assets/vw.png')",

      }
    },
  },
  plugins: [],
}

