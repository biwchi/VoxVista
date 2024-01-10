export const useUserStore = defineStore('user', {
  actions: {
    async init() {
      if (this.isAuthenticated || !this.token.value) {
        return
      }

      const { $api } = useNuxtApp()
      const { error, data } = await $api.auth.getCurrentUser()

      if (error.value) {
        return
      }

      if (data.value) {
        this.isAuthenticated = true
        this.user = data.value
      }
    },
    logout() {
      this.clearToken()
      this.isAuthenticated = false
      this.user = {
        nickname: '',
        email: '',
        id: 0,
      }

      navigateTo('/explore-polls')
    },
    setToken(token: string) {
      this.token.value = token
    },
    clearToken() {
      this.token.value = ''
    },
  },
  state: () => ({
    user: {
      nickname: '',
      email: '',
      id: 0,
    },
    isAuthenticated: false,
  }),
  getters: {
    token: () => useCookie('token', { watch: true }),
  },
})
