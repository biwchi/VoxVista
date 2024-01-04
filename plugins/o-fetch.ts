import { ofetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const { baseURL } = useRuntimeConfig()

  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      if (typeof localStorage !== 'undefined') {
        const token = useUserStore().token
        options.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    },
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL,
  })
})
