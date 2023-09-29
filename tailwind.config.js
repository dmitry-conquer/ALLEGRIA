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
          bg: "#F5F5F5",
          brand: "#4A85F6",
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
