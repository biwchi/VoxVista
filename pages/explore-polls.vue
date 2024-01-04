<script setup lang="ts">
const { data: polls } = useFetch('/api/poll/all')
</script>

<template>
  <div class="space-y-4">
    <PollCard
      v-for="poll in polls"
      :key="poll.id"
      :comments="2"
      :likes="42"
      :description="poll.description"
      :title="poll.title"
      live
    />
  </div>
</template>
