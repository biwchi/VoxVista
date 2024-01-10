<script setup lang="ts">
import type { PollComment } from '~/repository/modules/PollModule/types'

defineProps<{ comment: PollComment }>()
</script>

<template>
  <ElCard body-class="!p-4 space-y-2" shadow="never">
    <div class="flex items-center justify-between">
      <h1 class="text-lg">{{ comment.createdBy.nickname }}</h1>

      <span class="text-sm text-gray-500">
        {{ new Date(comment.createdAt).toLocaleString() }}
      </span>
    </div>

    <p class="text-sm text-gray-500">
      {{ comment.content }}
    </p>
  </ElCard>
</template>
