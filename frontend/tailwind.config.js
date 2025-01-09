/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orangebase: "#D98D44",
        orangelight: "#E3AB76",
        bluebase: "#4A65BE",
        bluelight: "#ABB7E1",
      },
      spacing: {},
      fontFamily: {},
    },
    plugins: [],
  },
};
