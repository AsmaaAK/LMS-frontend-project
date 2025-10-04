<!-- <template>
  <div class="space-y-4">
    <div v-if="courses.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
      لا توجد كورسات لعرضها
    </div>
    
    <div v-for="course in courses" :key="course.id" class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div class="flex items-center">
        <img :src="course.image" :alt="course.title" class="w-12 h-12 rounded-lg object-cover">
        <div class="mr-4">
          <h3 class="font-medium text-gray-900 dark:text-white">{{ course.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ course.instructor }}
            <span v-if="userRole === 'student'">• التقدم: {{ course.progress }}%</span>
            <span v-else>• الطلاب: {{ course.students }}</span>
          </p>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <router-link :to="`/app/courses/${course.id}`" 
                     class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
          {{ getActionText }}
        </router-link>
        
        <AccessControl permission="manage_own_courses" v-if="userRole === 'instructor'">
          <button class="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
            إدارة
          </button>
        </AccessControl>
      </div>
    </div>
  </div>
</template>

<script setup>
import AccessControl from '@/components/auth/AccessControl.vue'
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  courses: Array,
  userRole: String
})

const getActionText = computed(() => {
  switch (props.userRole) {
    case 'student': return 'متابعة التعلم'
    case 'instructor': return 'عرض الدورة'
    case 'admin': return 'تفاصيل'
    default: return 'عرض'
  }
})
</script> -->
<template>
  <div class="space-y-4">
    <div v-if="courses.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
      <BookOpenIcon class="w-12 h-12 mx-auto mb-3 opacity-50" />
      لا توجد كورسات لعرضها
    </div>
    
    <div 
      v-for="course in courses" 
      :key="course.id" 
      class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div class="flex items-center">
        <img 
          :src="course.image" 
          :alt="course.title" 
          class="w-12 h-12 rounded-lg object-cover"
          @error="handleImageError"
        >
        <div class="mr-4">
          <h3 class="font-medium text-gray-900 dark:text-white">{{ course.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ course.instructor }}
            <span v-if="userRole === 'student'">• التقدم: {{ course.progress }}%</span>
            <span v-else-if="['teacher', 'instructor'].includes(userRole)">• الطلاب: {{ course.students }}</span>
          </p>
          
          <!-- شريط التقدم للطالب -->
          <div v-if="userRole === 'student' && course.progress" class="mt-2 w-32">
            <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                class="bg-green-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${course.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex space-x-2 space-x-reverse">
        <button 
          @click="viewCourse(course)"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          {{ getActionText }}
        </button>
        
        <AccessControl 
          v-if="userRole === 'teacher' || userRole === 'instructor'" 
          permission="manage_own_courses"
        >
          <button 
            @click="manageCourse(course)"
            class="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            إدارة
          </button>
        </AccessControl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BookOpenIcon } from '@heroicons/vue/24/outline'
import AccessControl from '@/components/auth/AccessControl.vue'

const props = defineProps({
  courses: {
    type: Array,
    default: () => []
  },
  userRole: String
})

const emit = defineEmits(['view-course', 'manage-course'])

const getActionText = computed(() => {
  switch (props.userRole) {
    case 'student': return 'متابعة التعلم'
    case 'teacher': 
    case 'instructor': return 'عرض الدورة'
    case 'admin': return 'تفاصيل'
    default: return 'عرض'
  }
})

const viewCourse = (course) => {
  emit('view-course', course)
}

const manageCourse = (course) => {
  emit('manage-course', course)
}

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop'
}
</script>