<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">تصحيح الواجبات</h1>
    </div>

    <!-- إحصائيات -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <DocumentTextIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">الواجبات المعلقة</p>
            <p class="text-2xl font-bold text-gray-900">{{ statistics.pendingSubmissions }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <CheckCircleIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">تم تصحيحها</p>
            <p class="text-2xl font-bold text-gray-900">{{ statistics.gradedSubmissions }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- قائمة الواجبات للتصحيح -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="border-b border-gray-200 px-6 py-4">
        <h2 class="text-lg font-semibold text-gray-900">الواجبات المعلقة</h2>
      </div>
      
      <div class="divide-y divide-gray-200">
        <div 
          v-for="submission in pendingSubmissions" 
          :key="submission.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-2">{{ submission.assignment_title }}</h3>
              <p class="text-gray-600 text-sm mb-3">الطالب: {{ submission.student_name }}</p>
              <p class="text-gray-500 text-sm">تم التقديم: {{ formatDate(submission.submitted_at) }}</p>
            </div>
            
            <div class="flex gap-3">
              <button
                @click="viewSubmission(submission)"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                عرض التقديم
              </button>
              <button
                @click="gradeSubmission(submission)"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                تقييم
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- لا توجد واجبات -->
      <div v-if="pendingSubmissions.length === 0" class="text-center py-12">
        <CheckCircleIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">لا توجد واجبات معلقة</h3>
        <p class="mt-1 text-sm text-gray-500">جميع الواجبات تم تصحيحها.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { DocumentTextIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const submissions = ref([])
const statistics = ref({
  pendingSubmissions: 0,
  gradedSubmissions: 0
})

const pendingSubmissions = computed(() => {
  return submissions.value.filter(sub => !sub.graded)
})

const loadSubmissions = async () => {
  try {
    // محاكاة بيانات
    submissions.value = [
      {
        id: 1,
        assignment_title: 'مشروع Vue.js النهائي',
        student_name: 'أحمد محمد',
        submitted_at: new Date().toISOString(),
        graded: false
      },
      {
        id: 2,
        assignment_title: 'تمارين Laravel',
        student_name: 'فاطمة علي',
        submitted_at: new Date(Date.now() - 86400000).toISOString(),
        graded: false
      }
    ]

    statistics.value.pendingSubmissions = pendingSubmissions.value.length
    statistics.value.gradedSubmissions = submissions.value.length - pendingSubmissions.value.length
  } catch (error) {
    console.error('Error loading submissions:', error)
  }
}

const viewSubmission = (submission) => {
  console.log('View submission:', submission)
}

const gradeSubmission = (submission) => {
  console.log('Grade submission:', submission)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG')
}

onMounted(() => {
  loadSubmissions()
})
</script>