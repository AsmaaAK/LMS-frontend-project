<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- الهيدر -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8 space-x-reverse">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">منصة التعلم</h1>
            <nav class="flex space-x-8 space-x-reverse">
              <router-link to="/student" class="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">
                الرئيسية
              </router-link>
              <router-link to="/student/courses" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white pb-1">
                دوراتي
              </router-link>
              <router-link to="/student/grades" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white pb-1">
                الدرجات
              </router-link>
              <router-link to="/student/notifications" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white pb-1">
                الإشعارات
              </router-link>
            </nav>
          </div>
          
          <div class="flex items-center space-x-4 space-x-reverse">
            <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
              طالب
            </span>
            <div class="relative">
              <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- إحصائيات سريعة -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">الدورات المسجلة</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.enrolledCourses }}</p>
            </div>
            <div class="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">متوسط التقدم</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.averageProgress }}%</p>
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
              <p class="text-sm text-gray-600 dark:text-gray-400">الواجبات المعلقة</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.pendingAssignments }}</p>
            </div>
            <div class="h-12 w-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- الدورات الحالية -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">دوراتي الحالية</h2>
            <router-link to="/student/courses" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
              عرض الكل
            </router-link>
          </div>
          <div class="p-6 space-y-4">
            <div 
              v-for="course in currentCourses" 
              :key="course.id"
              class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white">{{ course.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ course.instructor }}</p>
                  
                  <!-- شريط التقدم -->
                  <div class="mt-3">
                    <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>التقدم</span>
                      <span>{{ course.progress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-green-500 h-2 rounded-full transition-all duration-500" :style="{ width: course.progress + '%' }"></div>
                    </div>
                  </div>
                </div>
                <button 
                  @click="enterCourse(course)"
                  class="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  متابعة
                </button>
              </div>
            </div>
            
            <div v-if="currentCourses.length === 0" class="text-center py-8">
              <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
              </svg>
              <p class="mt-2 text-gray-600 dark:text-gray-400">لا توجد دورات مسجلة</p>
              <router-link 
                to="/courses"
                class="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                تصفح الدورات
              </router-link>
            </div>
          </div>
        </div>

        <!-- النشاط الأخير والإشعارات -->
        <div class="space-y-6">
          <!-- الإشعارات العاجلة -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">إشعارات عاجلة</h2>
            </div>
            <div class="p-6 space-y-4">
              <div 
                v-for="notification in urgentNotifications" 
                :key="notification.id"
                class="flex items-start space-x-3 space-x-reverse p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <svg class="h-4 w-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ notification.title }}</p>
                  <p class="text-sm text-red-600 dark:text-red-400 mt-1">{{ notification.message }}</p>
                  <p class="text-xs text-red-500 dark:text-red-500 mt-2">{{ notification.time }}</p>
                </div>
              </div>
              
              <div v-if="urgentNotifications.length === 0" class="text-center py-4">
                <p class="text-gray-500 dark:text-gray-400 text-sm">لا توجد إشعارات عاجلة</p>
              </div>
            </div>
          </div>

          <!-- الواجبات القادمة -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">واجبات قادمة</h2>
            </div>
            <div class="p-6 space-y-4">
              <div 
                v-for="assignment in upcomingAssignments" 
                :key="assignment.id"
                class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white text-sm">{{ assignment.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ assignment.course }}</p>
                  <p class="text-xs text-orange-600 dark:text-orange-400 mt-1">⏰ {{ assignment.dueDate }}</p>
                </div>
                <button 
                  @click="viewAssignment(assignment)"
                  class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  {{ assignment.submitted ? 'عرض' : 'تسليم' }}
                </button>
              </div>
              
              <div v-if="upcomingAssignments.length === 0" class="text-center py-4">
                <p class="text-gray-500 dark:text-gray-400 text-sm">لا توجد واجبات قادمة</p>
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
  enrolledCourses: 5,
  averageProgress: 68,
  pendingAssignments: 3,
  averageGrade: 85
})

const currentCourses = ref([
  {
    id: 1,
    title: 'تعلم JavaScript المتقدم',
    instructor: 'أحمد محمد',
    progress: 75
  },
  {
    id: 2,
    title: 'تطوير تطبيقات Vue.js',
    instructor: 'فاطمة علي',
    progress: 45
  },
  {
    id: 3,
    title: 'أساسيات Python',
    instructor: 'محمد الخالد',
    progress: 90
  }
])

const urgentNotifications = ref([
  {
    id: 1,
    title: 'اختبار نهائي',
    message: 'الاختبار النهائي لمادة JavaScript يوم الخميس القادم',
    time: 'منذ 2 ساعة'
  },
  {
    id: 2,
    title: 'تذكير بتسليم الواجب',
    message: 'آخر موعد لتسليم واجب Vue.js هو غداً',
    time: 'منذ 5 ساعات'
  }
])

const upcomingAssignments = ref([
  {
    id: 1,
    title: 'مشروع JavaScript النهائي',
    course: 'تعلم JavaScript المتقدم',
    dueDate: 'غداً 11:59 مساءً',
    submitted: false
  },
  {
    id: 2,
    title: 'تمرين Arrays',
    course: 'أساسيات Python',
    dueDate: 'بعد غد 5:00 مساءً',
    submitted: true
  }
])

const enterCourse = (course) => {
  console.log('الدخول إلى الدورة:', course.title)
  router.push(`/student/courses/${course.id}`)
}

const viewAssignment = (assignment) => {
  console.log('عرض الواجب:', assignment.title)
  if (assignment.submitted) {
    router.push(`/student/assignments/${assignment.id}`)
  } else {
    router.push(`/student/assignments/${assignment.id}/submit`)
  }
}
</script>