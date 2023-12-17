<script setup lang="ts"></script>

<template>
  <header>
    <div class="m-auto mb-10 flex max-w-7xl justify-between p-4">
      <h1 class="text-4xl font-bold">VoxVista</h1>

      <ul class="flex items-center justify-between gap-3">
        <li>
          <NuxtLink to="/create-poll">
            <ElButton size="large">Create poll</ElButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/explore-poll">
            <ElButton size="large">Explore poll</ElButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/my-polls"
            ><ElButton size="large">My polls</ElButton>
          </NuxtLink>
        </li>
      </ul>

      <div class="flex items-center">
        <ElAvatar>User</ElAvatar>
      </div>
    </div>
  </header>
</template>
