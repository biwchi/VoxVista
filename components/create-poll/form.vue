<script setup lang="ts">
export type CreatePollForm = {
  anonymous: boolean
  dates?: [Date, Date] | Date
  description: string
  multiple: boolean
  options: string[]
  title: string
}

defineProps<{ onSubmit: () => void }>()

const newOption = ref('')
const scheduled = ref(false)

const errors = useFormErrors<CreatePollForm>()
const values = useFormValues<CreatePollForm>()

const { fields, push, remove } = useFieldArray<string>('options')

// It needs because of bad typing in errors object
function getError(field: string) {
  return errors.value[field as keyof CreatePollForm]
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

watch(scheduled, () => (values.value.dates = undefined))
</script>

<template>
  <ElForm label-position="top" @submit.prevent="onSubmit">
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
      <ElCheckbox v-model="scheduled"> Schedule poll </ElCheckbox>
    </div>

    <AppDatePicker
      placeholder="Select date"
      start-placeholder="Start date"
      end-placeholder="End date"
      :time-range="scheduled"
      :time="!scheduled"
      :label="scheduled ? 'Range' : 'End date'"
      name="dates"
    />

    <button type="submit" class="hidden"></button>
  </ElForm>
</template>
