<template>
  <div class="space-y-3">
    <div v-if="!activities || activities.length === 0" class="text-gray-500 dark:text-gray-400">
      لا توجد نشاطات حديثة
    </div>
    <div v-else v-for="item in activities" :key="item.id" class="flex items-start gap-3">
      <div class="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
      <div>
        <div class="text-gray-900 dark:text-white text-sm">{{ item.message }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.time }} • {{ item.user }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  activities: {
    type: Array,
    default: () => []
  }
})
</script>



