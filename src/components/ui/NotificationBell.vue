<template>
  <div class="notification-bell">
    <button 
      class="notification-button"
      @click="toggleNotifications"
    >
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="notification-badge">
        {{ unreadCount }}
      </span>
    </button>

    <div v-if="isOpen" class="notification-dropdown">
      <div class="notification-header">
        <h3>الإشعارات</h3>
        <button 
          v-if="unreadCount > 0"
          @click="markAllAsRead"
          class="mark-all-read"
        >
          تعليم الكل كمقروء
        </button>
      </div>
      
      <div class="notification-list">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          :class="['notification-item', { unread: !notification.is_read }]"
        >
          <div class="notification-icon">
            {{ notification.icon || '💡' }}
          </div>
          <div class="notification-content">
            <h4>{{ notification.title }}</h4>
            <p>{{ notification.message }}</p>
            <span class="notification-time">
              {{ formatTime(notification.created_at) }}
            </span>
          </div>
          <button 
            v-if="!notification.is_read"
            @click="markAsRead(notification.id)"
            class="mark-read-btn"
            title="تعليم كمقروء"
          >
            ●
          </button>
        </div>
        
        <div v-if="notifications.length === 0" class="empty-state">
          لا توجد إشعارات جديدة
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'NotificationBell',
  setup() {
    const isOpen = ref(false)
    const notifications = ref([])
    const unreadCount = ref(0)

    const fetchNotifications = () => {
      // بيانات وهمية - يمكن استبدالها بطلب API لاحقاً
      notifications.value = [
        {
          id: 1,
          title: 'مرحباً بك في النظام',
          message: 'تم تسجيل دخولك بنجاح إلى نظام إدارة التعلم',
          is_read: false,
          created_at: new Date().toISOString(),
          icon: '🎉'
        },
        {
          id: 2,
          title: 'دورة جديدة متاحة',
          message: 'تم إضافة دورة "تعلم البرمجة من الصفر"',
          is_read: false,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          icon: '📚'
        },
        {
          id: 3,
          title: 'موعد تسليم الواجب',
          message: 'تبقى 3 أيام على موعد تسليم الواجب الأول',
          is_read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          icon: '📝'
        }
      ]
      unreadCount.value = notifications.value.filter(n => !n.is_read).length
    }

    const markAsRead = (id) => {
      const notification = notifications.value.find(n => n.id === id)
      if (notification && !notification.is_read) {
        notification.is_read = true
        unreadCount.value--
      }
    }

    const markAllAsRead = () => {
      notifications.value.forEach(notification => {
        notification.is_read = true
      })
      unreadCount.value = 0
    }

    const toggleNotifications = () => {
      isOpen.value = !isOpen.value
      if (isOpen.value && notifications.value.length === 0) {
        fetchNotifications()
      }
    }

    const formatTime = (dateString) => {
      const date = new Date(dateString)
      const now = new Date()
      const diff = now - date
      
      if (diff < 60000) return 'الآن'
      if (diff < 3600000) return `${Math.floor(diff / 60000)} دقيقة`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)} ساعة`
      return `${Math.floor(diff / 86400000)} يوم`
    }

    onMounted(() => {
      fetchNotifications()
    })

    return {
      isOpen,
      notifications,
      unreadCount,
      toggleNotifications,
      markAsRead,
      markAllAsRead,
      formatTime
    }
  }
}
</script>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
}

.notification-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 1.5em;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.notification-button:hover {
  background-color: #f5f5f5;
}

.notification-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  z-index: 1000;
  margin-top: 5px;
}

.notification-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  border-radius: 8px 8px 0 0;
}

.notification-header h3 {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.mark-all-read {
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.mark-all-read:hover {
  background: #0056b3;
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 12px 15px;
  border-bottom: 1px solid #f5f5f5;
  align-items: flex-start;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f8f9fa;
}

.notification-item.unread {
  background: #f0f7ff;
  border-left: 3px solid #007bff;
}

.notification-icon {
  font-size: 1.3em;
  margin-left: 12px;
  margin-top: 2px;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-content h4 {
  margin: 0 0 6px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.notification-content p {
  margin: 0 0 6px 0;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

.notification-time {
  font-size: 11px;
  color: #999;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.mark-read-btn:hover {
  opacity: 1;
}

.empty-state {
  padding: 30px 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

/* تحسينات للجوال */
@media (max-width: 768px) {
  .notification-dropdown {
    width: 280px;
    right: -20px;
  }
  
  .notification-dropdown::before {
    right: 25px;
  }
}
</style>