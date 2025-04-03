<template>
  <NuxtLink
    :to="to"
    :class="[
      'hover:text-[var(--primary)]',
      underlined && 'underline underline-offset-8',
      active && 'text-[var(--primary)]',
      $attrs.class
    ]"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  to: string
  active?: boolean
  underlined?: boolean
}

defineProps<Props>()

defineOptions({
  inheritAttrs: true
})
</script>
