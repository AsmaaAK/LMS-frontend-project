<!-- <template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-center">
      <div :class="iconBgClass" class="p-3 rounded-full">
        <component :is="getIcon" class="w-6 h-6 text-white" />
      </div>
      <div class="mr-3 flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  color: {
    type: String,
    default: 'blue'
  }
})

const iconBgClass = computed(() => {
  const classes = {
    blue: 'bg-blue-100 dark:bg-blue-900',
    green: 'bg-green-100 dark:bg-green-900',
    yellow: 'bg-yellow-100 dark:bg-yellow-900',
    purple: 'bg-purple-100 dark:bg-purple-900',
    red: 'bg-red-100 dark:bg-red-900'
  }
  return classes[props.color] || classes.blue
})

const getIcon = computed(() => {
  const icons = {
    courses: 'CourseIcon',
    completion: 'CompletionIcon',
    assignments: 'AssignmentIcon',
    grading: 'GradingIcon',
    users: 'UsersIcon',
    revenue: 'RevenueIcon'
  }
  return icons[props.icon] || 'div'
})
</script> -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
    <div class="flex items-center">
      <div :class="iconBgClass" class="p-3 rounded-lg">
        <component :is="getIcon" :class="iconColorClass" class="w-6 h-6" />
      </div>
      <div class="mr-3 flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  BookOpenIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  color: {
    type: String,
    default: 'blue'
  }
})

const iconBgClass = computed(() => {
  const classes = {
    blue: 'bg-blue-100 dark:bg-blue-900',
    green: 'bg-green-100 dark:bg-green-900', 
    yellow: 'bg-yellow-100 dark:bg-yellow-900',
    purple: 'bg-purple-100 dark:bg-purple-900',
    red: 'bg-red-100 dark:bg-red-900'
  }
  return classes[props.color] || classes.blue
})

const iconColorClass = computed(() => {
  const classes = {
    blue: 'text-blue-600 dark:text-blue-300',
    green: 'text-green-600 dark:text-green-300',
    yellow: 'text-yellow-600 dark:text-yellow-300', 
    purple: 'text-purple-600 dark:text-purple-300',
    red: 'text-red-600 dark:text-red-300'
  }
  return classes[props.color] || classes.blue
})

const getIcon = computed(() => {
  const icons = {
    courses: BookOpenIcon,
    completion: AcademicCapIcon,
    assignments: DocumentTextIcon,
    grading: ClipboardDocumentCheckIcon,
    users: UsersIcon,
    revenue: CurrencyDollarIcon
  }
  return icons[props.icon] || BookOpenIcon
})
</script>