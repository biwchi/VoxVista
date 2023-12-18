<script setup lang="ts">
type Props = {
  error?: string
  label?: string
  name?: string
}

const props = defineProps<Props>()

const { errorMessage, handleChange, value } = useField<number | string>(props.name ?? '', {
  keepValueOnUnmount: false
})
</script>

<template>
  <ElFormItem :label="label" :error="error ?? errorMessage">
    <ElInput :model-value="value" v-bind="$attrs" @input="handleChange" />
  </ElFormItem>
</template>
