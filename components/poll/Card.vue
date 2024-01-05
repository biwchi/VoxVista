<script setup lang="ts">
import type { Poll } from '~/repository/modules/PollModule/types'

const props = defineProps<{ poll: Poll }>()

// const info = [
//   { count: `${props.poll.comments} comments`, icon: ElIconChatRound },
//   { count: `${props.poll.likes} stars`, icon: ElIconStar },
// ]
</script>

<template>
  <ElCard body-class="space-y-3" class="m-auto w-full max-w-xl" shadow="never">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">{{ poll.title }}</h1>

      <span
        v-if="true"
        class="animate-pulse rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white"
      >
        LIVE
      </span>
    </div>

    <p class="text-sm text-gray-500">{{ poll.description }}</p>

    <!-- <ul class="flex items-center justify-between text-xl">
        <li
          v-for="({ icon, count }, idx) in info"
          :key="idx"
          class="flex items-center gap-2"
        >
          <ElIcon><component :is="icon" /></ElIcon>
          <span class="text-base text-gray-500">{{ count }}</span>
        </li>
      </ul> -->

    <div class="flex justify-between">
      <NuxtLink :to="`poll/${poll.id}`"><ElButton>Vote</ElButton></NuxtLink>
      <ElButton type="primary">Share</ElButton>
    </div>
  </ElCard>
</template>
