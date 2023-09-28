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
    pageTransition: { name: "page", mode: "out-in" },
  },
  devtools: { enabled: false },
  runtimeConfig: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    public: {
      LIQPAY_PRIVATE_KEY: process.env.LIQPAY_PRIVATE_KEY,
      LIQPAY_PUBLIC_KEY: process.env.LIQPAY_PUBLIC_KEY,
    },
  },
  build: {
    transpile: ['@fawmi/vue-google-maps']
  },
  spaLoadingTemplate: false,
  routeRules: {
    "/profile": { ssr: false },
    "/cart": { ssr: false },
    "/policy": { ssr: false },
    "/receipt": { ssr: false },
  },
  css: ["~/assets/styles/style.scss"],

  modules: [
    "nuxt-swiper",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-delay-hydration",
    "nuxt-simple-sitemap"
  ],
  pinia: {
    autoImports: ["defineStore"],
  },

  swiper: {
    modules: ["pagination", "parallax", "autoplay"], // all modules are imported by default
  },

  supabase: {
    redirect: false,
  },
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === "development",
    mode: "mount",
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
});
