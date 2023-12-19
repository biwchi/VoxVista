<script setup lang="ts">
export type Option = {
  label: string
  value: string
  votes: number
}

type Props = {
  multiple?: boolean
  options: Option[]
  voted?: Option[]
}

const props = defineProps<Props>()
const modelValue = defineModel<Option | Option[]>()

const userVotes = computed(() => {
  props.options.map((o) => {})
})

function isOptionSelected(option: Option) {
  if (Array.isArray(modelValue.value)) {
    return modelValue.value.includes(option)
  }

  return modelValue.value === option
}

function deleteOption(option: Option) {
  if (Array.isArray(modelValue.value)) {
    const filteredOptions = modelValue.value.filter((o) => o !== option)

    if (filteredOptions.length < 1) {
      modelValue.value = undefined
      return
    }

    modelValue.value = filteredOptions
  }
}

function selectOption(option: Option) {
  if (isOptionSelected(option)) {
    deleteOption(option)
    return
  }

  if (props.multiple) {
    const storedOptions = Array.isArray(modelValue.value)
      ? modelValue.value
      : []
    modelValue.value = [...storedOptions, option]
    return
  }

  modelValue.value = option
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <template v-if="!props.voted?.length">
      <PollOptionsItem
        v-for="option in props.options"
        :key="option.value"
        :option="option"
        :selected="isOptionSelected(option)"
        @select="selectOption"
      />
    </template>

    <template v-else>
      <div v-for="option in props.voted" :key="option.value">
        <span>{{ option.label }}</span>
      </div>
    </template>
  </div>
</template>
