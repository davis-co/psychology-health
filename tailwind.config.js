/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/davis-components/**/*.js",
  ],
  // plugins: [require("@tailwindcss/typography")],
  theme: {
    fontFamily: {
      IranSans: ["IranSans"],
    },
    screens: {
      xs: "303px", // Extra Small devices
      md: "672px", // Medium devices
      lg: "952px", // Large devices
      xl: "1160px", // XLarge
    },
    extend: {
      fontFamily: {
        300: ["IranSans300", "sans-serif"],
        400: ["IranSans400", "sans-serif"],
        500: ["IranSans500", "sans-serif"],
        600: ["IranSans600", "sans-serif"],
        700: ["IranSans700", "sans-serif"],
        800: ["IranSans800", "sans-serif"],
      },
      colors: {
        background: "#faffff",
        formItem: "#EEFEFF",
        formItem1: "#EEFEFF",
        formItem2: "#C7F0FF",
        formItem3: "#6dd7ff",
        formItemInput: "",
        success: "#02894C",
        error: "#960018",
        purple: {
          DEFAULT: "#644DF6",
          dark: "#4E38D4",
          darker: "#3A27B2",
        },
        red: {
          DEFAULT: "#960018",
        },
        gray: {
          DEFAULT: "#C9C3C3",
          lightest: "#F2F2F2",
          e4: "#E4E4E4",
          light: "#EBEBEB",
          e7: "#e7e7e7",
          ee: "#EEFEFF",
        },
        white: {
          DEFAULT: "#ffffff",
        },
      },
      fontSize: {
        "3xs": "0.5rem", //8px
        "2xs": "0.65rem", //10px
      },
      boxShadow: {
        primary: "0px 3px 8px 0px rgb(0 0 0 / 8%)",
        secondary: "0px 0px 4px 0px rgba(0, 64, 26, 0.2)",
        formItem: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        flipLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        flipBottom: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: " translateY(0%)" },
        },
        flipTop: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: " translateY(0%)" },
        },
        flipRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        flipLeft: "flipLeft 0.5s",
        flipBottom: "flipBottom 0.5s",
        flipTop: "flipTop 0.5s",
        flipRight: "flipRight 0.5s",
      },
    },
  },
};
