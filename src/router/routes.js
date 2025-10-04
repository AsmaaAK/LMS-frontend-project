import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'الرئيسية' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { title: 'تسجيل الدخول', guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Signup.vue'),
    meta: { title: 'إنشاء حساب', guest: true }
  },

  // المسار الرئيسي للمستخدمين المسجلين
  {
    path: '/dashboard',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'لوحة التحكم' }
      }
    ]
  },

  // مسارات الطالب
  {
    path: '/student',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true, role: 'student' },
    children: [
      {
        path: 'dashboard',
        name: 'student-dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'لوحة الطالب' }
      },
      {
        path: 'courses',
        name: 'student-courses',
        component: () => import('@/views/courses/Courses.vue'),
        meta: { title: 'الكورسات' }
      },
      {
        path: 'courses/:id',
        name: 'student-course-detail',
        component: () => import('@/views/courses/CourseDetail.vue'),
        meta: { title: 'تفاصيل الكورس' }
      },
       
      {
        path: 'assignments',
        name: 'student-assignments',
        component: () => import('@/views/student/Assignments.vue'),
        meta: { title: 'الواجبات' }
      },
      {
        path: 'grades',
        name: 'student-grades',
        component: () => import('@/views/student/Grades.vue'),
        meta: { title: 'الدرجات' }
      }
    ]
  },

  // مسارات المعلم
  {
    path: '/instructor',
    component: () => import('@/components/layout/AppLayout.vue'), // يمكنك استخدام AppLayout أو إنشاء InstructorLayout
    meta: { requiresAuth: true, role: 'instructor' },
    children: [
      {
        path: 'dashboard',
        name: 'instructor-dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'لوحة المعلم' }
      },
      {
        path: 'courses',
        name: 'instructor-courses',
        component: () => import('@/views/courses/Courses.vue'), // أو MyCourses إذا كان مختلفاً
        meta: { title: 'كورساتي' }
      },
      {
        path: 'courses/create',
        name: 'instructor-create-course',
        component: () => import('@/views/courses/CreateCourse.vue'),
        meta: { title: 'إنشاء كورس' }
      },
      {
        path: 'courses/:id',
        name: 'instructor-course-detail',
        component: () => import('@/views/courses/CourseDetail.vue'),
        meta: { title: 'تفاصيل الكورس' }
      },
      {
        path: 'courses/:id/edit',
        name: 'instructor-edit-course',
        component: () => import('@/views/courses/CreateCourse.vue'),
        meta: { title: 'تعديل الكورس' }
      },
      {
        path: 'students',
        name: 'instructor-students',
        component: () => import('@/views/instructor/Students.vue'),
        meta: { title: 'الطلاب' }
      },
      {
        path: 'assignments',
        name: 'instructor-assignments',
        component: () => import('@/views/instructor/Assignment.vue'),
        meta: { title: 'الواجبات' }
      },
      {
        path: 'assignments/:id/submissions',
        name: 'assignment-submissions',
        component: () => import('@/views/instructor/AssignmentSubmissions.vue'),
        meta: { title: 'تسليمات الواجب' }
      },
      {
        path: 'grading',
        name: 'instructor-grading',
        component: () => import('@/views/instructor/Grading.vue'),
        meta: { title: 'تصحيح الواجبات' }
      }
    ]
  },

  // مسارات المدير
  {
    path: '/admin',
    component: () => import('@/components/layout/AppLayout.vue'), // أو AdminLayout
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'لوحة الإدارة' }
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/UsersManagement.vue'),
        meta: { title: 'إدارة المستخدمين' }
      },
      {
        path: 'courses',
        name: 'admin-courses',
        component: () => import('@/views/courses/Courses.vue'),
        meta: { title: 'إدارة الكورسات' }
      },
      {
        path: 'courses/create',
        name: 'create-course',
        component: () => import('@/views/courses/CreateCourse.vue'),
        meta: { title: 'انشاء الكورس' }
      },
      {
        path: 'analytics',
        name: 'admin-analytics',
        component: () => import('@/views/admin/Analytics.vue'),
        meta: { title: 'التقارير والإحصائيات' }
      }
    ]
  },

  // مسارات مشتركة لجميع المستخدمين المسجلين
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/account/Profile.vue'),
        meta: { title: 'الملف الشخصي' }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/account/Settings.vue'),
        meta: { title: 'الإعدادات' }
      },
      // مسارات الكورسات العامة (يمكن للجميع رؤيتها)
      {
        path: 'courses',
        name: 'courses',
        component: () => import('@/views/courses/Courses.vue'),
        meta: { title: 'الكورسات' }
      },
      {
        path: 'courses/:id',
        name: 'course-detail',
        component: () => import('@/views/courses/CourseDetail.vue'),
        meta: { title: 'تفاصيل الكورس' }
      }
    ]
  },

  // 404 - يجب أن يكون آخر مسار
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'الصفحة غير موجودة' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware للتحقق من الصلاحيات
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // إعداد عنوان الصفحة
  if (to.meta.title) {
    document.title = `${to.meta.title} - EduPlatform`
  }

  // التحقق من المصادقة
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // التحقق من أن الضيوف فقط يمكنهم الوصول
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }

  // التحقق من الصلاحيات
  if (to.meta.role) {
    if (authStore.user?.role !== to.meta.role) {
      // إعادة التوجيه للدايشبورد المناسب حسب الدور
      const dashboardRoutes = {
        student: '/dashboard',
        instructor: '/dashboard',
        teacher: '/dashboard',
        admin: '/dashboard'
      }
      next(dashboardRoutes[authStore.user?.role] || '/dashboard')
      return
    }
  }

  // التحقق من مجموعة أدوار
  if (to.meta.roles) {
    if (!to.meta.roles.includes(authStore.user?.role)) {
      next('/dashboard')
      return
    }
  }

  next()
})

export default routes