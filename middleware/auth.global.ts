import { useUserStore } from '../stores/user-store'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  await userStore.init()
})