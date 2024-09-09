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
      gray: {
        150: "#E3EAEF"
      },
      blue:{
        500: "#2188FF",
        900: "#023B78"
      },
      
    },
  },
  plugins: [],
}

