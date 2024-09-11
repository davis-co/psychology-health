/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      YekanBakh: ["YekanBakh"],
    },
    extend: {
      screens: {
        xs: "320px", // Extra Small devices
        sm: "640px", // Small devices
        md: "768px", // Medium devices
        lg: "1024px", // Large devices
        xl: "1280px", // Extra Large devices
      },
      colors: {
        ownPurple: {
          500: "#644DF6",
          600: "#4E38D4",
          700: "#3A27B2",
        },
        ownGreen: {
          200: "#009E19",
        },
        ownRed: {
          400: "#FF1F01",
        },
        ownGray: {
          100: "#F2F2F2",
          200: "#E6E6E6",
          300: "#C9C3C3",
          500: "#8C8C8C",
          600: "#737373",
          900: "#252525",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
}
