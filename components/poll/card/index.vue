<script lang="ts" setup>
import type { Poll } from '~/repository/modules/PollModule/types'

defineProps<{ poll: Poll }>()
</script>

<template>
  <ElCard body-class="space-y-3" class="m-auto w-full max-w-xl" shadow="never">
    <PollCardHeader :poll="poll" />

    <p class="line-clamp-4 text-sm text-gray-500">
      {{ poll.description }}
    </p>

    <PollCardActions :poll-id="poll.id" :voted="poll.voted" />
  </ElCard>
</template>
