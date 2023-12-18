<script setup lang="ts">
import { array, object, string } from 'yup'

type CreatePollForm = {
  anonymous: boolean
  date?: [Date, Date] | Date
  description: string
  multiple: boolean
  options: string[]
  title: string
}

const validationSchema = object().shape({
  description: string().required('Description is required'),
  options: array().of(string().required('Option value is required')),
  title: string().required('Title is required'),
})

const newOption = ref('')
const scheduled = ref(false)

const { errors, handleSubmit } = useForm<CreatePollForm>({
  initialValues: { options: ['', ''] },
  validationSchema,
})
const { fields, push, remove } = useFieldArray<string>('options')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

// It needs because of bad typing in errors object
const getError = (field: string) => {
  return errors.value[field as keyof typeof errors.value]
}

function addOption() {
  push(newOption.value)
  newOption.value = ''
}

function removeField(idx: number) {
  if (fields.value.length <= 2) {
    ElMessage.error('At least two options are required')
    return
  }

  remove(idx)
}
</script>

<template>
  <div class="m-auto max-w-2xl">
    <ElCard shadow="never">
      <template #header>
        <h1 class="text-2xl font-medium">Create a new poll</h1>
      </template>

      <ElForm label-position="top">
        <AppInput label="Poll title" name="title" />
        <AppInput label="Description" name="description" />

        <ul>
          <li v-for="(_, idx) in fields" :key="idx" class="relative flex">
            <AppInput
              class="w-full"
              :name="`options[${idx}]`"
              :label="`Option ${idx + 1}`"
              :error="getError(`options[${idx}]`)"
            />
            <ElButton
              round
              class="absolute right-2"
              size="small"
              type="danger"
              :icon="ElIconClose"
              @click="removeField(idx)"
            />
          </li>
        </ul>

        <div class="flex gap-2">
          <ElInput v-model="newOption" placeholder="Option title" />
          <ElButton type="primary" @click="addOption"> Add option </ElButton>
        </div>

        <div class="flex gap-2">
          <AppCheckbox name="anonymous"> Anonymous poll </AppCheckbox>
          <AppCheckbox name="multiple"> Allow multiple choices </AppCheckbox>
          <AppCheckbox v-model="scheduled" name="scheduled">
            Schedule poll
          </AppCheckbox>
        </div>

        <div class="flex gap-4">
          <AppDatePicker
            :time-range="scheduled"
            :label="scheduled ? 'Range' : 'End date'"
            name="date"
          />
        </div>
      </ElForm>

      <template #footer>
        <ElButton class="w-full" type="primary" @click="onSubmit">
          Create poll
        </ElButton>
      </template>
    </ElCard>
  </div>
</template>
