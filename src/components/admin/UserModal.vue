<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- الخلفية المعتمة -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="close"></div>

      <!-- المركز الرأسي -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <!-- نموذج المستخدم -->
      <div class="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-right align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:p-6">
        <!-- رأس النموذج -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ isEdit ? 'تعديل المستخدم' : 'إضافة مستخدم جديد' }}
          </h3>
          <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- رسائل الخطأ -->
        <div v-if="errors.length > 0" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <ul class="list-disc list-inside">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <!-- محتوى النموذج -->
        <form @submit.prevent="saveUser" class="space-y-4">
          <!-- الاسم -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الاسم الكامل
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="أدخل الاسم الكامل"
            >
          </div>

          <!-- البريد الإلكتروني -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="أدخل البريد الإلكتروني"
            >
          </div>

          <!-- الدور -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الدور
            </label>
            <select
              id="role"
              v-model="form.role"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">اختر الدور</option>
              <option value="student">طالب</option>
              <option value="instructor">معلم</option>
              <option value="admin">مدير</option>
            </select>
          </div>

          <!-- الحالة -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الحالة
            </label>
            <select
              id="status"
              v-model="form.status"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">اختر الحالة</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>

          <!-- كلمة المرور (فقط للإضافة) -->
          <div v-if="!isEdit">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="أدخل كلمة المرور"
            >
          </div>

          <!-- تأكيد كلمة المرور (فقط للإضافة) -->
          <div v-if="!isEdit">
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              تأكيد كلمة المرور
            </label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="أكد كلمة المرور"
            >
          </div>

          <!-- أزرار الإجراءات -->
          <div class="flex items-center justify-end space-x-3 space-x-reverse pt-6">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">جاري الحفظ...</span>
              <span v-else>{{ isEdit ? 'تحديث' : 'إضافة' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  user: Object
})

const emit = defineEmits(['close', 'saved'])

const loading = ref(false)
const errors = ref([])
const form = ref({
  name: '',
  email: '',
  role: '',
  status: 'active',
  password: '',
  password_confirmation: ''
})

const isEdit = computed(() => !!props.user?.id)

// تعريف الدوال أولاً
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    role: '',
    status: 'active',
    password: '',
    password_confirmation: ''
  }
  errors.value = []
}

const close = () => {
  resetForm()
  emit('close')
}

const saveUser = async () => {
  if (loading.value) return

  errors.value = []
  loading.value = true

  try {
    const userData = {
      ...form.value,
      id: props.user?.id
    }

    emit('saved', userData)
    close()
  } catch (error) {
    console.error('Error in user modal:', error)
    if (error.response?.data?.errors) {
      // معالجة أخطاء التحقق من Laravel
      const validationErrors = error.response.data.errors
      for (const field in validationErrors) {
        errors.value.push(...validationErrors[field])
      }
    } else {
      errors.value.push(error.message || 'حدث خطأ أثناء حفظ البيانات')
    }
  } finally {
    loading.value = false
  }
}

// مراقبة تغيير المستخدم المحدد
watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = {
      name: newUser.name || '',
      email: newUser.email || '',
      role: newUser.roles?.[0]?.name || newUser.role || '',
      status: newUser.status || 'active',
      password: '',
      password_confirmation: ''
    }
  } else {
    resetForm()
  }
}, { immediate: true })
</script>