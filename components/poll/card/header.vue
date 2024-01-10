<script setup lang="ts">
import type { Poll } from '~/repository/modules/PollModule/types'

const props = defineProps<{ poll: Poll }>()

const getEndTimeTooltip = () => {
  if (!props.poll.endDate) {
    return undefined
  }

  return `This poll will be ended on ${new Date(
    props.poll.endDate,
  ).toLocaleString()}`
}
</script>

<template>
  <div class="flex items-center justify-between">
    <NuxtLink :to="`poll/${poll.id}`">
      <h1 class="text-2xl font-semibold hover:text-primary-500 hover:underline">
        {{ poll.title }}
      </h1>
    </NuxtLink>

    <ElTooltip placement="top" :content="getEndTimeTooltip()">
      <span
        v-if="poll.started && !poll.ended"
        class="animate-pulse cursor-pointer rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white"
      >
        LIVE
      </span>
    </ElTooltip>
  </div>
</template>
