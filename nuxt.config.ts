import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

// const ONE_DAY = 60 * 60 * 24 * 1000
// const ONE_WEEK = ONE_DAY * 7

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    'nuxt-headlessui',
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  // colorMode: {
  //   classSuffix: '',
  // },
  nitro: {
    routeRules: {
      '/api/**': { proxy: `${process.env.USER_BACKEND_URL}/**` },
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: `${process.env.FRONTEND_URL}/api`,
      stripePk: process.env.STRIPE_PK,
    },
  },
  vueuse: {
    ssrHandlers: true,
  },
  plugins: [
    // { src: '~/plugins/animejs.ts', mode: 'client' },
  ],
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  pwa,
})
