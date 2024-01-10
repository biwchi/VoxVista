<script setup lang="ts">
import { array, date, lazy, object, string } from 'yup'

import type { CreatePollForm } from '~/components/create-poll/form.vue'
import type { CreatePollRequest } from '~/repository/modules/PollModule/types'

definePageMeta({
  middleware: 'auth'
})

const validationSchema = object().shape({
  dates: lazy((val) =>
    !Array.isArray(val)
      ? date().min(new Date(), "Date can't be in the past")
      : array()
          .of(date().min(new Date(), "Dates can't be in the past"))
          .required(),
  ),
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
  const dates = Array.isArray(values.dates)
    ? values.dates
    : [undefined, values.dates]

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

    <CreatePollForm @submit="onSubmit" />

    <template #footer>
      <ElButton
        class="w-full"
        native-type="submit"
        type="primary"
        @click="onSubmit"
      >
        Create poll
      </ElButton>
    </template>
  </ElCard>
</template>
