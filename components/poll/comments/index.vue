<script setup lang="ts">
const id = inject<string>('pollId')

const { $api } = useNuxtApp()
const { data: comments, refresh } = await $api.poll.getAllComments(id || '')
const { isAuthenticated } = storeToRefs(useUserStore())
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-xl font-medium">Comments</h1>

    <PollCommentsCreate v-if="isAuthenticated" @refresh="refresh" />

    <template v-if="comments && comments.length">
      <PollCommentsItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </template>

    <ElEmpty v-else description="No comments yet" />
  </div>
</template>
