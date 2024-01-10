import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },
  app: {
    pageTransition: { mode: 'out-in', name: 'page' },
  },
  veeValidate: {
    autoImports: true,
  },
  vue: {
    defineModel: true,
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
})
