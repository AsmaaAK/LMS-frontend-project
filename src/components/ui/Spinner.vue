<template>
  <div :class="['animate-spin rounded-full border-2 border-gray-300 border-t-blue-600', sizeClasses]" 
       role="status" 
       aria-label="جاري التحميل">
    <span class="sr-only">جاري التحميل...</span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xl'].includes(value)
  }
})

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8',
  xl: 'w-12 h-12'
}
</script>