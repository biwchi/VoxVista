<script lang="ts" setup>
import type { Option } from '~/components/poll/options/index.vue'
import type { Poll } from '~/repository/modules/PollModule/types'
import type { Modify } from '~/repository/types'

type ClientPoll = Modify<
  Poll,
  {
    options: Option[]
  }
>

const { $api } = useNuxtApp()
const { isAuthenticated } = storeToRefs(useUserStore())
const route = useRoute()
const id =
  route.params.id instanceof Array ? route.params.id[0] : route.params.id

const selectedOption = ref<Option | Option[]>()

const { data: pollData, pending, refresh } = await $api.poll.getPoll(id)

const poll = computed<ClientPoll | undefined>(() => {
  if (!pollData.value) {
    return
  }

  return {
    ...pollData.value,
    options: pollData.value.options.map((opt) => ({
      ...opt,
      isChosen: false,
    })),
  }
})

async function vote() {
  if (!selectedOption.value || !poll.value) {
    return
  }

  const selected = Array.isArray(selectedOption.value)
    ? selectedOption.value
    : [selectedOption.value]
  const selectedLables = selected.map((s) => s.label)

  ElNotification.success(`Voted for ${selectedLables.join(', ')}!`)

  await $api.poll.voteForOption({
    optionsIds: selected.map((s) => s.id),
    pollId: poll.value.id,
  })

  await refresh()
}

provide('pollId', id)
watch(isAuthenticated, () => refresh())
</script>

<template>
  <div v-if="poll" class="space-y-2">
    <h1 class="text-2xl font-bold">{{ poll.title }}</h1>
    <p class="text-gray-500">{{ poll.description }}</p>

    <div v-loading="pending" class="flex flex-col gap-4">
      <PollOptions
        v-model="selectedOption"
        :multiple="poll.multiple"
        :options="poll.options"
        :voted="poll.voted"
      />

      <ElButton
        v-if="isAuthenticated"
        :disabled="!selectedOption || poll.voted"
        type="primary"
        @click="vote"
      >
        Vote
      </ElButton>

      <PollComments />
    </div>
  </div>
</template>
