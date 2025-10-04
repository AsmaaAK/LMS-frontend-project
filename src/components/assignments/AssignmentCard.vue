<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
          {{ assignment.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
          في كورس: {{ assignment.course.title }}
        </p>
      </div>
      
      <span class="px-3 py-1 text-xs font-medium rounded-full" 
            :class="statusBadgeClasses">
        {{ statusText }}
      </span>
    </div>

    <p class="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
      {{ assignment.description }}
    </p>

    <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
      <div>
        <span>الدرجة الكاملة: </span>
        <span class="font-semibold">{{ assignment.max_score }}</span>
      </div>
      
      <div v-if="assignment.deadline" class="text-right">
        <div class="flex items-center" :class="isOverdue ? 'text-red-600' : ''">
          <ClockIcon class="w-4 h-4 ml-1" />
          <span>ينتهي في: {{ formatDate(assignment.deadline) }}</span>
        </div>
      </div>
    </div>

    <!-- حالة التسليم -->
    <div v-if="submission" class="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium">مسلم في: {{ formatDate(submission.submitted_at) }}</span>
        <span v-if="submission.score" class="font-semibold text-green-600">
          الدرجة: {{ submission.score }}/{{ assignment.max_score }}
        </span>
        <span v-else class="text-yellow-600 text-sm">بانتظار التصحيح</span>
      </div>
      <p v-if="submission.comment" class="text-sm text-gray-600 dark:text-gray-300 mt-1">
        {{ submission.comment }}
      </p>
    </div>

    <!-- الأزرار -->
    <div class="flex justify-end space-x-2 rtl:space-x-reverse">
      <BaseButton 
        v-if="!submission && !isOverdue"
        variant="primary"
        size="small"
        @click="$emit('submit', assignment)"
      >
        تسليم الواجب
      </BaseButton>
      
      <BaseButton 
        v-else-if="submission"
        variant="secondary"
        size="small"
        @click="$emit('view', assignment)"
      >
        {{ submission.score ? 'عرض النتيجة' : 'عرض التسليم' }}
      </BaseButton>

      <BaseButton 
        variant="secondary"
        size="small"
        @click="$emit('view', assignment)"
      >
        عرض التفاصيل
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ClockIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  assignment: {
    type: Object,
    required: true
  },
  submission: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'view'])

const isOverdue = computed(() => {
  if (!props.assignment.deadline) return false
  return new Date(props.assignment.deadline) < new Date()
})

const statusText = computed(() => {
  if (props.submission) {
    return props.submission.score ? 'مصحح' : 'مسلم'
  }
  return isOverdue.value ? 'منتهي' : 'معلق'
})

const statusBadgeClasses = computed(() => {
  if (props.submission) {
    return props.submission.score 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
  return isOverdue.value
    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>