<script setup lang="ts">
import { array, object, string } from 'yup'

import type { CreatePollForm } from '~/components/create-poll/form.vue'
import type { CreatePollRequest } from '~/repository/modules/PollModule/types';

const validationSchema = object().shape({
  description: string().required('Description is required'),
  options: array().of(string().required('Option value is required')),
  title: string().required('Title is required'),
})

const { $api } = useNuxtApp()
const { handleSubmit } = useForm<CreatePollForm>({
  initialValues: { options: ['', ''] },
  validationSchema,
})

const onSubmit = handleSubmit(async (values) => {
  const dates = values.dates || []
  const startDate = dates[0] && dates[0].toISOString()
  const endDate = dates[1] && dates[1].toISOString()
  delete values.dates

  const data: CreatePollRequest = {
    ...values,
    endDate,
    options: values.options.map((option) => ({ label: option })),
    startDate,
  }

  await $api.poll.createPoll(data)
})
</script>

<template>
  <ElCard shadow="never">
    <template #header>
      <h1 class="text-2xl font-medium">Create a new poll</h1>
    </template>

    <CreatePollForm @submit="onSubmit"/>

    <template #footer>
      <ElButton class="w-full" native-type="submit" type="primary" @click="onSubmit">
        Create poll
      </ElButton>
    </template>
  </ElCard>
</template>
