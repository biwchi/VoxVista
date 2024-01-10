<script setup lang="ts">
const route = useRoute()
const isTop = ref(false)

const { logout } = useUserStore()
const { isAuthenticated, user } = storeToRefs(useUserStore())

const links = computed(() => [
  {
    isHidden: !isAuthenticated.value,
    title: 'Create poll',
    to: '/create-poll',
  },
  { title: 'Explore polls', to: '/explore-polls' },
  { isHidden: !isAuthenticated.value, title: 'My polls', to: '/my-polls' },
])

const [isLoginModal, toggleLoginModal] = useToggle(false)
const [isRegisterModal, toggleRegisterModal] = useToggle(false)

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
            <li v-for="(link, idx) in links" v-show="!link.isHidden" :key="idx">
              <NuxtLink :to="link.to">
                <ElButton :type="isCurrent(link.to)" size="large">
                  {{ link.title }}
                </ElButton>
              </NuxtLink>
            </li>
          </ul>

          <div v-if="isAuthenticated" class="flex items-center gap-2">
            <div class="flex flex-col">
              <span class="text-sm font-medium leading-none">{{
                user.nickname
              }}</span>
              <span class="text-xs text-gray-500">{{ user.email }}</span>
            </div>
            <ElAvatar :icon="ElIconUserFilled" />
            <ElButton
              type="danger"
              :icon="ElIconSwitchButton"
              circle
              size="large"
              @click="logout()"
            />
          </div>

          <div v-else>
            <ElButton type="primary" @click="toggleLoginModal()">
              Login
            </ElButton>
            <ElButton @click="toggleRegisterModal()">Register</ElButton>
          </div>
        </div>
      </div>
    </ElAffix>

    <LayoutLoginModal v-model="isLoginModal" />
    <LayoutRegisterModal v-model="isRegisterModal" />
  </header>
</template>
