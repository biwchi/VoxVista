<script setup lang="ts">
const { pollId } = defineProps<{ pollId: number; voted: boolean }>()

const copied = ref(false)

const copyPollLink = () => {
  navigator.clipboard.writeText(window.location.origin + `/poll/${pollId}`)
  
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="flex items-center justify-between">
    <NuxtLink v-if="!voted" :to="`/poll/${pollId}`">
      <ElButton>Vote</ElButton>
    </NuxtLink>

    <span v-else class="text-sm font-medium">You already voted</span>

    <ElTooltip placement="top" :content="copied ? 'Copied!' : 'Copy poll link'">
      <ElButton type="primary" @click="copyPollLink()"> Share </ElButton>
    </ElTooltip>
  </div>
</template>
