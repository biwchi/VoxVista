<script setup lang="ts">
import type { Option } from './index.vue'

type Emits = {
  (e: 'select', option: Option): void
}

type Props = {
  option: Option
  selected: boolean
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div
    class="flex cursor-pointer items-center gap-2"
    @click="$emit('select', option)"
  >
    <div class="relative h-3 w-3 rounded-full bg-white ring-1 ring-gray-300">
      <div
        :class="[
          'absolute h-2 w-2 translate-x-1/4 translate-y-1/4 rounded-full bg-primary-500 transition-transform',
          selected ? 'scale-100' : 'scale-0',
        ]"
      ></div>
    </div>

    <span>{{ option.label }}</span>
  </div>
</template>
