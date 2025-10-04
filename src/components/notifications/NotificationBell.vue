<template>
  <div class="relative">
    <button
      @click="toggleNotifications"
      class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
    >
      <BellIcon class="w-6 h-6" />
      <span v-if="unreadCount > 0" 
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <!-- قائمة الإشعارات -->
    <div v-if="showNotifications" 
         class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 class="font-semibold text-gray-900 dark:text-white">الإشعارات</h3>
        <button @click="markAllAsRead" 
                class="text-sm text-blue-600 hover:text-blue-700">
          تعليم الكل كمقروء
        </button>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        <div v-if="notifications.loading" class="p-4 text-center">
          <Spinner size="sm" />
        </div>
        
        <div v-else-if="notifications.data.length === 0" class="p-4 text-center text-gray-500">
          لا توجد إشعارات
        </div>
        
        <NotificationItem
          v-for="notification in notifications.data"
          :key="notification.id"
          :notification="notification"
          @click="handleNotificationClick(notification)"
        />
      </div>
      
      <div class="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
        <RouterLink to="/notifications" 
                   class="text-sm text-blue-600 hover:text-blue-700">
          عرض جميع الإشعارات
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationsStore } from '@/stores/notifications'
import { BellIcon } from '@heroicons/vue/24/outline'
import NotificationItem from './NotificationItem.vue'
import Spinner from '@/components/ui/Spinner.vue'

const router = useRouter()
const notificationsStore = useNotificationsStore()

const showNotifications = ref(false)

const notifications = computed(() => ({
  loading: notificationsStore.loading,
  data: notificationsStore.notifications.slice(0, 10) // آخر 10 إشعارات
}))

const unreadCount = computed(() => notificationsStore.unreadCount)

onMounted(() => {
  notificationsStore.fetchNotifications()
  notificationsStore.setupRealTimeNotifications()
})

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const markAllAsRead = async () => {
  await notificationsStore.markAllAsRead()
}

const handleNotificationClick = async (notification) => {
  // تعليم كمقروء
  if (!notification.read_at) {
    await notificationsStore.markAsRead(notification.id)
  }
  
  // التنقل بناءً على نوع الإشعار
  switch (notification.type) {
    case 'grade':
      router.push('/student/grades')
      break
    case 'assignment':
      router.push('/student/assignments')
      break
    case 'course':
      router.push(`/student/courses/${notification.data.course_id}`)
      break
  }
  
  showNotifications.value = false
}

// إغلاق القائمة عند النقر خارجها
const clickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showNotifications.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutside)
})
</script>