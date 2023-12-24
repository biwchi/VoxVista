import { ofetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const { baseURL } = useRuntimeConfig()

  globalThis.$fetch = ofetch.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL,
  })
})
