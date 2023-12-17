import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', '@element-plus/nuxt'],
  vue: {
    defineModel: true,
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
})
