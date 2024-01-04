import { Poll } from './types'

export default defineEventHandler(async () => {
  try {
    return await $fetch<Poll[]>('/poll')
  } catch (error) {
    console.log(error)
  }
})
