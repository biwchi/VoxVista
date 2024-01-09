<script setup lang="ts">
const { $api } = useNuxtApp()
const { data: polls, pending } = await $api.poll.getPolls()

watch(polls, () => console.log(polls.value))
</script>

<template>
  <div v-if="!pending && polls" class="space-y-4">
    <PollCard
      v-for="poll in polls"
      :key="poll.id"
      :poll="poll"
    />
  </div>
</template>
