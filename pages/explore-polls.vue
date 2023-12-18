<template>
  <div class="flex flex-col gap-4">
    <PollCard
      v-for="i in 10"
      :key="i"
      :comments="2"
      :likes="42"
      description="Pull request description here Pull request description here"
      title="Pull"
      is-live
    />
  </div>
</template>
