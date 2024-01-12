<script setup lang="ts">
const { $api } = useNuxtApp()
const { data: polls } = await $api.poll.getPolls()
</script>

<template>
  polls - {{ polls }}

  <div v-if="polls && polls.length" class="space-y-4">
    <PollCard
      v-for="poll in polls"
      :key="poll.id"
      :poll="poll"
    />
  </div>

  <div v-else>
    <ElEmpty :description="'No polls found =('"/>
  </div>
</template>
