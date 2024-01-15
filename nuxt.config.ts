// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase', 
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Neucha: true,
        },
      },
    ],
  ],

  supabase: {
    redirect: false,
  }
});
