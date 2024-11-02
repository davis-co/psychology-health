/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      fontFamily: {
          IranSans: ["IranSans"],
      },
      extend: {
          screens: {
              xs: "320px", // Extra Small devices
              sm: "480px", // Small devices
              md: "768px", // Medium devices
              lg: "1024px", // Large devices
              xl: "1280px", // Extra Large devices
          },
          fontFamily: {
              300: ["IranSans300", "sans-serif"],
              400: ["IranSans400", "sans-serif"],
              600: ["IranSans600", "sans-serif"],
              700: ["IranSans700", "sans-serif"],
          },
          colors: {
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
                  error: "#960018",
              },
              gray: {
                  lightest: "#F2F2F2",
                  lighter: "#E6E6E6",
                  e4: "#E4E4E4",
                  d6: "#d6d6d6",
                  light: "#EBEBEB",
                  DEFAULT: "#C9C3C3",
                  dark: "#8C8C8C",
                  darker: "#737373",
                  darkest: "#252525",
                  e7: "#e7e7e7",
                  e9: "#e9e9e9",
                  de: "#dedede", // button disabled bg
                  "7e": "#7e7e7e", // button title color on disabled mode
              },
              white: {
                  DEFAULT: "#ffffff",
                  light: "#f7f7f7",
                  lighter: "#faffff",
              },
          },
          fontSize: {
              "2xs": "0.5rem", // 8px
              tiny: "0.625rem", // 10px
              sm:"12px",
              md:"14px",
              lg:"16px"
          },
          boxShadow: {
              primary: "0px 3px 8px 0px rgb(0 0 0 / 8%)",
              secondary: "0px 0px 4px 0px rgba(0, 64, 26, 0.2)",
              box: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          },
      },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
}
