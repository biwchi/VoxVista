export const useUserStore = defineStore('user', {
  actions: {
    async init() {
      if (this.isAuthenticated) {
        return
      }

      const { $api } = useNuxtApp()
      const { error, data } = await $api.auth.getCurrentUser()

      if (error.value) {
        return
      }

      if (data.value) {
        this.$state = data.value
      }
    },
    logout() {
      this.clearToken()
      this.$state = {
        nickname: '',
        email: '',
        id: 0,
      }
    },
    setToken(token: string) {
      this.token.value = token
    },
    clearToken() {
      this.token.value = ''
    },
  },
  getters: {
    token: () => useCookie('token', { watch: true }),
    isAuthenticated: (state) => state.id !== 0,
  },
  state: () => ({
    nickname: '',
    email: '',
    id: 0,
  }),
})
