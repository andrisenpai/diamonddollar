export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Diamond Ovale",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      script: [],
    },
  },
  devtools: { enabled: true },
  css: [
    // "gotham-fonts/css/gotham-rounded.css",
    "bootstrap/dist/css/bootstrap.css",
    'bootstrap-icons/font/bootstrap-icons.css',
    "@/assets/main.scss",
    '~/assets/_environment.scss'
  ],

  modules: [],
  ssr: false,
  vite: {
    assetsInclude: ['**/*.PNG'],
      define: {
        'process.env.DEBUG': false
      }
  },
  imports: {
    dirs: ["store"],
  }
});