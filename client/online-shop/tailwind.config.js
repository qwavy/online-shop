const { mauve, violet } = require('@radix-ui/colors');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      roboto: ['Roboto', 'sans-serif'],
      readex: ["Readex Pro"]
    },
    extend: {
      colors: {
        ...mauve,
        ...violet,
      },
      boxShadow:{
        "basic":"0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)"
      }
    },
  },
  plugins: [],
}

