export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await $fetch('/auth/user', {
    headers: {
      Authorization: `Bearer ${body.token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
})
