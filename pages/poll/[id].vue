<script setup lang="ts">
import type { Option } from '~/components/poll/options/index.vue'
import type { Poll } from '~/repository/modules/PollModule/types'
import type { Modify } from '~/repository/types'

type ClientPoll = Modify<
  Poll,
  {
    options: Option[]
  }
>

const $api = useNuxtApp().$api
const route = useRoute()
const id =
  route.params.id instanceof Array ? route.params.id[0] : route.params.id

const selectedOption = ref<Option | Option[]>()

const { data, pending, refresh } = await $api.poll.getPoll(id)

const poll = computed<ClientPoll | undefined>(() => {
  if (!data.value) {
    return
  }

  return {
    ...data.value,
    options: data.value.options.map((opt) => ({
      ...opt,
      isChosen: false,
    })),
  }
})

// const stats = computed(() => [
//   {
//     color: '!text-blue-500',
//     icon: ElIconCheck,
//     label: 'Votes',
//     value: poll.value.votes,
//   },
//   {
//     color: '!text-blue-500',
//     icon: ElIconChatRound,
//     label: 'Comments',
//     value: poll.value.comments,
//   },
//   {
//     color: '!text-yellow-500',
//     icon: ElIconStar,
//     label: 'Stars',
//     value: poll.value.stars,
//   },
// ])

async function vote() {
  if (!selectedOption.value || !poll.value) {
    return
  }

  // prettier-ignore
  const selected = Array.isArray(selectedOption.value) ? selectedOption.value : [selectedOption.value]
  const selectedLables = selected.map((s) => s.label)

  ElNotification.success(`Voted for ${selectedLables.join(', ')}!`)

  await $api.poll.voteForOption({
    optionsIds: selected.map((s) => s.id),
    pollId: poll.value.id,
  })

  refresh()
}
</script>

<template>
  <div v-if="poll" class="space-y-2">
    <h1 class="text-2xl font-bold">{{ poll.title }}</h1>
    <p class="text-gray-500">{{ poll.description }}</p>

    <div class="flex flex-col gap-4">
      <PollOptions
        v-model="selectedOption"
        :voted="poll.voted"
        :options="poll.options"
        :multiple="poll.multiple"
      />

      <ElButton
        :disabled="!selectedOption || poll.voted"
        type="primary"
        @click="vote"
      >
        Vote
      </ElButton>

      <!-- <ul class="flex gap-4 text-lg">
        <li
          v-for="stat in stats"
          :key="stat.label"
          class="flex items-center gap-2"
          :class="stat.label == 'Stars' && 'flex-auto justify-end'"
        >
          <ElIcon :class="stat.color"><component :is="stat.icon" /></ElIcon>
          <span>{{ stat.label }}: {{ stat.value }}</span>
        </li>
      </ul> -->

      <div class="space-y-2">
        <h1 class="text-xl font-medium">Comments</h1>

        <PollComment />
      </div>
    </div>
  </div>

  <p v-else>loading .......</p>
</template>
