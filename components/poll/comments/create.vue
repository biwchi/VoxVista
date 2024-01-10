<script setup lang="ts">
import { object, string } from 'yup'

type Emits = {
  refresh: []
}

const emits = defineEmits<Emits>()
const pollId = inject<string>('pollId')

const { $api } = useNuxtApp()
const { handleSubmit, resetForm } = useForm<{ content: string }>({
  validationSchema: object({
    content: string().required('Comment is required'),
  })
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await $api.poll.createComment({
      content: values.content,
      pollId: Number(pollId) || -1,
    })

    resetForm()
    emits('refresh')
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <ElForm class="space-y-2" @submit.prevent="onSubmit">
    <span class="text-sm">Write a comment</span>
    
    <AppInput
      name="content"
      type="textarea"
      :autosize="{ minRows: 3 }"
      resize="none"
      show-word-limit
    />

    <div class="flex justify-end">
      <ElButton native-type="submit" type="primary" class="text-right">
        Add comment
      </ElButton>
    </div>
  </ElForm>
</template>
