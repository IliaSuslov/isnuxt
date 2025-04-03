<template>
  <header class="flex md:items-center justify-between py-8 px-8 md:px-20 flex-col md:flex-row gap-2">
    <NuxtLink to="/" class="text-2xl font-bold">
      <VLogo />
    </NuxtLink>
    <nav class="flex md:items-center flex-col gap-4 md:gap-[91px] md:flex-row">
      <div class="flex items-center gap-[58px]">
        <VLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          :active="item.active"
        >
          {{ item.label }}
        </VLink>
      </div>
      <div class="flex gap-4">
        <VButton variant="outline">
          <img src="/icons/en.svg" alt="English" class="w-6 h-6" />
        </VButton>
        <VButton variant="primary" size="md"> Let's work </VButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
interface NavigationItem {
  label: string
  path: string
  active?: boolean
}

const route = useRoute()

const navigationItems = computed<NavigationItem[]>(() => [
  { label: 'Works', path: '/works', active: route.path.startsWith('/works') },
  { label: 'About', path: '/about', active: route.path.startsWith('/about') },
])
</script>
