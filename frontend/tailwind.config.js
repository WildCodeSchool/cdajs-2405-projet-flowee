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
      boxShadow: {
        "t-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.05), 0 -2px 4px -1px rgba(0, 0, 0, 0.03)",
      },
      spacing: {},
      fontFamily: {},
    },
    plugins: [],
  },
};
