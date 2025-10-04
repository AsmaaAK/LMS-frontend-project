<template>
  <router-link 
    :to="to"
    class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    :class="{ 
      'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300': active 
    }"
    @click="$emit('click')"
  >
    <component :is="getIcon" class="w-5 h-5 ml-3" />
    <slot />
  </router-link>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { 
  HomeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  DocumentPlusIcon,
  UsersIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const iconComponents = {
  HomeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  DocumentPlusIcon,
  UsersIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon
}

const getIcon = computed(() => {
  return iconComponents[props.icon] || HomeIcon
})
</script>