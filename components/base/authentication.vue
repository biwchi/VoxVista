<script setup lang="ts">
import type { FetchError } from 'oFetch'

import { object, string } from 'yup'

import type { DefaultResponseError } from '~/repository/types'

type Form = {
  email: string
  nickname: string
  password: string
}

const title = {
  login: 'Login',
  register: 'Register',
}

const { method } = defineProps<{ method: 'login' | 'register' }>()
const modelValue = defineModel<boolean>()

const validationSchema = object().shape({
  email: string().required('Email is required'),
  nickname: string().when([], {
    is: () => method === 'register',
    then: (schema) => schema.min(3).required('Nickname is required'),
  }),
  password: string().min(6).required('Password is required'),
})

const error = ref<DefaultResponseError>()

const { init, token } = useUserStore()
const { $api } = useNuxtApp()
const { handleSubmit, resetForm, setErrors } = useForm<Form>({
  validationSchema,
})

const setError = (err: FetchError<DefaultResponseError> | null) => {
  if (err?.data) {
    error.value = err.data
  }
}

const setToken = (data: { token: string } | null) => {
  if (data) {
    token.value = data.token
    error.value = undefined
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (method === 'login') {
    const { data, error: loginError } = await $api.auth.login(values)

    setError(loginError.value)
    setToken(data.value)
  }

  if (method === 'register') {
    const { data, error: registerError } = await $api.auth.register(values)

    setError(registerError.value)
    setToken(data.value)
  }

  if (error.value) {
    if (typeof error.value.message === 'string') {
      setErrors({ email: error.value.message })
    } else {
      setErrors(error.value.message)
    }

    return
  }

  await init()
  resetForm()
  modelValue.value = false
})
</script>

<template>
  <ClientOnly>
    <ElDialog v-model="modelValue" width="500px" :title="title[method]">
      <ElForm label-position="top" @submit="onSubmit">
        <slot />

        <button type="submit" class="hidden"></button>
      </ElForm>

      <template #footer>
        <ElButton type="primary" @click="onSubmit">
          {{ title[method] }}
        </ElButton>
      </template>
    </ElDialog>
  </ClientOnly>
</template>
