import { TokenResponse } from '~/server/api/auth/types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await $fetch<TokenResponse>('/auth/login', { method: 'POST', body: body })
})
