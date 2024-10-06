
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      yekan300: ["YekanBakh300", "sans-serif"],
      yekan400: ["YekanBakh400", "sans-serif"],
      yekan600: ["YekanBakh600", "sans-serif"],
      yekan700: ["YekanBakh700", "sans-serif"],
      yekan800: ["YekanBakh800", "sans-serif"],
      yekan900: ["YekanBakh900", "sans-serif"],
  },
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        mainBox:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.60) 0%, rgba(250, 254, 251, 0.60) 100%)",
        purple: {
          DEFAULT: "#644DF6",
          dark: "#4E38D4",
          darker: "#3A27B2",
        },
        green: {
          light: "#009E19",
          DEFAULT: "#02894C",
        },
        red: {
          light: "#FF1F01",
          DEFAULT: "#960018",
        },
        gray: {
          lightest: "#F2F2F2",
          lighter: "#E6E6E6",
          light: "#EBEBEB",
          e4: "#E4E4E4",
          d6: "#d6d6d6",
          DEFAULT: "#C9C3C3",
          dark: "#8C8C8C",
          darker: "#737373",
          darkest: "#252525",
        },
        white: {
          DEFAULT: "#ffffff",
          light: "#f7f7f7",
        },
      },
      fontSize: {
        lg: "15px",
        xs: "8px",
        sm: "10px",
        md: "12px",
    },
      fontFamily: {
        yekan300: ["YekanBakh300", "sans-serif"],
        yekan400: ["YekanBakh400", "sans-serif"],
        yekan600: ["YekanBakh600", "sans-serif"],
        yekan700: ["YekanBakh700", "sans-serif"],
        yekan800: ["YekanBakh800", "sans-serif"],
        yekan900: ["YekanBakh900", "sans-serif"],
      },
      boxShadow: {
        mainBox: "0px 0px 4px 0px rgba(0, 64, 26, 0.20)",
        formItemLarge: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
        primary: "0px 3px 8px 0px rgb(0 0 0 / 8%)",
      },
      backdropBlur: {
        default: "3px",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
}
