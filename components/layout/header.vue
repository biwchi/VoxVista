<script setup lang="ts">
const route = useRoute()
const isTop = ref(false)

const links = [
  { title: 'Create poll', to: '/create-poll' },
  { title: 'Explore polls', to: '/explore-polls' },
  { title: 'My polls', to: '/my-polls' },
]

const isCurrent = (path: string) => {
  return route.path === path ? 'primary' : 'default'
}
</script>

<template>
  <header class="mb-10">
    <ElAffix :position="'top'" @change="(v) => (isTop = v)">
      <div :class="[isTop && 'shadow-md', 'transition']">
        <div class="m-auto flex max-w-7xl justify-between bg-white p-4">
          <h1 class="text-4xl font-bold">VoxVista</h1>

          <ul class="flex items-center justify-between gap-3">
            <li v-for="(link, idx) in links" :key="idx">
              <NuxtLink :to="link.to">
                <ElButton :type="isCurrent(link.to)" size="large">
                  {{ link.title }}
                </ElButton>
              </NuxtLink>
            </li>
          </ul>

          <div class="flex items-center">
            <ElAvatar>User</ElAvatar>
          </div>
        </div>
      </div>
    </ElAffix>
  </header>
</template>
