<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { $api } = useNuxtApp()
const { data: polls } = await $api.poll.getUsersPolls()
</script>

<template>
  <div v-if="polls && polls.length" class="space-y-4">
    <PollCard
      v-for="poll in polls"
      :key="poll.id"
      :poll="poll"
    />
  </div>

  <div v-else>
    <ElEmpty description="You don't have any polls"/>
  </div>
</template>
