<script setup lang="ts">
import type { User } from '~/repository/modules/AuthModule/types'

type Props = {
  pollOptionId: number
}

const modelValue = defineModel<boolean>()
const props = defineProps<Props>()

const { $api } = useNuxtApp()
const users = ref<User[]>([])

watch(
  () => props.pollOptionId,
  async () => {
    const { data } = await $api.poll.getUsersFromPollOption(props.pollOptionId)

    if (data.value) {
      users.value = data.value
    }
  },
)
</script>

<template>
  <ClientOnly>
    <ElDialog v-model="modelValue" width="300px" title="Voters">
      <ul v-if="users.length" class="space-y-3">
        <li v-for="user in users" :key="user.id" class="flex gap-1">
          <ElAvatar :icon="ElIconUserFilled" size="small" />
          <span>{{ user.nickname }}</span>
        </li>
      </ul>

      <p v-else>No voters yet</p>
    </ElDialog>
  </ClientOnly>
</template>
