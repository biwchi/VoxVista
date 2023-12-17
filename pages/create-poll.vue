<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

type CreatePollForm = {
  anonymous: boolean
  description: string
  endDate?: Date
  multiple: boolean
  options: { value: string }[]
  startDate?: Date
  title: string
}
const rules = reactive<FormRules<CreatePollForm>>({
  description: [
    {
      message: 'Please input a description',
      required: true,
      trigger: 'blur',
    },
  ],
  options: [
    {
      min: 2,
      required: true,
      trigger: 'blur',
      validator: (rule, value: CreatePollForm['options']) => {
        if (value.length < 2) {
          return new Error('Please add at least 2 options')
        }

        if (value.some((option) => option.value.trim() === '')) {
          return new Error('All options must have a value')
        }

        return true
      },
    },
  ],
  title: [
    {
      message: 'Please input a title',
      required: true,
      trigger: 'blur',
    },
  ],
})

const form = reactive<CreatePollForm>({
  anonymous: false,
  description: '',
  endDate: undefined,
  multiple: false,
  options: [{ value: '' }, { value: '' }],
  startDate: undefined,
  title: '',
})

const formRef = ref<FormInstance | null>(null)

async function submit(formInstance: FormInstance | null) {
  if (!formInstance) {
    return
  }

  await formInstance.validate(async (valid) => {
    if (valid) {
      console.log(form)
    }
  })
}

function addOption() {
  form.options.push({
    value: '',
  })
}

function deleteOption(idx: number) {
  if (form.options.length <= 2) {
    ElMessage.error('You must have at least 2 options')
    return
  }

  form.options.splice(idx, 1)
}
</script>

<template>
  <div class="m-auto max-w-2xl">
    <ElCard shadow="never">
      <template #header>
        <h1 class="text-2xl font-medium">Create a new poll</h1>
      </template>

      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        size="large"
        label-position="top"
      >
        <ElFormItem label="Poll title" prop="title">
          <ElInput v-model="form.title" />
        </ElFormItem>

        <ElFormItem label="Description" prop="description">
          <ElInput v-model="form.description" type="textarea" />
        </ElFormItem>

        <ul>
          <ElFormItem
            v-for="(option, idx) in form.options"
            :key="idx"
            :label="`Option ${idx + 1}`"
            :prop="`options`"
          >
            <div class="flex w-full gap-2">
              <ElInput v-model="option.value" />
              <ElButton
                type="danger"
                :icon="ElIconClose"
                @click="deleteOption(idx)"
              />
            </div>
          </ElFormItem>
        </ul>

        <div class="flex gap-2">
          <ElInput placeholder="Option title" />
          <ElButton type="primary" @click="addOption"> Add option </ElButton>
        </div>

        <ul>
          <ElCheckbox v-model="form.anonymous"> Anonymous poll </ElCheckbox>
          <ElCheckbox v-model="form.multiple">
            Allow multiple choices
          </ElCheckbox>
        </ul>

        <div class="flex gap-4">
          <ElFormItem label="Start date">
            <ElDatePicker v-model="form.startDate" class="!w-full" />
          </ElFormItem>

          <ElFormItem label="End date">
            <ElDatePicker v-model="form.endDate" class="!w-full" />
          </ElFormItem>
        </div>
      </ElForm>

      <template #footer>
        <ElButton class="w-full" type="primary" @click="submit(formRef)">
          Create poll
        </ElButton>
      </template>
    </ElCard>
  </div>
</template>
