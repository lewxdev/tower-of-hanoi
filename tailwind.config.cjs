/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          100: "#F4F4F5",
          200: "#DFE0E1",
          300: "#BFC1C5",
          400: "#797C88",
          500: "#3A3D47",
          600: "#262831"
        },
        pink: "#DA69C1",
        blue: "#699DDA"
      },
      keyframes: {
        breathing: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        breathing: "breathing 5s ease infinite"
      },
      fontFamily: {
        brand: ["Odibee Sans", ...defaultTheme.fontFamily.sans],
        sans: ["Roboto Condensed", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
