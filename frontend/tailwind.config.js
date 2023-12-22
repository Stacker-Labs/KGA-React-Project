/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "accent-blue": "#1976D2",
      },
      fontFamily: {
        logo: ["logo"],
      },
    },
  },
  plugins: [],
};
