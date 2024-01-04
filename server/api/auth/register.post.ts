import { RegisterRequest, TokenResponse } from './types'

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterRequest>(event)

  return await $fetch<TokenResponse>('/auth/register', { method: 'POST', body: body })
})
