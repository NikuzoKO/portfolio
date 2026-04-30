/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          darkest: "#15152a",
          dark: "#1E1E3F",
          mid: "#6943FF",
          light: "#A599E9",
          accent: "#FAD000",
          pink: "#FB94FF",
          alert: "#FF628C",
          green: "#3AD900",
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
