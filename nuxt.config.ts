import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@vee-validate/nuxt',
  ],
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },
  runtimeConfig: {
    baseURL: process.env.NUXT_BASE_URL,
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
