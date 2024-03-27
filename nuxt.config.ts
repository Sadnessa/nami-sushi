// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Neucha: true,
          "PT Sans Narrow": true,
          Ubuntu: true,
        },
      },
    ],
    "nuxt-icon",
    "nuxt-viewport",
  ],

  viewport: {
    breakpoints: {
      xs: 320,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      "2xl": 1400,
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  supabase: {
    redirect: false,
  },

  routeRules: {
    "/": { redirect: "/category?type=1" },
  },

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
});
