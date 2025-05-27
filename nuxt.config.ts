// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Top Up & Belanja Mudah, Aman dan Cepat',
      htmlAttrs: { lang: 'id' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Shinobo.my.id adalah platform top up Ovale, game, dan kebutuhan komputer dengan harga reseller termurah. Coba sekarang!' },
        { name: 'keywords', content: 'top up ovale, topup game murah, belanja komputer, reseller topup, diamond murah, shinobo.my.id' },
        { name: 'author', content: 'Shinobo Team' },
        { property: 'og:title', content: 'Diamond Ovale by Shinobo' },
        { property: 'og:description', content: 'Top up & belanja kebutuhan digital dengan harga reseller. Cepat, aman, dan terpercaya!' },
        { property: 'og:url', content: 'https://shinobo.my.id' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://shinobo.my.id/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Diamond Ovale by Shinobo' },
        { name: 'twitter:description', content: 'Top up & belanja kebutuhan digital dengan harga reseller. Cepat, aman, dan terpercaya!' },
        { name: 'twitter:image', content: 'https://shinobo.my.id/og-image.jpg' }
      ],
      script: [
        {
          src: 'https://app.sandbox.midtrans.com/snap/snap.js',
          type: 'text/javascript',
          tagPosition: 'bodyClose',
          'data-client-key': process.env.MIDTRANS_CLIENT_KEY
        }
      ]
    }
  },

  runtimeConfig: {
    midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
    public: {
      midtransClientKey: process.env.MIDTRANS_CLIENT_KEY
    }
  },

  devtools: { enabled: true },

  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '@/assets/main.scss',
    '~/assets/_environment.scss'
  ],

  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  sitemap: {
    siteUrl: 'https://shinobo.my.id',
    trailingSlash: false,
    routes: ['/', '/topup', '/belanja', '/reseller']
  },

  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: 'https://shinobo.my.id/sitemap.xml'
  },

  vite: {
    assetsInclude: ['**/*.PNG'],
    define: {
      'process.env.DEBUG': false
    },
      server: {
        allowedHosts: ['e8cf-36-64-21-115.ngrok-free.app','all']
      }
  },
  nitro: {
    preset: 'vercel' // ✅ ini pakai Node.js lambda, bukan edge
  },
  imports: {
    dirs: ['store']
  }
})
