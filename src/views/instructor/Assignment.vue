<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- الهيدر -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">إدارة الواجبات</h1>
          </div>
          <nav class="flex space-x-8 space-x-reverse">
            <router-link to="/instructor" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الرئيسية</router-link>
            <router-link to="/instructor/courses" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">دوراتي</router-link>
            <router-link to="/instructor/lessons" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الدروس</router-link>
            <!-- <router-link to="/instructor/assignments" class="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">الواجبات</router-link> -->
            <router-link to="/instructor/statistics" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الإحصائيات</router-link>
          </nav>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- إحصائيات سريعة -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">الواجبات المنشأة</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalAssignments }}</p>
            </div>
            <div class="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">بانتظار التصحيح</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.pendingGrading }}</p>
            </div>
            <div class="h-12 w-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">تم التصحيح</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.graded }}</p>
            </div>
            <div class="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">متوسط الدرجات</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.averageGrade }}%</p>
            </div>
            <div class="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- قائمة الواجبات -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">الواجبات المنشأة</h2>
              <button 
                @click="openCreateAssignmentModal"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>إنشاء واجب</span>
              </button>
            </div>
            
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <div 
                v-for="assignment in assignments" 
                :key="assignment.id"
                class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 space-x-reverse mb-2">
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ assignment.title }}
                      </h3>
                      <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(assignment.status)">
                        {{ getStatusText(assignment.status) }}
                      </span>
                    </div>
                    
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {{ assignment.courseTitle }} • 
                      <span class="font-medium">{{ assignment.submissions }}/{{ assignment.totalStudents }} طالب</span>
                    </p>
                    
                    <p class="text-sm text-gray-500 dark:text-gray-500 mb-3">
                      {{ assignment.description }}
                    </p>
                    
                    <!-- معلومات الواجب -->
                    <div class="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                      <span>📅 {{ assignment.dueDate }}</span>
                      <span>⏱️ {{ assignment.maxGrade }} درجة</span>
                      <span>📎 {{ assignment.attachments }} مرفق</span>
                    </div>
                    
                    <!-- شريط التقدم -->
                    <div class="mt-3">
                      <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>نسبة التسليم</span>
                        <span>{{ Math.round((assignment.submissions / assignment.totalStudents) * 100) }}%</span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                             :style="{ width: Math.round((assignment.submissions / assignment.totalStudents) * 100) + '%' }">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- أزرار الإجراءات -->
                  <div class="flex items-center space-x-2 space-x-reverse ml-4">
                    <button 
                      @click="viewSubmissions(assignment)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      التقديمات ({{ assignment.pendingGrading }})
                    </button>
                    
                    <button 
                      @click="editAssignment(assignment)"
                      class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                      title="تعديل"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- التقديمات التي تحتاج مراجعة -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">تنتظر التصحيح</h2>
            </div>
            <div class="p-6 space-y-4">
              <div 
                v-for="submission in pendingSubmissions" 
                :key="submission.id"
                class="border border-orange-200 dark:border-orange-800 rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-medium text-orange-800 dark:text-orange-300">{{ submission.studentName }}</p>
                    <p class="text-sm text-orange-600 dark:text-orange-400 mt-1">{{ submission.assignmentTitle }}</p>
                    <p class="text-xs text-orange-500 dark:text-orange-500 mt-2">📅 {{ submission.submittedAt }}</p>
                  </div>
                  <button 
                    @click="gradeSubmission(submission)"
                    class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    تصحيح
                  </button>
                </div>
              </div>
              
              <div v-if="pendingSubmissions.length === 0" class="text-center py-4">
                <p class="text-gray-500 dark:text-gray-400 text-sm">لا توجد تقديمات تنتظر التصحيح</p>
              </div>
            </div>
          </div>

          <!-- الواجبات القادمة -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">مواعيد نهائية قريبة</h2>
            </div>
            <div class="p-6 space-y-3">
              <div 
                v-for="assignment in upcomingAssignments" 
                :key="assignment.id"
                class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">{{ assignment.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ assignment.courseTitle }}</p>
                </div>
                <span class="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded">
                  {{ assignment.daysLeft }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = ref({
  totalAssignments: 15,
  pendingGrading: 8,
  graded: 42,
  averageGrade: 76
})

const assignments = ref([
  {
    id: 1,
    title: 'مشروع الوحدة الثالثة - JavaScript',
    description: 'قم بإنشاء تطبيق لإدارة المهام باستخدام JavaScript الخالص',
    courseTitle: 'تعلم JavaScript المتقدم',
    status: 'active',
    submissions: 32,
    totalStudents: 45,
    pendingGrading: 5,
    dueDate: '2024-02-15',
    maxGrade: 100,
    attachments: 2
  },
  {
    id: 2,
    title: 'تمرين المكونات - Vue.js',
    description: 'أنشئ مكونات قابلة لإعادة الاستخدام في Vue.js',
    courseTitle: 'تطوير تطبيقات Vue.js',
    status: 'active',
    submissions: 25,
    totalStudents: 32,
    pendingGrading: 3,
    dueDate: '2024-02-20',
    maxGrade: 50,
    attachments: 1
  }
])

const pendingSubmissions = ref([
  {
    id: 1,
    studentName: 'أحمد محمد',
    assignmentTitle: 'مشروع الوحدة الثالثة - JavaScript',
    submittedAt: 'منذ يومين'
  },
  {
    id: 2,
    studentName: 'فاطمة علي',
    assignmentTitle: 'تمرين المكونات - Vue.js',
    submittedAt: 'منذ 5 ساعات'
  }
])

const upcomingAssignments = ref([
  {
    id: 1,
    title: 'اختبار منتصف الفصل',
    courseTitle: 'أساسيات Python',
    daysLeft: '3 أيام'
  },
  {
    id: 2,
    title: 'مشروع النهائي',
    courseTitle: 'تعلم JavaScript المتقدم',
    daysLeft: 'أسبوع'
  }
])

const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    archived: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status] || classes.draft
}

const getStatusText = (status) => {
  const texts = {
    active: 'نشط',
    draft: 'مسودة',
    archived: 'مؤرشف'
  }
  return texts[status] || status
}

const openCreateAssignmentModal = () => {
  console.log('فتح نموذج إنشاء واجب')
}

const viewSubmissions = (assignment) => {
  console.log('عرض تقديمات الواجب:', assignment.title)
  router.push(`/instructor/assignments/${assignment.id}/submissions`)
}

const editAssignment = (assignment) => {
  console.log('تعديل الواجب:', assignment.title)
  router.push(`/instructor/assignments/${assignment.id}/edit`)
}

const gradeSubmission = (submission) => {
  console.log('تصحيح التقديم:', submission.studentName)
  router.push(`/instructor/submissions/${submission.id}/grade`)
}
</script>