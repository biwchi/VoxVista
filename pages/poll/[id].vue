<script setup lang="ts">
import type { Option } from '~/components/poll/options/index.vue'

type Poll = {
  comments: number
  description: string
  id: number
  isMultiple: boolean
  isVoted?: boolean
  options: Option[]
  stars: number
  title: string
  votes: number
}

const options: Option[] = [
  { isChosen: true, label: 'Option 1', value: 'option-1', votes: 53 },
  { label: 'Option 2', value: 'option-2', votes: 11 },
  { label: 'Option 3', value: 'option-3', votes: 23 },
]

const selectedOption = ref<Option | Option[]>()

const poll = ref<Poll>({
  comments: 1,
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  id: 1,
  isMultiple: true,
  options,
  stars: 10,
  title: 'My Poll',
  votes: 100,
})

const stats = computed(() => [
  {
    color: '!text-blue-500',
    icon: ElIconCheck,
    label: 'Votes',
    value: poll.value.votes,
  },
  {
    color: '!text-blue-500',
    icon: ElIconChatRound,
    label: 'Comments',
    value: poll.value.comments,
  },
  {
    color: '!text-yellow-500',
    icon: ElIconStar,
    label: 'Stars',
    value: poll.value.stars,
  },
])

function vote() {
  if (!selectedOption.value) {
    return
  }

  // prettier-ignore
  const selected = Array.isArray(selectedOption.value) ? selectedOption.value : [selectedOption.value]
  const selectedLables = selected.map((s) => s.label)

  ElNotification.success(`Voted for ${selectedLables.join(', ')}!`)

  poll.value.isVoted = true
  poll.value.options = poll.value.options.map((option) => {
    option.isChosen = selected.includes(option)
    option.votes += option.isChosen ? 1 : 0

    return option
  })
}
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-bold">{{ poll.title }}</h1>
    <p class="text-gray-500">{{ poll.description }}</p>

    <div class="flex flex-col gap-4">
      <PollOptions
        v-model="selectedOption"
        :voted="poll.isVoted"
        :options="poll.options"
      />

      <ElButton :disabled="!selectedOption || poll.isVoted" type="primary" @click="vote">
        Vote
      </ElButton>

      <ul class="flex gap-4 text-lg">
        <li
          v-for="stat in stats"
          :key="stat.label"
          class="flex items-center gap-2"
          :class="stat.label == 'Stars' && 'flex-auto justify-end'"
        >
          <ElIcon :class="stat.color"><component :is="stat.icon" /></ElIcon>
          <span>{{ stat.label }}: {{ stat.value }}</span>
        </li>
      </ul>

      <div class="space-y-2">
        <h1 class="text-xl font-medium">Comments</h1>

        <PollComment/>
      </div>
    </div>
  </div>
</template>
