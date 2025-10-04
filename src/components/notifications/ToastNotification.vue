<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 rtl:space-y-reverse">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'flex items-center p-4 rounded-lg shadow-lg border min-w-80 max-w-md',
          toastTypeClasses[toast.type]
        ]"
      >
        <!-- الأيقونة -->
        <div class="flex-shrink-0">
          <component :is="toastIcons[toast.type]" class="w-5 h-5" />
        </div>

        <!-- المحتوى -->
        <div class="mr-3 rtl:ml-3 flex-1">
          <p class="text-sm font-medium" v-html="toast.message"></p>
          <p v-if="toast.description" class="text-sm opacity-90 mt-1">
            {{ toast.description }}
          </p>
        </div>

        <!-- زر الإغلاق -->
        <button
          @click="removeToast(toast.id)"
          :class="[
            'flex-shrink-0 p-1 rounded-full transition-colors',
            toastCloseClasses[toast.type]
          ]"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// تخزين الإشعارات
const toasts = ref([])
let toastId = 0

// كلاسات التنسيق لأنواع الإشعارات المختلفة
const toastTypeClasses = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300'
}

const toastCloseClasses = {
  success: 'hover:bg-green-100 dark:hover:bg-green-800 text-green-600 dark:text-green-400',
  error: 'hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400',
  warning: 'hover:bg-yellow-100 dark:hover:bg-yellow-800 text-yellow-600 dark:text-yellow-400',
  info: 'hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400'
}

const toastIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon
}

// دالة لإضافة إشعار جديد
const addToast = (message, type = 'info', duration = 5000, description = null) => {
  const id = toastId++
  const toast = {
    id,
    message,
    type,
    description,
    duration
  }

  toasts.value.push(toast)

  // حذف الإشعار تلقائياً بعد المدة المحددة
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  return id
}

// دالة لإزالة إشعار
const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// دالة لمسح جميع الإشعارات
const clearToasts = () => {
  toasts.value = []
}

// جعل الدوال متاحة globally
onMounted(() => {
  // إضافة الدوال إلى window object للوصول من أي مكان
  window.$toast = {
    success: (message, description, duration) => addToast(message, 'success', duration, description),
    error: (message, description, duration) => addToast(message, 'error', duration, description),
    warning: (message, description, duration) => addToast(message, 'warning', duration, description),
    info: (message, description, duration) => addToast(message, 'info', duration, description),
    remove: removeToast,
    clear: clearToasts
  }
})

onUnmounted(() => {
  // تنظيف
  if (window.$toast) {
    delete window.$toast
  }
})

// جعل الدوال متاحة للاستخدام في الـ template
defineExpose({
  addToast,
  removeToast,
  clearToasts
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* تخصيص للغة العربية */
[dir="rtl"] .toast-enter-from {
  transform: translateX(-100%);
}

[dir="rtl"] .toast-leave-to {
  transform: translateX(-100%);
}
</style>