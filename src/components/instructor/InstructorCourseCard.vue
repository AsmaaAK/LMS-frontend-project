<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div class="relative">
      <img 
        :src="course.image || '/images/course-placeholder.jpg'" 
        :alt="course.title"
        class="w-full h-48 object-cover"
      >
      <div class="absolute top-3 right-3 flex space-x-2 rtl:space-x-reverse">
        <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {{ course.is_published ? 'منشور' : 'مسودة' }}
        </span>
        <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {{ getLevelName(course.level) }}
        </span>
      </div>
    </div>

    <div class="p-6">
      <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-2">
        {{ course.title }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {{ course.description }}
      </p>

      <!-- الإحصائيات -->
      <div class="grid grid-cols-3 gap-4 text-center mb-4">
        <div>
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ course.enrollments_count || 0 }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">طلاب</div>
        </div>
        <div>
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ course.lessons_count || 0 }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">دروس</div>
        </div>
        <div>
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ course.rating || '0.0' }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">تقييم</div>
        </div>
      </div>

      <!-- التقدم -->
      <div v-if="course.revenue !== undefined" class="mb-4">
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>الإيرادات</span>
          <span class="font-semibold text-green-600">{{ formatCurrency(course.revenue) }}</span>
        </div>
      </div>

      <!-- الأزرار -->
      <div class="flex space-x-2 rtl:space-x-reverse">
        <BaseButton 
          size="small" 
          variant="primary"
          @click="$emit('view', course)"
        >
          عرض
        </BaseButton>
        
        <BaseButton 
          size="small" 
          variant="secondary"
          @click="$emit('edit', course)"
        >
          تعديل
        </BaseButton>
        
        <BaseButton 
          size="small" 
          variant="danger"
          @click="$emit('delete', course)"
        >
          حذف
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '@/utils/helpers'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  course: {
    type: Object,
    required: true
  }
})

defineEmits(['view', 'edit', 'delete'])

const getLevelName = (level) => {
  const levels = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  }
  return levels[level] || level
}
</script>