<script setup lang="ts">
export type Option = {
  isChosen?: boolean
  label: string
  value: string
  votes: number
}

type Props = {
  multiple?: boolean
  options: Option[]
  voted?: boolean
}

const props = defineProps<Props>()
const modelValue = defineModel<Option | Option[]>()

const totalVotes = computed(() => {
  return props.options.reduce((acc, opt) => acc + opt.votes, 0)
})

const optionsWithPercentenge = computed(() => {
  return props.options.map((option) => {
    const percentenge = Math.round((option.votes / totalVotes.value) * 100)

    return { ...option, percentenge }
  })
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
    <template v-if="!props.voted">
      <PollOptionsItem
        v-for="option in props.options"
        :key="option.value"
        :option="option"
        :selected="isOptionSelected(option)"
        @select="selectOption"
      />
    </template>

    <template v-else>
      <PollOptionsResultItem
        v-for="option in optionsWithPercentenge"
        :key="option.value"
        :option="option"
      />
    </template>
  </div>
</template>
