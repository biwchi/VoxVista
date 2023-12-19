<script setup lang="ts">
type Props = {
  endPlaceholder?: string
  label?: string
  name?: string
  range?: boolean
  startPlaceholder?: string
  time?: boolean
  timeRange?: boolean
}

const props = defineProps<Props>()

const type = computed(() => {
  if (props.range) {
    return 'daterange'
  }

  if (props.timeRange) {
    return 'datetimerange'
  }

  if(props.time) {
    return 'datetime'
  }
})

const { errorMessage, handleChange, value } = useField<Date>(props.name ?? '')
</script>

<template>
  <ElFormItem :label="label" :error="errorMessage">
    <ClientOnly>
      <ElDatePicker
        class="!w-full"
        :model-value="value"
        :type="type"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        v-bind="$attrs"
        @update:model-value="handleChange"
      />
    </ClientOnly>
  </ElFormItem>
</template>
