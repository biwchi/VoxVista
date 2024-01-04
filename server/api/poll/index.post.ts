export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body)
  try {
    await $fetch('/poll', { method: 'POST', body: body })
  } catch (error) {
    console.error(error)
  }
})
