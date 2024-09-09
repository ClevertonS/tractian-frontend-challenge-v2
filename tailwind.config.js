/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      }
    },
    colors: {
      "plataform-header": "#17192D",
      "white": "#ffffff",
      "border-card": "#D8DFE6",
      "node-font": "#17192D",
      black: "#000000",
      gray: {
        150: "#E3EAEF",
        200: "#D8DFE6",
        600: "#77818C",
        950: "#24292F"
      },
      blue:{
        500: "#2188FF",
        900: "#023B78"
      },
      
    },
  },
  plugins: [],
}

