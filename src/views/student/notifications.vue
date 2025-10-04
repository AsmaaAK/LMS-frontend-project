<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- الهيدر -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8 space-x-reverse">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">الإشعارات</h1>
            <nav class="flex space-x-8 space-x-reverse">
              <router-link to="/student" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الرئيسية</router-link>
              <router-link to="/student/courses" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">دوراتي</router-link>
              <router-link to="/student/grades" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الدرجات</router-link>
              <router-link to="/student/notifications" class="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">الإشعارات</router-link>
            </nav>
          </div>
          
          <div class="flex items-center space-x-4 space-x-reverse">
            <button 
              @click="markAllAsRead"
              class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              تعليم الكل كمقروء
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- فلترة الإشعارات -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div class="flex items-center space-x-4 space-x-reverse">
            <select 
              v-model="filters.type"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="">جميع الأنواع</option>
              <option value="grade">الدرجات</option>
              <option value="assignment">الواجبات</option>
              <option value="course">الدورات</option>
              <option value="system">النظام</option>
            </select>
            
            <select 
              v-model="filters.status"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="">جميع الحالات</option>
              <option value="unread">غير مقروء</option>
              <option value="read">مقروء</option>
            </select>
          </div>
          
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ unreadCount }} إشعار غير مقروء
          </div>
        </div>
      </div>

      <!-- قائمة الإشعارات -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div 
            v-for="notification in filteredNotifications" 
            :key="notification.id"
            class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notification.read }"
          >
            <div class="flex items-start space-x-4 space-x-reverse">
              <!-- أيقونة النوع -->
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full flex items-center justify-center" 
                     :class="getNotificationTypeClass(notification.type)">
                  <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="notification.type === 'grade'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path v-if="notification.type === 'assignment'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    <path v-if="notification.type === 'course'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    <path v-if="notification.type === 'system'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              
              <!-- محتوى الإشعار -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white" 
                       :class="{ 'font-semibold': !notification.read }">
                      {{ notification.title }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {{ notification.message }}
                    </p>
                    
                    <!-- معلومات إضافية -->
                    <div class="flex items-center space-x-4 space-x-reverse mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{{ notification.time }}</span>
                      <span v-if="notification.course">• {{ notification.course }}</span>
                      <span v-if="notification.instructor">• {{ notification.instructor }}</span>
                    </div>
                  </div>
                  
                  <!-- أزرار الإجراءات -->
                  <div class="flex items-center space-x-2 space-x-reverse ml-4">
                    <button 
                      v-if="!notification.read"
                      @click="markAsRead(notification)"
                      class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      تعليم كمقروء
                    </button>
                    
                    <button 
                      v-if="notification.action"
                      @click="handleAction(notification)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {{ getActionText(notification.type) }}
                    </button>
                    
                    <button 
                      @click="deleteNotification(notification)"
                      class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- نقطة غير مقروء -->
                <div v-if="!notification.read" class="flex items-center mt-2">
                  <div class="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span class="text-xs text-blue-600 dark:text-blue-400 mr-2">جديد</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- حالة عدم وجود إشعارات -->
        <div v-if="filteredNotifications.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="mt-4 text-gray-600 dark:text-gray-400">لا توجد إشعارات</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">سيظهر هنا أي إشعارات جديدة تتلقاها</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const filters = ref({
  type: '',
  status: ''
})

const notifications = ref([
  {
    id: 1,
    type: 'grade',
    title: 'تم تصحيح واجب JavaScript',
    message: 'لقد حصلت على درجة 45/50 في واجب "مشروع الوحدة الأولى"',
    course: 'تعلم JavaScript المتقدم',
    instructor: 'أحمد محمد',
    time: 'منذ 5 دقائق',
    read: false,
    action: true,
    actionUrl: '/student/grades'
  },
  {
    id: 2,
    type: 'assignment',
    title: 'واجب جديد',
    message: 'تم نشر واجب جديد في دورة Vue.js - "تمرين المكونات"',
    course: 'تطوير تطبيقات Vue.js',
    instructor: 'فاطمة علي',
    time: 'منذ ساعة',
    read: false,
    action: true,
    actionUrl: '/student/courses/2'
  },
  {
    id: 3,
    type: 'course',
    title: 'بدء دورة جديدة',
    message: 'تم تفعيل الدورة "أساسيات Python" ويمكنك البدء في الدراسة الآن',
    course: 'أساسيات Python',
    instructor: 'محمد الخالد',
    time: 'منذ 3 ساعات',
    read: true,
    action: true,
    actionUrl: '/student/courses/3'
  },
  {
    id: 4,
    type: 'system',
    title: 'تحديث النظام',
    message: 'تم تحديث النظام إلى الإصدار الجديد 2.1.0 مع ميزات محسنة',
    time: 'منذ يوم',
    read: true,
    action: false
  },
  {
    id: 5,
    type: 'grade',
    title: 'تم رفع درجة الاختبار',
    message: 'تم رفع درجة اختبار منتصف الفصل في دورة قواعد البيانات إلى 38/40',
    course: 'قواعد البيانات',
    instructor: 'سارة أحمد',
    time: 'منذ يومين',
    read: true,
    action: true,
    actionUrl: '/student/grades'
  }
])

const filteredNotifications = computed(() => {
  return notifications.value.filter(notification => {
    const matchesType = !filters.value.type || notification.type === filters.value.type
    const matchesStatus = !filters.value.status || 
      (filters.value.status === 'unread' && !notification.read) ||
      (filters.value.status === 'read' && notification.read)
    
    return matchesType && matchesStatus
  })
})

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const getNotificationTypeClass = (type) => {
  const classes = {
    grade: 'bg-green-500',
    assignment: 'bg-orange-500',
    course: 'bg-blue-500',
    system: 'bg-purple-500'
  }
  return classes[type] || 'bg-gray-500'
}

const getActionText = (type) => {
  const texts = {
    grade: 'عرض الدرجات',
    assignment: 'عرض الواجب',
    course: 'عرض الدورة',
    system: 'عرض التفاصيل'
  }
  return texts[type] || 'عرض'
}

const markAsRead = (notification) => {
  notification.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

const handleAction = (notification) => {
  console.log('تنفيذ إجراء للإشعار:', notification.title)
  if (notification.actionUrl) {
    router.push(notification.actionUrl)
  }
}

const deleteNotification = (notification) => {
  if (confirm('هل أنت متأكد من حذف هذا الإشعار؟')) {
    notifications.value = notifications.value.filter(n => n.id !== notification.id)
  }
}
</script>