// tailwind.config.js
const { heroui, colors } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(navbar|tabs|toast|spinner).js"
  ],
  content: ["./node_modules/@heroui/theme/dist/components/navbar.js"],
  theme: {
    extend: {
      colors: {
        primary: "FFB400",
        dark: "#0B0B0B",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
