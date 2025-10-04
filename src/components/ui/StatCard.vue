<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div class="flex items-center">
      <div :class="['flex-shrink-0 rounded-md p-3', colorClasses]">
        <span class="text-2xl">{{ icon }}</span>
      </div>
      <div class="mr-4 rtl:ml-4 flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{{ title }}</p>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ value }}</p>
        
        <div v-if="change !== undefined" class="flex items-center text-sm">
          <span :class="[changeType === 'growth' ? 'text-green-600' : 'text-red-600', 'font-medium']">
            {{ change > 0 ? '+' : '' }}{{ change }}%
          </span>
          <span class="text-gray-500 dark:text-gray-400 mr-1">من الشهر الماضي</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    default: '📊'
  },
  change: {
    type: Number,
    default: undefined
  },
  changeType: {
    type: String,
    default: 'growth',
    validator: (value) => ['growth', 'decline'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'red', 'yellow', 'purple'].includes(value)
  }
})

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
}
</script>