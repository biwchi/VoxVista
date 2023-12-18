<script setup lang="ts">
type Props = {
  name?: string
}

const props = defineProps<Props>()

const { errorMessage, handleChange, value } = useField<boolean>(
  props.name ?? '',
)
</script>

<template>
  <ElFormItem :error="errorMessage">
    <ElCheckbox :model-value="value" v-bind="$attrs" @change="handleChange">
      <slot />
    </ElCheckbox>
  </ElFormItem>
</template>
