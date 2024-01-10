export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  
  if(!userStore.isAuthenticated) {
    return navigateTo('/explore-polls')
  }
})