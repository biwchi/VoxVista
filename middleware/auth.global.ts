import { useUserStore } from '../stores/user-store'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if(userStore.isAuthenticated) {
    return
  }

  // await userStore.init()
})