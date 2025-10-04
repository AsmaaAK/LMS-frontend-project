<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{{ grade.assignment_title }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ grade.course_name }}</p>
      </div>
      
      <div class="text-right">
        <div class="text-2xl font-bold text-blue-600">{{ grade.score }}/{{ grade.max_score }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ calculatePercentage(grade.score, grade.max_score) }}%
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
      <div>
        <span class="font-medium">نوع التقييم:</span>
        <span class="mr-2">{{ getTypeName(grade.type) }}</span>
      </div>
      <div>
        <span class="font-medium">تاريخ التصحيح:</span>
        <span class="mr-2">{{ formatDate(grade.graded_at) }}</span>
      </div>
    </div>

    <!-- التعليق -->
    <div v-if="grade.feedback" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
      <h4 class="font-medium text-gray-900 dark:text-white mb-2">تعليق المعلم:</h4>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ grade.feedback }}</p>
    </div>

    <!-- التقدم -->
    <div class="mb-4">
      <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
        <span>الأداء</span>
        <span>{{ calculatePercentage(grade.score, grade.max_score) }}%</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          class="h-2 rounded-full transition-all duration-300"
          :class="getProgressColor(grade.score, grade.max_score)"
          :style="{ width: `${calculatePercentage(grade.score, grade.max_score)}%` }"
        ></div>
      </div>
    </div>

    <BaseButton 
      variant="secondary" 
      size="small"
      @click="$emit('view', grade)"
    >
      عرض التفاصيل
    </BaseButton>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/helpers'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  grade: {
    type: Object,
    required: true
  }
})

defineEmits(['view'])

const calculatePercentage = (score, maxScore) => {
  if (!score || !maxScore) return 0
  return Math.round((score / maxScore) * 100)
}

const getTypeName = (type) => {
  const types = {
    assignment: 'واجب',
    quiz: 'اختبار',
    exam: 'امتحان'
  }
  return types[type] || type
}

const getProgressColor = (score, maxScore) => {
  const percentage = calculatePercentage(score, maxScore)
  
  if (percentage >= 90) return 'bg-green-500'
  if (percentage >= 70) return 'bg-blue-500'
  if (percentage >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>