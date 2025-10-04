<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- الهيدر -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8 space-x-reverse">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">إرسال إشعار</h1>
            <nav class="flex space-x-8 space-x-reverse">
              <router-link to="/instructor" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الرئيسية</router-link>
              <router-link to="/instructor/notifications" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الإشعارات</router-link>
              <router-link to="/instructor/notifications/send" class="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">إرسال إشعار</router-link>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">إنشاء إشعار جديد</h2>
        </div>
        
        <form @submit.prevent="sendNotification" class="p-6 space-y-6">
          <!-- المستلمون -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              المستلمون *
            </label>
            <div class="space-y-3">
              <div class="flex items-center space-x-4 space-x-reverse">
                <div class="flex items-center">
                  <input
                    v-model="notification.recipients"
                    value="all"
                    type="radio"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  >
                  <label class="mr-2 text-sm text-gray-700 dark:text-gray-300">جميع الطلاب</label>
                </div>
                
                <div class="flex items-center">
                  <input
                    v-model="notification.recipients"
                    value="course"
                    type="radio"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  >
                  <label class="mr-2 text-sm text-gray-700 dark:text-gray-300">طلاب دورة محددة</label>
                </div>
              </div>
              
              <select
                v-if="notification.recipients === 'course'"
                v-model="notification.courseId"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">اختر الدورة</option>
                <option v-for="course in courses" :key="course.id" :value="course.id">
                  {{ course.title }}
                </option>
              </select>
            </div>
          </div>

          <!-- عنوان الإشعار -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              عنوان الإشعار *
            </label>
            <input
              v-model="notification.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="أدخل عنوان الإشعار"
            >
          </div>

          <!-- محتوى الإشعار -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              محتوى الإشعار *
            </label>
            <textarea
              v-model="notification.message"
              rows="6"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="اكتب محتوى الإشعار هنا..."
            ></textarea>
          </div>

          <!-- نوع الإشعار -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع الإشعار
            </label>
            <select
              v-model="notification.type"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="info">معلومة</option>
              <option value="warning">تحذير</option>
              <option value="important">مهم</option>
              <option value="reminder">تذكير</option>
            </select>
          </div>

          <!-- إرسال فوري أو مجدول -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              توقيت الإرسال
            </label>
            <div class="space-y-3">
              <div class="flex items-center space-x-4 space-x-reverse">
                <div class="flex items-center">
                  <input
                    v-model="notification.schedule"
                    value="now"
                    type="radio"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  >
                  <label class="mr-2 text-sm text-gray-700 dark:text-gray-300">إرسال فوري</label>
                </div>
                
                <div class="flex items-center">
                  <input
                    v-model="notification.schedule"
                    value="later"
                    type="radio"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  >
                  <label class="mr-2 text-sm text-gray-700 dark:text-gray-300">جدولة</label>
                </div>
              </div>
              
              <div v-if="notification.schedule === 'later'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-2">التاريخ</label>
                  <input
                    v-model="notification.scheduleDate"
                    type="date"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                </div>
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-2">الوقت</label>
                  <input
                    v-model="notification.scheduleTime"
                    type="time"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- معاينة الإشعار -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">معاينة الإشعار</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full flex items-center justify-center" 
                       :class="getNotificationTypeClass(notification.type)">
                    <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ notification.title || 'عنوان الإشعار' }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ notification.message || 'محتوى الإشعار سيظهر هنا...' }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {{ new Date().toLocaleDateString('ar-EG') }} - من: {{ user.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- أزرار الإرسال -->
          <div class="flex justify-end space-x-4 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
            <router-link
              to="/instructor/notifications"
              class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              إلغاء
            </router-link>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              <span>إرسال الإشعار</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  name: 'المدرس أحمد',
  email: 'instructor@example.com'
})

const courses = ref([
  { id: 1, title: 'تعلم JavaScript المتقدم', students: 45 },
  { id: 2, title: 'تطوير تطبيقات Vue.js', students: 32 },
  { id: 3, title: 'أساسيات Python', students: 28 }
])

const notification = ref({
  recipients: 'all',
  courseId: '',
  title: '',
  message: '',
  type: 'info',
  schedule: 'now',
  scheduleDate: '',
  scheduleTime: ''
})

onMounted(() => {
  // تعيين تاريخ ووقت افتراضي للجدولة
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  notification.value.scheduleDate = tomorrow.toISOString().split('T')[0]
  notification.value.scheduleTime = '09:00'
})

const getNotificationTypeClass = (type) => {
  const classes = {
    info: 'bg-blue-500',
    warning: 'bg-orange-500',
    important: 'bg-red-500',
    reminder: 'bg-green-500'
  }
  return classes[type] || 'bg-blue-500'
}

const sendNotification = async () => {
  try {
    console.log('إرسال الإشعار:', notification.value)
    
    // محاكاة إرسال الإشعار
    const newNotification = {
      id: Date.now(),
      ...notification.value,
      sentAt: new Date().toISOString(),
      status: 'sent'
    }
    
    // حفظ في localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('instructorNotifications') || '[]')
    existingNotifications.unshift(newNotification)
    localStorage.setItem('instructorNotifications', JSON.stringify(existingNotifications))
    
    // عرض رسالة نجاح
    alert('تم إرسال الإشعار بنجاح!')
    
    // العودة إلى صفحة الإشعارات
    router.push('/instructor/notifications')
  } catch (error) {
    console.error('خطأ في إرسال الإشعار:', error)
    alert('حدث خطأ أثناء إرسال الإشعار')
  }
}
</script>