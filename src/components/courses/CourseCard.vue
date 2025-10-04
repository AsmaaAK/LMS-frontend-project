<!-- src/components/CourseCard.vue -->
<template>
<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative z-10">
    <!-- صورة الكورس -->
    <div class="h-48 bg-gray-200 relative z-0">
      <img
        v-if="course.image"
        :src="course.image"
        :alt="course.title"
        class="w-full h-full object-cover "
      >
      <div v-else class="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <BookOpenIcon class="w-12 h-12 text-blue-400" />
      </div>
      
      <!-- الشارات -->
      <div class="absolute top-3 left-3 space-y-1">
        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {{ getLevelText(course.level) }}
        </span>
        <span v-if="course.is_published" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
          منشور
        </span>
      </div>
    </div>

    <!-- محتوى البطاقة -->
    <div class="p-4">
      <h3 class="font-semibold text-lg text-gray-900 mb-2">
        {{ course.title }}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ course.description }}
      </p>

      <!-- معلومات إضافية -->
      <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{{ course.instructor?.name || 'غير معروف' }}</span>
        <span>{{ course.lessons_count || 0 }} درس</span>
      </div>

      <!-- الأزرار -->
      <div class="flex gap-2">
        <!-- زر العرض الأساسي -->
        <router-link
          :to="`/courses/${course.id}`"
          class="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ getActionButtonText(course) }}
        </router-link>

        <!-- زر الإدارة للمعلم -->
        <button
          v-if="canEdit"
          @click="$emit('manage', course)"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          إدارة
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BookOpenIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const props = defineProps({
  course: {
    type: Object,
    required: true,
    default: () => ({}) // قيمة افتراضية
  }
})

const emit = defineEmits(['edit', 'manage', 'delete'])

// الحسابات
const isStudent = computed(() => authStore.user?.role === 'student')
const isTeacher = computed(() => ['teacher', 'instructor'].includes(authStore.user?.role))
const canEdit = computed(() => {
  return props.course.can_edit || props.course.user_id === authStore.user?.id
})

const getLevelText = (level) => {
  const levels = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  }
  return levels[level] || level
}

const getActionButtonText = (course) => {
  if (isStudent.value && course.is_enrolled) return 'متابعة التعلم'
  if (isStudent.value) return 'عرض التفاصيل'
  return 'عرض الكورس'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>