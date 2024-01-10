<script setup lang="ts">
export type Option = {
  id: number
  isChosen?: boolean
  label: string
  votes: number
}

type Props = {
  multiple?: boolean
  options: Option[]
  voted?: boolean
}

const { isAuthenticated } = storeToRefs(useUserStore())
const props = defineProps<Props>()
const modelValue = defineModel<Option | Option[]>()

const totalVotes = computed(() => {
  return props.options.reduce((acc, opt) => acc + opt.votes, 0)
})

const optionsWithPercentage = computed(() => {
  return props.options.map((option) => {
    const percentage = Math.round((option.votes / totalVotes.value) * 100)

    return { ...option, percentage }
  })
})

function isOptionSelected(option: Option) {
  if (Array.isArray(modelValue.value)) {
    return modelValue.value.some((o) => o.id === option.id)
  }

  return modelValue.value?.id === option.id
}

function deleteOption(option: Option) {
  if (Array.isArray(modelValue.value)) {
    const filteredOptions = modelValue.value.filter((o) => o.id !== option.id)

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
    <template v-if="isAuthenticated && !props.voted">
      <PollOptionsItem
        v-for="option in props.options"
        :key="option.label"
        :option="option"
        :selected="isOptionSelected(option)"
        @select="selectOption"
      />
    </template>

    <template v-else>
      <PollOptionsResultItem
        v-for="option in optionsWithPercentage"
        :key="option.label"
        :option="option"
      />
    </template>
  </div>
</template>
