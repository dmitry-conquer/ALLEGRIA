export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: {
          light: "#254A5A",
          dark: "#0F303F",
        },
        secondary: {
          DEFAULT: "#E64926",
        },
        soft: {
          light: "#EAE9E8",
          dark: "#CEC6C4",
        },
        admin: {
          primary: {
            DEFAULT: "#264cc8",
            light: "#4067e9",
            dark: "#1b368f",
          },
          secondary: {
            DEFAULT: "#f4f5fa",
            light: "#f7f7f8",
            dark: "#4d5056",
          },
          success: {
            DEFAULT: "#d1fae5",
            light: "#e3fcef",
            dark: "#166534",
          },
          danger: {
            DEFAULT: "#fee2e2",
            light: "#feeeee",
            dark: "#ef4444",
          },
          warning: {
            DEFAULT: "#ffb400",
            light: "#ffb547",
            dark: "#a37300",
          },
          text: {
            DEFAULT: "#79767e",
            light: "#b4b2b7",
            dark: "#676c74",
          },
        },
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        jost: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
