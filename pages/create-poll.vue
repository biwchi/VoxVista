<script setup lang="ts">
import { array, object, string } from 'yup'

import type { CreatePollForm } from '~/components/create-poll/form.vue'

const validationSchema = object().shape({
  description: string().required('Description is required'),
  options: array().of(string().required('Option value is required')),
  title: string().required('Title is required'),
})

const { handleSubmit } = useForm<CreatePollForm>({
  initialValues: { options: ['', ''] },
  validationSchema,
})

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
})
</script>

<template>
  <ElCard shadow="never">
    <template #header>
      <h1 class="text-2xl font-medium">Create a new poll</h1>
    </template>

    <CreatePollForm />

    <template #footer>
      <ElButton class="w-full" type="primary" @click="onSubmit">
        Create poll
      </ElButton>
    </template>
  </ElCard>
</template>
