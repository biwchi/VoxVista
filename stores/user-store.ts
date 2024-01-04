export const useUserStore = defineStore('user', {
  actions: {
    async init() {
      if (this.isAuthenticated) {
        return
      }

      const { data: user, error } = await useFetch('/api/auth/user', {
        body: {
          token: this.token
        },
        method: 'POST',
        server: false
      })
      if (error.value) {
        return
      }

      Object.assign(this.$state, user.value)
    },
    logout() {
      this.$state = {
        nickname: '',
        email: '',
        id: 0,
      }

      useLocalStorage('token', '').value = ''
    }
  },
  getters: {
    token: () => useLocalStorage('token', '').value,
    isAuthenticated: (state) => state.id !== 0,
  },
  state: () => ({
    nickname: '',
    email: '',
    id: 0,
  }),
})
