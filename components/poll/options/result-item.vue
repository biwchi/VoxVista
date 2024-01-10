<script setup lang="ts">
import type { Option } from './index.vue'

const props = defineProps<{ option: Option & { percentage: number } }>()

const lineWidth = `${props.option.percentage}%`

const selectedPollOption = ref(0)
const [showUserList, toggleUserList] = useToggle(false)

function openUserList(pollOptionId: number) {
  selectedPollOption.value = pollOptionId
  toggleUserList()
}
</script>

<template>
  <div :key="option.label" class="flex h-full gap-2">
    <div class="py-1.5 text-right">
      <span class="block text-xs font-semibold">
        {{ option.percentage }}%
      </span>

      <ElIcon v-if="option.isChosen" class="!text-primary-500">
        <ElIconCircleCheckFilled />
      </ElIcon>
    </div>

    <div class="w-full space-y-2">
      <span class="text-sm">{{ option.label }}</span>
      <ElTooltip :content="`${option.votes} votes`" placement="top">
        <div
          :style="{ maxWidth: lineWidth }"
          class="h-1 animate-[appear_0.3s_ease-in] cursor-pointer rounded-full bg-primary-500"
          @click="openUserList(option.id)"
        ></div>
      </ElTooltip>
    </div>
  </div>

  <PollOptionsUserList
    v-model="showUserList"
    :poll-option-id="selectedPollOption"
  />
</template>

<style>
@keyframes appear {
  from {
    width: 0;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  to {
    width: v-bind(lineWidth);
  }
}
</style>
