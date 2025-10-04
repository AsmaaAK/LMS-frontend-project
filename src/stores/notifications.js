// تأكد من استيراد computed من Vue
import { ref, computed } from 'vue'

export function useNotifications() {
  const notifications = ref([])
  const unreadCount = ref(0)

  // ✅ إضافة computed هنا
  const hasUnread = computed(() => unreadCount.value > 0)
  const sortedNotifications = computed(() => {
    return [...notifications.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  })

  // دفع إشعار جديد
  const pushNotification = (notification) => {
    notifications.value.unshift({
      id: Date.now(),
      read: false,
      ...notification
    })
    unreadCount.value++
  }

  // وضع علامة مقروء
  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification && !notification.read) {
      notification.read = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
  }

  // وضع علامة مقروء للجميع
  const markAllAsRead = () => {
    notifications.value.forEach(notification => {
      if (!notification.read) {
        notification.read = true
      }
    })
    unreadCount.value = 0
  }

  // جلب الإشعارات من الخادم
  const fetchNotifications = async () => {
    try {
      // استبدل هذا بطلب API الفعلي
      const response = await fetch('/api/notifications')
      const data = await response.json()
      notifications.value = data.notifications
      unreadCount.value = data.unread_count
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  // حذف إشعار
  const deleteNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      const wasUnread = !notifications.value[index].read
      notifications.value.splice(index, 1)
      if (wasUnread) {
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    }
  }

  return {
    notifications: sortedNotifications,
    unreadCount,
    hasUnread,
    pushNotification,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
    deleteNotification
  }
}