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
      script: [{
        src: 'https://app.sandbox.midtrans.com/snap/snap.js',
        'data-client-key': process.env.MIDTRANS_CLIENT_KEY, // ini diakses dari public runtime config nanti
        type: 'text/javascript'
      }]
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
  runtimeConfig: {
    midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
    public: {
      midtransClientKey: process.env.MIDTRANS_CLIENT_KEY
    }
  },
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