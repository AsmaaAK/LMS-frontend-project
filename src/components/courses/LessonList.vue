<template>
  <div class="space-y-3">
    <div 
      v-for="lesson in lessons" 
      :key="lesson.id"
      :class="[
        'flex items-center justify-between p-4 border rounded-lg transition-colors',
        lesson.completed 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      ]"
    >
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <!-- أيقونة الحالة -->
        <div 
          :class="[
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            lesson.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          ]"
        >
          <CheckIcon v-if="lesson.completed" class="w-4 h-4 text-white" />
          <span v-else class="text-white text-sm">{{ lesson.order }}</span>
        </div>

        <!-- معلومات الدرس -->
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white">{{ lesson.title }}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ lesson.duration }} • {{ lesson.type === 'video' ? 'فيديو' : 'نص' }}
          </p>
        </div>
      </div>

      <!-- الأزرار -->
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <button
          v-if="lesson.video_url"
          @click="playVideo(lesson)"
          class="p-2 text-blue-600 hover:text-blue-700"
          title="تشغيل الفيديو"
        >
          <PlayIcon class="w-5 h-5" />
        </button>
        
        <button
          @click="viewLesson(lesson)"
          class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          title="عرض الدرس"
        >
          <EyeIcon class="w-5 h-5" />
        </button>

        <BaseButton
          v-if="!lesson.completed && courseProgress >= (lesson.order - 1) * 10"
          size="small"
          variant="primary"
          @click="markAsComplete(lesson.id)"
        >
          إكمال
        </BaseButton>

        <span v-else-if="lesson.completed" class="text-green-600 text-sm font-medium">
          مكتمل
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
import BaseButton from '@/components/ui/BaseButton.vue'
import { CheckIcon, PlayIcon, EyeIcon } from '@heroicons/vue/24/outline'

defineProps({
  lessons: {
    type: Array,
    default: () => []
  },
  courseProgress: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['lesson-complete'])

const toast = useToast()

const viewLesson = (lesson) => {
  // التنقل إلى صفحة الدرس
  console.log('View lesson:', lesson)
}

const playVideo = (lesson) => {
  // فتح مشغل الفيديو
  console.log('Play video:', lesson)
}

const markAsComplete = async (lessonId) => {
  try {
    emit('lesson-complete', lessonId)
    toast.success('تم إكمال الدرس بنجاح')
  } catch (error) {
    toast.error('حدث خطأ أثناء إكمال الدرس')
  }
}
</script>