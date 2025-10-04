<template>
  <div :class="['bg-white dark:bg-gray-800 rounded-lg shadow-md', paddingClasses]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  padding: {
    type: String,
    default: 'medium',
    validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
  }
})

const paddingClasses = {
  none: '',
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8'
}
</script>