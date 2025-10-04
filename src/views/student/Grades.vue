<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- الهيدر -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8 space-x-reverse">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">الدرجات</h1>
            <nav class="flex space-x-8 space-x-reverse">
              <router-link to="/student" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الرئيسية</router-link>
              <router-link to="/student/courses" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">دوراتي</router-link>
              <router-link to="/student/grades" class="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">الدرجات</router-link>
              <router-link to="/student/notifications" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">الإشعارات</router-link>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- نظرة عامة على الدرجات -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">المعدل التراكمي</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ overview.gpa }}/4.0</p>
              <p class="text-sm text-green-600 dark:text-green-400 mt-1">+0.2 عن الفصل الماضي</p>
            </div>
            <div class="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">متوسط الدرجات</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ overview.averageGrade }}%</p>
              <p class="text-sm text-green-600 dark:text-green-400 mt-1">+5% عن الشهر الماضي</p>
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
              <p class="text-sm text-gray-600 dark:text-gray-400">الواجبات المسلمة</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ overview.completedAssignments }}/{{ overview.totalAssignments }}</p>
              <p class="text-sm text-blue-600 dark:text-blue-400 mt-1">{{ Math.round((overview.completedAssignments / overview.totalAssignments) * 100) }}% إنجاز</p>
            </div>
            <div class="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- قائمة الدرجات -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">الدرجات حسب المادة</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      المادة
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      المدرس
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      المعدل
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="course in coursesGrades" :key="course.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <span class="text-blue-600 dark:text-blue-400 font-semibold text-sm">{{ course.code }}</span>
                        </div>
                        <div class="mr-4">
                          <div class="text-sm font-medium text-gray-900 dark:text-white">
                            {{ course.title }}
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            {{ course.credits }} ساعة معتمدة
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {{ course.instructor }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white mr-2">
                          {{ course.grade }}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                          ({{ course.percentage }}%)
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(course.status)">
                        {{ getStatusText(course.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        @click="viewCourseDetails(course)"
                        class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        التفاصيل
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- التفاصيل التفصيلية -->
          <div class="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">تفاصيل التقديرات</h2>
            </div>
            <div class="p-6">
              <div class="space-y-6">
                <div v-for="course in detailedGrades" :key="course.id">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ course.title }}</h3>
                  <div class="space-y-3">
                    <div 
                      v-for="assignment in course.assignments" 
                      :key="assignment.id"
                      class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div class="flex-1">
                        <h4 class="font-medium text-gray-900 dark:text-white">{{ assignment.title }}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ assignment.type }} • {{ assignment.dueDate }}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">
                          {{ assignment.grade }}/{{ assignment.maxGrade }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          {{ Math.round((assignment.grade / assignment.maxGrade) * 100) }}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- الشريط الجانبي -->
        <div class="space-y-6">
          <!-- أفضل الأداء -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">أفضل الأداء</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div 
                  v-for="course in topPerformance" 
                  :key="course.id"
                  class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div>
                    <p class="font-medium text-green-800 dark:text-green-300 text-sm">{{ course.title }}</p>
                    <p class="text-xs text-green-600 dark:text-green-400 mt-1">{{ course.instructor }}</p>
                  </div>
                  <span class="text-green-800 dark:text-green-300 font-semibold">{{ course.grade }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- تحتاج تحسين -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">تحتاج تحسين</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div 
                  v-for="course in needImprovement" 
                  :key="course.id"
                  class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
                >
                  <div>
                    <p class="font-medium text-orange-800 dark:text-orange-300 text-sm">{{ course.title }}</p>
                    <p class="text-xs text-orange-600 dark:text-orange-400 mt-1">{{ course.instructor }}</p>
                  </div>
                  <span class="text-orange-800 dark:text-orange-300 font-semibold">{{ course.grade }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- الإحصائيات -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">إحصائيات</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">المعدل التراكمي</span>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ overview.gpa }}/4.0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">الساعات المعتمدة</span>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ overview.totalCredits }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">المعدل الفصلي</span>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ overview.semesterGPA }}/4.0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">الترتيب</span>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">#{{ overview.rank }}</span>
                </div>
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

const overview = ref({
  gpa: 3.8,
  averageGrade: 85,
  completedAssignments: 12,
  totalAssignments: 15,
  totalCredits: 45,
  semesterGPA: 3.9,
  rank: 15
})

const coursesGrades = ref([
  {
    id: 1,
    code: 'JS101',
    title: 'تعلم JavaScript المتقدم',
    instructor: 'أحمد محمد',
    credits: 3,
    grade: 'A',
    percentage: 92,
    status: 'completed'
  },
  {
    id: 2,
    code: 'VUE201',
    title: 'تطوير تطبيقات Vue.js',
    instructor: 'فاطمة علي',
    credits: 3,
    grade: 'A-',
    percentage: 88,
    status: 'in-progress'
  },
  {
    id: 3,
    code: 'PY101',
    title: 'أساسيات Python',
    instructor: 'محمد الخالد',
    credits: 3,
    grade: 'B+',
    percentage: 82,
    status: 'completed'
  },
  {
    id: 4,
    code: 'DB301',
    title: 'قواعد البيانات',
    instructor: 'سارة أحمد',
    credits: 4,
    grade: 'B',
    percentage: 78,
    status: 'in-progress'
  }
])

const detailedGrades = ref([
  {
    id: 1,
    title: 'تعلم JavaScript المتقدم',
    assignments: [
      {
        id: 1,
        title: 'مشروع الوحدة الأولى',
        type: 'مشروع',
        dueDate: '2024-01-15',
        grade: 45,
        maxGrade: 50
      },
      {
        id: 2,
        title: 'اختبار منتصف الفصل',
        type: 'اختبار',
        dueDate: '2024-02-01',
        grade: 38,
        maxGrade: 40
      },
      {
        id: 3,
        title: 'تمرين الدوال',
        type: 'تمرين',
        dueDate: '2024-01-20',
        grade: 18,
        maxGrade: 20
      }
    ]
  }
])

const topPerformance = ref([
  {
    id: 1,
    title: 'تعلم JavaScript المتقدم',
    instructor: 'أحمد محمد',
    grade: 'A (92%)'
  },
  {
    id: 2,
    title: 'تطوير تطبيقات Vue.js',
    instructor: 'فاطمة علي',
    grade: 'A- (88%)'
  }
])

const needImprovement = ref([
  {
    id: 3,
    title: 'قواعد البيانات',
    instructor: 'سارة أحمد',
    grade: 'B (78%)'
  }
])

const getStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'not-started': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
  return classes[status] || classes['not-started']
}

const getStatusText = (status) => {
  const texts = {
    completed: 'مكتمل',
    'in-progress': 'قيد التقدم',
    'not-started': 'لم يبدأ'
  }
  return texts[status] || status
}

const viewCourseDetails = (course) => {
  console.log('عرض تفاصيل المادة:', course.title)
  router.push(`/student/courses/${course.id}`)
}
</script>