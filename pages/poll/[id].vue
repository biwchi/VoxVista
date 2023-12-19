<script setup lang="ts">
import type { Option } from '~/components/poll/options/index.vue'

type Poll = {
  comments: number
  description: string
  id: number
  multiple: boolean
  options: Option[]
  stars: number
  title: string
  voted?: Option[]
  votes: number
}

const options: Option[] = [
  { label: 'Option 1', value: 'option-1', votes: 100 },
  { label: 'Option 2', value: 'option-2', votes: 100 },
  { label: 'Option 3', value: 'option-3', votes: 100 },
]

const selectedOption = ref<Option | Option[]>()

const poll = ref<Poll>({
  comments: 1,
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  id: 1,
  multiple: true,
  options,
  stars: 10,
  title: 'My Poll',
  votes: 100,
})

const stats = computed(() => [
  { icon: ElIconCheck, label: 'Votes', value: poll.value.votes },
  { icon: ElIconChatRound, label: 'Comments', value: poll.value.comments },
  { icon: ElIconStar, label: 'Stars', value: poll.value.stars },
])

function vote() {
  if (!selectedOption.value) {
    return
  }

  const optionLabels = Array.isArray(selectedOption.value)
    ? selectedOption.value.map((o) => o.label)
    : [selectedOption.value.label]

  ElNotification.success(`Voted for ${optionLabels.join(', ')}!`)
}
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-bold">{{ poll.title }}</h1>
    <p class="text-gray-500">{{ poll.description }}</p>

    <div class="flex flex-col gap-4">
      <PollOptions
        v-model="selectedOption"
        :multiple="poll.multiple"
        :voted="poll.voted"
        :options="poll.options"
      />

      <ElButton :disabled="!selectedOption" type="primary" @click="vote">
        Vote
      </ElButton>

      <ul class="flex gap-2 text-lg">
        <li
          v-for="stat in stats"
          :key="stat.label"
          class="flex items-center gap-2"
        >
          <ElIcon><component :is="stat.icon" /></ElIcon>
          <span>{{ stat.label }}: {{ stat.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
