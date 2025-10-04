<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
      <div class="text-sm text-gray-500 dark:text-gray-300 mb-1">تقارير عامة</div>
      <div class="text-2xl font-semibold text-gray-900 dark:text-white">N/A</div>
    </div>
    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
      <div class="text-sm text-gray-500 dark:text-gray-300 mb-1">تقرير مخصص</div>
      <div class="text-2xl font-semibold text-gray-900 dark:text-white">N/A</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  userRole: {
    type: String,
    default: 'student'
  }
})
</script>



