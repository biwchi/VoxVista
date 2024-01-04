<script setup lang="ts">
import type { FetchError } from 'oFetch'

import { object, string } from 'yup'

type Form = {
  email: string
  nickname: string
  password: string
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

const title = {
  login: 'Login',
  register: 'Register',
}

const token = useLocalStorage('token', '')
const error = ref<FetchError>()

const { handleSubmit } = useForm<Form>({ validationSchema })

const setError = (err: FetchError | null) => {
  if (err) {
    error.value = err
  }
}

const setToken = (data: { token: string } | null) => {
  if (data) {
    token.value = data.token
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (method === 'login') {
    const { data, error: loginError } = await useFetch('/api/auth/login', {
      body: values,
      method: 'POST',
    })

    setError(loginError.value)
    setToken(data.value)
  }

  if (method === 'register') {
    const { data, error: registerError } = await useFetch(
      '/api/auth/register',
      { body: values, method: 'POST' },
    )

    setError(registerError.value)
    setToken(data.value)
  }

  modelValue.value = false
})
</script>

<template>
  <ClientOnly>
    <ElDialog v-model="modelValue" width="500px" :title="title[method]">
      <ElForm label-position="top" @submit="onSubmit">
        <slot />
      </ElForm>

      <template #footer>
        <ElButton type="primary" @click="onSubmit">
          {{ title[method] }}
        </ElButton>ё
      </template>
    </ElDialog>
  </ClientOnly>
</template>
