/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkorange: "#D16309",
        midorange: "#D4711D",
        orangebase: "#D98D44",
        orangelight: "#E3AB76",
        verylightorange: "#E9BB8E",
        orangeBg: "#FAF1E7",
        darkblue: "#25335F",
        midblue: "#31447F",
        bluebase: "#4A65BE",
        bluelight: "#7A8ECF",
        verylightblue: "#EDF0FB",
        blueBg: "#DBE0F2",
      },
      boxShadow: {
        "t-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.05), 0 -2px 4px -1px rgba(0, 0, 0, 0.03)",
      },
      spacing: {},
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
    plugins: [],
  },
};
