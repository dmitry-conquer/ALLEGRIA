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
        }
       },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'jost': ['Jost', 'sans-serif'],
      },
     },
   },
 };