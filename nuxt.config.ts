export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Allegria",
      meta: [
        { name: "description", content: "Allegria" },
        { name: "keywords", content: "Allegria, Allegria, Allegria" },
        // { name: "robots", content: "noindex, nofollow" },
        // { name: "language", content: "English" },
        { name: "author", content: "Dmitry Conquer" },
      ],
    },
  },
  devtools: { enabled: false },

  spaLoadingTemplate: false,

  css: ["~/assets/styles/style.scss"],

  modules: ['nuxt-swiper', '@nuxtjs/supabase'],

  swiper: {
    modules: ['pagination', "parallax", "autoplay"], // all modules are imported by default
  },

  supabase: {
   redirect: false
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {
        grid: true,
        overrideBrowserslist: "last 2 versions",
        },
      ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
  },
})