/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/src/assets/images/newback.png')",
      },
      colors: {
        primary: "#063a69",
        secondary: "#5BC7EA",
        "light-red": "#FFDADA",
        "dark-red": "#EB5757",
        "light-blue": "#E2F8FF",
        "dark-gray": "#333333",
        "light-gray": "#828282",
        "cotton-ball": "#F3F6FF",
      },
    },
  },
  plugins: [],
};
