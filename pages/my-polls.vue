<template>
  <div class="space-y-4">
    <PollCard
      v-for="i in 10"
      :key="i"
      :comments="2"
      :likes="42"
      description="Pull request description here Pull request description here"
      title="Pull"
      live
    />
  </div>
</template>
