/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#069DD9",
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
  plugins: [require("flowbite/plugin")],
};
