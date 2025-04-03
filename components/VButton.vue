<template>
  <button
    :class="[
      variants[variant],
      size === 'sm' && 'px-5 py-3',
      size === 'md' && 'px-6 py-3',
      size === 'lg' && 'px-8 py-4',
      active && variants['primary'],
      $attrs.class,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'sm',
  disabled: false,
  active: false,
})

defineOptions({
  inheritAttrs: true,
})

defineEmits(['click'])

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-black text-white border border-transparent hover:bg-white hover:text-black hover:border-[#F3F3F3] rounded-full transition-colors',
  secondary: 'bg-[#E7D7FF] text-black hover:bg-[#D8C1FF] rounded-[14px] transition-colors',
  outline: 'border rounded-full hover:bg-gray-50 transition-colors',
  pagination: 'border rounded-xl bg-[#F3F3F3] hover:bg-gray-50 transition-colors',
  footer: 'bg-black rounded-full bg-[#F3F3F3] hover:bg-gray-50 transition-colors',
}
</script>
