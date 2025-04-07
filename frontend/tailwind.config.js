/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          cardBg: "var(--very-light)",
          projectStripes: "var(--light)",
          deliverableStripes: "var(--dark)",
          taskStripes: "var(--very-dark)",
          btnBG: "var(--dark)",
          btnText: "#ffffff",
          success: "var(--success)",
          error: "var(--error)",
          lightGray: "var(--light-gray)",
          gray: "var(--gray)",
          darkGray: "var(--dark-gray)",
          warning: "var(--base)",
          visitorBtnBG: "var(--base)",
          //role colors
          veryLight: "var(--very-light)",
          light: "var(--light)",
          base: "var(--base)",
          dark: "var(--dark)",
          veryDark: "var(--very-dark)",
        },
        red: "#D9495B",
        green: "#379C3B",
        lightgray: "#F3F3F3",
        gray: "#CFCFCF",
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
