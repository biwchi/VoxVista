<script setup lang="ts">
type Props = {
  comments: number
  description: string
  isLive: boolean
  likes: number
  title: string
}

defineProps<Props>()
</script>

<template>
  <ElCard class="m-auto w-full max-w-xl" shadow="never">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      
      <span v-if="isLive" class="animate-pulse rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white"> LIVE </span>
    </div>

    <p class="text-sm text-gray-500">{{ description }}</p>

    <div class="flex items-center justify-between text-lg ">
      <div>
        <ElIconComment/>
        <span>{{ comments }}</span>
      </div>

      <div>
        <ElIconStar/>
        <span>{{ likes }}</span>
      </div>
    </div>
  </ElCard>
</template>
