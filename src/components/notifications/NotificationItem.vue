<template>
  <div 
    :class="[
      'p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors',
      'hover:bg-gray-50 dark:hover:bg-gray-700',
      notification.read_at ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'
    ]"
    @click="$emit('click', notification)"
  >
    <div class="flex items-start space-x-3 rtl:space-x-reverse">
      <!-- أيقونة النوع -->
      <div :class="[
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        notificationTypeClasses[notification.type]
      ]">
        <component :is="notificationIcons[notification.type]" class="w-4 h-4 text-white" />
      </div>

      <!-- محتوى الإشعار -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="notification.title"></p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1" v-html="notification.message"></p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
          {{ formatTime(notification.created_at) }}
        </p>
      </div>

      <!-- حالة القراءة -->
      <div v-if="!notification.read_at" class="flex-shrink-0">
        <span class="w-2 h-2 bg-blue-500 rounded-full block"></span>
      </div>
    </div>

    <!-- أزرار الإجراءات -->
    <div v-if="notification.actions" class="flex space-x-2 rtl:space-x-reverse mt-3">
      <button
        v-for="action in notification.actions"
        :key="action.label"
        @click.stop="handleAction(action)"
        :class="[
          'px-3 py-1 text-xs rounded border transition-colors',
          action.primary 
            ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        ]"
      >
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'
import { formatTime } from '@/utils/helpers'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  BellIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const notificationsStore = useNotificationsStore()
const toast = useToast()

defineProps({
  notification: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const notificationTypeClasses = {
  grade: 'bg-green-500',
  deadline: 'bg-red-500',
  message: 'bg-blue-500',
  course: 'bg-purple-500',
  system: 'bg-gray-500'
}

const notificationIcons = {
  grade: CheckCircleIcon,
  deadline: ExclamationTriangleIcon,
  message: ChatBubbleLeftRightIcon,
  course: AcademicCapIcon,
  system: BellIcon
}

const handleAction = async (action) => {
  try {
    if (action.url) {
      router.push(action.url)
    }
    
    if (action.api) {
      // تنفيذ action API إذا كان موجوداً
      await apiCall(action.api)
    }

    if (action.markAsRead) {
      await notificationsStore.markAsRead(props.notification.id)
    }
  } catch (error) {
    toast.error('حدث خطأ أثناء تنفيذ الإجراء')
  }
}
</script>