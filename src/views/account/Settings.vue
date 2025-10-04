<template>
  <div class="container mx-auto p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">الإعدادات</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">إدارة إعدادات حسابك والمنصة</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Settings Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <nav class="space-y-2">
              <button v-for="tab in tabs" :key="tab.id" 
                      @click="activeTab = tab.id"
                      :class="activeTab === tab.id ? 
                             'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 
                             'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                      class="w-full text-right px-4 py-3 rounded-lg transition-colors flex items-center">
                <component :is="tab.icon" class="w-5 h-5 ml-2" />
                {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-3">
          <!-- General Settings -->
          <div v-if="activeTab === 'general'" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">الإعدادات العامة</h3>
            
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اللغة</label>
                  <select v-model="settings.language" 
                          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المنطقة الزمنية</label>
                  <select v-model="settings.timezone" 
                          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="+3">(GMT+3) الرياض</option>
                    <option value="+0">(GMT+0) لندن</option>
                    <option value="-5">(GMT-5) نيويورك</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="flex items-center">
                  <input type="checkbox" v-model="settings.emailNotifications" 
                         class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700">
                  <span class="mr-2 text-sm text-gray-700 dark:text-gray-300">الإشعارات البريدية</span>
                </label>
              </div>

              <div>
                <label class="flex items-center">
                  <input type="checkbox" v-model="settings.smsNotifications" 
                         class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700">
                  <span class="mr-2 text-sm text-gray-700 dark:text-gray-300">إشعارات SMS</span>
                </label>
              </div>

              <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                حفظ الإعدادات
              </button>
            </form>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">الأمان</h3>
            
            <div class="space-y-6">
              <!-- Two Factor Authentication -->
              <div class="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">المصادقة الثنائية</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">إضافة طبقة أمان إضافية لحسابك</p>
                </div>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  تفعيل
                </button>
              </div>

              <!-- Session Management -->
              <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-white mb-4">الجلسات النشطة</h4>
                <div class="space-y-3">
                  <div v-for="session in activeSessions" :key="session.id" 
                       class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ session.device }}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ session.location }} • {{ session.lastActive }}</p>
                    </div>
                    <button class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 text-sm">
                      إنهاء الجلسة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notifications Settings -->
          <div v-if="activeTab === 'notifications'" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">الإشعارات</h3>
            
            <div class="space-y-6">
              <div v-for="notification in notificationSettings" :key="notification.id" 
                   class="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ notification.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ notification.description }}</p>
                </div>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="notification.email" 
                           class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700">
                    <span class="mr-2 text-sm">بريد</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="notification.push" 
                           class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700">
                    <span class="mr-2 text-sm">تطبيق</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('general')

const tabs = [
  { id: 'general', name: 'عام', icon: 'div' },
  { id: 'security', name: 'الأمان', icon: 'div' },
  { id: 'notifications', name: 'الإشعارات', icon: 'div' },
  { id: 'privacy', name: 'الخصوصية', icon: 'div' }
]

const settings = ref({
  language: 'ar',
  timezone: '+3',
  emailNotifications: true,
  smsNotifications: false
})

const activeSessions = ref([
  {
    id: 1,
    device: 'Chrome on Windows',
    location: 'الرياض، السعودية',
    lastActive: 'منذ 2 ساعة'
  },
  {
    id: 2,
    device: 'Safari on iPhone',
    location: 'جدة، السعودية',
    lastActive: 'منذ 5 دقائق'
  }
])

const notificationSettings = ref([
  {
    id: 1,
    title: 'إشعارات الكورسات الجديدة',
    description: 'إشعار عند إضافة كورسات جديدة',
    email: true,
    push: true
  },
  {
    id: 2,
    title: 'تذكير بالمواعيد',
    description: 'تذكير بمواعيد التسليم والحصص',
    email: true,
    push: false
  },
  {
    id: 3,
    title: 'عروض خاصة',
    description: 'إشعارات بالعروض والتخفيضات',
    email: false,
    push: true
  }
])
</script>