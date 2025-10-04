<template>
    <AppLayout>

  <div class="space-y-6">
    <!-- عنوان الترحيب حسب الدور -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ dashboardTitle }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          {{ dashboardSubtitle }}
        </p>
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        مرحباً، {{ authStore.user?.name }}
        <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs mr-2">
          {{ userRoleText }}
        </span>
      </div>
    </div>

    <!-- إحصائيات حسب الدور -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- إحصائيات للجميع -->
      <DashboardCard 
        title="الكورسات"
        :value="stats.courses"
        icon="courses"
        color="blue"
      />
      
      <!-- للطالب والمدرب -->
      <AccessControl :permission="['view_grades', 'grade_assignments']" any>
        <DashboardCard 
          title="معدل الإكمال"
          :value="stats.completionRate + '%'"
          icon="completion"
          color="green"
        />
      </AccessControl>
      
      <!-- للطالب -->
      <AccessControl permission="view_grades">
        <DashboardCard 
          title="الواجبات المعلقة"
          :value="stats.pendingAssignments"
          icon="assignments"
          color="yellow"
        />
      </AccessControl>
      
      <!-- للمدرب -->
      <AccessControl permission="grade_assignments">
        <DashboardCard 
          title="الواجبات للتصحيح"
          :value="stats.assignmentsToGrade"
          icon="grading"
          color="purple"
        />
      </AccessControl>
      
      <!-- للمدير -->
      <AccessControl permission="view_reports">
        <DashboardCard 
          title="إجمالي المستخدمين"
          :value="stats.totalUsers"
          icon="users"
          color="red"
        />
        <DashboardCard 
          title="الإيرادات"
          :value="stats.revenue"
          icon="revenue"
          color="green"
        />
      </AccessControl>
    </div>

    <!-- الأقسام المختلفة حسب الصلاحيات -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- قسم الكورسات (للجميع) -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ coursesSectionTitle }}
          </h2>
        </div>
        <div class="p-6">
          <CoursesList 
            :courses="recentCourses" 
            :user-role="authStore.currentRole"
            @view-course="handleViewCourse"
            @manage-course="handleManageCourse"
          />
        </div>
      </div>

      <!-- قسم النشاطات الحديثة -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">النشاط الحديث</h2>
        </div>
        <div class="p-6">
          <RecentActivity :activities="recentActivities" />
        </div>
      </div>
    </div>

    <!-- قسم التقارير (للمدير والمدرب) -->
    <AccessControl :permission="['view_reports', 'manage_students']" any>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">التقارير السريعة</h2>
        </div>
        <div class="p-6">
          <QuickReports :user-role="authStore.currentRole" />
        </div>
      </div>
    </AccessControl>

    <!-- إجراءات سريعة -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">إجراءات سريعة</h2>
      </div>
      <div class="p-6">
        <QuickActions :user-role="authStore.currentRole" />
      </div>
    </div>
  </div>
    </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AccessControl from '@/components/auth/AccessControl.vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import CoursesList from '@/components/dashboard/CoursesList.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import QuickReports from '@/components/dashboard/QuickReports.vue'
import QuickActions from '@/components/dashboard/QuickActions.vue'

const router = useRouter()
const authStore = useAuthStore()

// التوابع - هذه الدوال التي كانت ناقصة
const handleViewCourse = (course) => {
  console.log('View course:', course)
  // التنقل لصفحة الكورس
  router.push(`/courses/${course.id}`)
}

const handleManageCourse = (course) => {
  console.log('Manage course:', course)
  // التنقل لصفحة إدارة الكورس (للمدرس)
  router.push(`/instructor/courses/${course.id}/manage`)
}

// العناوين حسب الدور
const dashboardTitle = computed(() => {
  console.log("current role", authStore.currentRole)
  switch (authStore.currentRole) {
    case 'admin': return 'لوحة التحكم - الإدارة'
    case 'teacher': 
    case 'instructor': return 'لوحة التحكم - المدرب'
    case 'student': return 'لوحة التحكم - الطالب'
    default: return 'لوحة التحكم'
  }
})

const dashboardSubtitle = computed(() => {
  switch (authStore.currentRole) {
    case 'admin': return 'نظرة عامة على النظام وإدارة المحتوى'
    case 'teacher': 
    case 'instructor': return 'متابعة دوراتك وطلابك'
    case 'student': return 'تابع تقدمك التعليمي'
    default: return 'نظرة عامة على حسابك'
  }
})

const userRoleText = computed(() => {
  const roles = {
    admin: 'مدير النظام',
    instructor: 'مدرب',
    teacher: 'معلم',
    student: 'طالب'
  }
  return roles[authStore.currentRole] || 'مستخدم'
})

const coursesSectionTitle = computed(() => {
  switch (authStore.currentRole) {
    case 'admin': return 'آخر الكورسات في النظام'
    case 'teacher': 
    case 'instructor': return 'دوراتي الأخيرة'
    case 'student': return 'كورساتي المسجلة'
    default: return 'الكورسات'
  }
})

// البيانات حسب الدور
const stats = ref({})
const recentCourses = ref([])
const recentActivities = ref([])

onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  // محاكاة جلب البيانات حسب الدور
  const roleData = {
    admin: {
      courses: 45,
      completionRate: 85,
      totalUsers: 1248,
      revenue: '₪24,500',
      pendingAssignments: 0,
      assignmentsToGrade: 0
    },
    teacher: {
      courses: 6,
      completionRate: 78,
      totalUsers: 0,
      revenue: '₪3,200',
      pendingAssignments: 0,
      assignmentsToGrade: 12
    },
    instructor: {
      courses: 6,
      completionRate: 78,
      totalUsers: 0,
      revenue: '₪3,200',
      pendingAssignments: 0,
      assignmentsToGrade: 12
    },
    student: {
      courses: 5,
      completionRate: 65,
      totalUsers: 0,
      revenue: '₪0',
      pendingAssignments: 3,
      assignmentsToGrade: 0
    }
  }

  stats.value = roleData[authStore.currentRole] || roleData.student

  // تحميل الكورسات حسب الدور
  recentCourses.value = await loadCoursesByRole()
  
  // تحميل النشاطات
  recentActivities.value = await loadRecentActivities()
}

const loadCoursesByRole = async () => {
  // محاكاة جلب الكورسات حسب الصلاحية
  const baseCourses = [
    {
      id: 1,
      title: 'تعلم JavaScript المتقدم',
      instructor: 'أحمد محمد',
      progress: 75,
      students: 45,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      title: 'تصميم واجهات المستخدم',
      instructor: 'فاطمة علي',
      progress: 30,
      students: 32,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      title: 'تعلم Laravel من الصفر',
      instructor: 'محمد أحمد',
      progress: 90,
      students: 28,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop'
    }
  ]

  if (authStore.currentRole === 'student') {
    return baseCourses.filter(course => course.progress < 100)
  } else if (authStore.currentRole === 'teacher' || authStore.currentRole === 'instructor') {
    return baseCourses // المدرب يرى دوراته
  } else {
    return baseCourses // المدير يرى كل شيء
  }
}

const loadRecentActivities = async () => {
  // محاكاة بيانات النشاطات
  return [
    {
      id: 1,
      type: 'enrollment',
      message: 'طالب جديد انضم للكورس',
      time: 'منذ 5 دقائق',
      user: 'محمد أحمد'
    },
    {
      id: 2,
      type: 'submission',
      message: 'تم تسليم واجب جديد',
      time: 'منذ ساعة',
      user: 'سارة محمد'
    },
    {
      id: 3,
      type: 'completion',
      message: 'تم إكمال كورس بنجاح',
      time: 'منذ 3 ساعات',
      user: 'أحمد علي'
    },
    {
      id: 4,
      type: 'comment',
      message: 'تعليق جديد على المناقشة',
      time: 'منذ 5 ساعات',
      user: 'فاطمة حسن'
    }
  ]
}
</script>