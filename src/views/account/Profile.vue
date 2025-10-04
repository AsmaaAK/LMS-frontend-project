<template>
  <div class="container mx-auto p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">الملف الشخصي</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">ادارة معلومات حسابك الشخصية</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <!-- Profile Image -->
            <div class="text-center mb-6">
              <div class="relative inline-block">
                <img :src="user.avatar" :alt="user.name" class="w-32 h-32 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg">
                <button @click="changeAvatar" class="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-4">{{ user.name }}</h2>
              <p class="text-gray-600 dark:text-gray-400">{{ userRoleText }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ user.email }}</p>
            </div>

            <!-- Stats -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">الكورسات المسجلة</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ user.stats.courses }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">ساعات التعلم</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ user.stats.hours }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">معدل الإكمال</span>
                <span class="font-semibold text-green-600">{{ user.stats.completionRate }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Personal Information -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">المعلومات الشخصية</h3>
            
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                  <input type="text" v-model="user.name" 
                         class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                  <input type="email" v-model="user.email" 
                         class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                <input type="tel" v-model="user.phone" 
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">عنوان السكن</label>
                <textarea v-model="user.address" rows="3"
                          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نبذة عني</label>
                <textarea v-model="user.bio" rows="4"
                          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
              </div>

              <div class="flex space-x-4 space-x-reverse">
                <button type="submit" :disabled="loading" 
                        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {{ loading ? 'جاري الحفظ...' : 'حفظ التغييرات' }}
                </button>
                <button type="button" @click="resetForm" 
                        class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                  إعادة تعيين
                </button>
              </div>
            </form>
          </div>

          <!-- Change Password -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">تغيير كلمة المرور</h3>
            
            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الحالية</label>
                <input type="password" v-model="password.current" 
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الجديدة</label>
                <input type="password" v-model="password.new" 
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور الجديدة</label>
                <input type="password" v-model="password.confirm" 
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              </div>

              <button type="submit" :disabled="passwordLoading" 
                      class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                {{ passwordLoading ? 'جاري التغيير...' : 'تغيير كلمة المرور' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const loading = ref(false)
const passwordLoading = ref(false)

// بيانات المستخدم من النظام
const user = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  bio: '',
  avatar: '',
  stats: {
    courses: 0,
    hours: 0,
    completionRate: 0
  }
})

// نموذج تغيير كلمة المرور
const password = ref({
  current: '',
  new: '',
  confirm: ''
})

// نص الدور المترجم
const userRoleText = computed(() => {
  const roles = {
    student: 'طالب',
    instructor: 'مدرب',
    admin: 'مدير النظام'
  }
  return roles[authStore.user?.role] || 'مستخدم'
})

// توليد صورة افتراضية بناءً على اسم المستخدم
const generateAvatar = (name) => {
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
  const color = colors[name.length % colors.length]
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color.replace('#', '')}&color=fff&size=150`
}

// تحميل بيانات المستخدم
const loadUserData = () => {
  if (authStore.user) {
    user.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || '',
      phone: authStore.user.phone || '',
      address: authStore.user.address || '',
      bio: authStore.user.bio || '',
      avatar: authStore.user.avatar || generateAvatar(authStore.user.name || 'User'),
      stats: {
        courses: authStore.user.stats?.courses || 0,
        hours: authStore.user.stats?.hours || 0,
        completionRate: authStore.user.stats?.completionRate || 0
      }
    }
  }
}

// تحديث الملف الشخصي
const updateProfile = async () => {
  loading.value = true
  try {
    // هنا يمكنك إضافة API call لتحديث البيانات
    console.log('Updating profile:', user.value)
    
    // محاكاة API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // تحديث البيانات في الـ store
    authStore.user = { ...authStore.user, ...user.value }
    
    // تحديث localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    localStorage.setItem('user', JSON.stringify({ ...storedUser, ...user.value }))
    
    alert('تم تحديث الملف الشخصي بنجاح!')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('حدث خطأ أثناء تحديث الملف الشخصي')
  } finally {
    loading.value = false
  }
}

// تغيير كلمة المرور
const changePassword = async () => {
  if (password.value.new !== password.value.confirm) {
    alert('كلمة المرور الجديدة غير متطابقة')
    return
  }
  
  passwordLoading.value = true
  try {
    // هنا يمكنك إضافة API call لتغيير كلمة المرور
    console.log('Changing password...')
    
    // محاكاة API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('تم تغيير كلمة المرور بنجاح!')
    password.value = { current: '', new: '', confirm: '' }
  } catch (error) {
    console.error('Error changing password:', error)
    alert('حدث خطأ أثناء تغيير كلمة المرور')
  } finally {
    passwordLoading.value = false
  }
}

// تغيير الصورة الشخصية
const changeAvatar = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        user.value.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// إعادة تعيين النموذج
const resetForm = () => {
  loadUserData()
}

// عند تحميل المكون
onMounted(() => {
  loadUserData()
})
</script>