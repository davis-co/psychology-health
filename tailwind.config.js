// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     fontFamily: {
//       YekanBakh: ["YekanBakh"],
//     },
//     extend: {
//       screens: {
//         xs: "320px", // Extra Small devices
//         sm: "640px", // Small devices
//         md: "768px", // Medium devices
//         lg: "1024px", // Large devices
//         xl: "1280px", // Extra Large devices
//       },
//       colors: {
//         ownPurple: {
//           500: "#644DF6",
//           600: "#4E38D4",
//           700: "#3A27B2",
//         },
//         ownGreen: {
//           200: "#009E19",
//         },
//         ownRed: {
//           400: "#FF1F01",
//         },
//         ownGray: {
//           100: "#F2F2F2",
//           200: "#E6E6E6",
//           300: "#C9C3C3",
//           500: "#8C8C8C",
//           600: "#737373",
//           900: "#252525",
//         },
//         ownWhite:{
//           100:"#ffffff",
//           200:'#f7f7f7'
//         }
//       },
//     },
//   },
//   // eslint-disable-next-line no-undef
//   plugins: [require("@tailwindcss/forms")],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      YekanBakh: ["YekanBakh"],
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
