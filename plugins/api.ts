import PollModule from '~/repository/modules/PollModule'
import AuthModule from '~/repository/modules/AuthModule'

interface IApiInstance {
  auth: AuthModule
  poll: PollModule
}

export default defineNuxtPlugin(() => {
  const modules: IApiInstance = {
    auth: new AuthModule(),
    poll: new PollModule(),
  }

  return {
    provide: {
      api: modules,
    },
  }
})
