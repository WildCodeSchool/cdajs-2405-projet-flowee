/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          tag: {
            default: "var(--very-light)",

            error: "var(--error)",
            ongoing: "var(--warning)",
            completed: "var(--success)",
          },

          cardBg: "var(--very-light)",
          projectStripes: "var(--light)",
          deliverableStripes: "var(--dark)",
          taskStripes: "var(--very-dark)",
          btnBG: "var(--base)",
          btnText: "#ffffff",
          success: "var(--success)",
          error: "var(--error)",

          lightGray: "var(--light-gray)",
          gray: "var(--gray)",
          darkGray: "var(--dark-gray)",
          warning: "var(--base)",
          visitorBtnBG: "#d98d44",
          //role colors
          veryLight: "var(--very-light)",
          light: "var(--light)",
          base: "var(--base)",
          dark: "var(--dark)",
          veryDark: "var(--very-dark)",
        },
        black: "#1e1e1e",
        red: "#D9495B",
        lightRed: "#FDF4F5",
        green: "#379C3B",
        lightgray: "#F3F3F3",
        gray: "#CFCFCF",
        orangeLight: "#faf1e7",
        blue: "#4a65be",
        blueDark: "#2b3a8e",
      },
      boxShadow: {
        "t-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.05), 0 -2px 4px -1px rgba(0, 0, 0, 0.03)",
        soft: "0 0px 12px rgba(0, 0, 0, 0.10)",
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
