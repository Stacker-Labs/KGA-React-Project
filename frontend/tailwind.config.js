/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-blue": "#1976D2",
      },
      fontFamily: {
        logo: ["LuckiestGuy-Regular"],
      },
    },
  },
  plugins: [],
};
