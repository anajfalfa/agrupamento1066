/*module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // in case there's a src folder
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#006738",
          "green-dark": "#004d2a",
          gold: "#C5B358",
          "gold-light": "#D1C4A5",
          blue: "#00599c",
          red: "#e4022d",
          yellow: "#ffcb05",
          "blue-light": "#337ab7",
          "red-light": "#ff5c5c",
          "yellow-light": "#ffe066",
        }
      }
    },
  },
  plugins: [],
}