<template>
  <aside 
    :class="[
      'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- زر طي/فتح الشريط الجانبي -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div v-if="!isCollapsed" class="flex items-center space-x-2 rtl:space-x-reverse">
        <UserCircleIcon class="h-8 w-8 text-blue-600" />
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {{ $t(`roles.${user.role}`) }}
          </p>
        </div>
      </div>
      
      <button
        @click="toggleSidebar"
        class="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <ChevronLeftIcon v-if="!isCollapsed" class="w-5 h-5" />
        <ChevronRightIcon v-else class="w-5 h-5" />
      </button>
    </div>

    <!-- قائمة التنقل -->
    <nav class="p-2">
      <ul class="space-y-1">
        <li v-for="item in navigationItems" :key="item.name">
          <RouterLink
            :to="item.path"
            :class="[
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              isActive(item) 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-700 dark:text-gray-300'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <span v-if="!isCollapsed" class="mr-3 rtl:ml-3">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>

      <!-- قسم الإدارة (للمديرين والمعلمين فقط) -->
      <div v-if="hasAdminAccess" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p v-if="!isCollapsed" class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          الإدارة
        </p>
        <ul class="space-y-1 mt-2">
          <li v-for="item in adminNavigationItems" :key="item.name">
            <RouterLink
              :to="item.path"
              :class="[
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                isActive(item) 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
              <span v-if="!isCollapsed" class="mr-3 rtl:ml-3">{{ item.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- التقدم العام (للطلاب) -->
    <div v-if="isStudent && !isCollapsed" class="p-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-900 dark:text-white">التقدم العام</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ overallProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          class="bg-green-500 h-2 rounded-full transition-all duration-300" 
          :style="{ width: `${overallProgress}%` }"
        ></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useEnrollmentsStore } from '@/stores/enrollments'
import {
  HomeIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()
const enrollmentsStore = useEnrollmentsStore()

const isCollapsed = ref(false)
const overallProgress = ref(0)

const user = computed(() => authStore.user || {})
const isStudent = computed(() => authStore.isStudent)
const isTeacher = computed(() => authStore.isTeacher)
const isAdmin = computed(() => authStore.isAdmin)
const hasAdminAccess = computed(() => isTeacher.value || isAdmin.value)

// عناصر التنقل الأساسية
const baseNavigationItems = computed(() => [
  {
    name: t('navigation.home'),
    path: '/',
    icon: HomeIcon
  },
  {
    name: t('navigation.dashboard'),
    path: getDashboardPath(),
    icon: ChartBarIcon
  },
  {
    name: t('navigation.courses'),
    path: getCoursesPath(),
    icon: AcademicCapIcon
  },
  {
    name: t('navigation.assignments'),
    path: getAssignmentsPath(),
    icon: DocumentTextIcon
  }
])

// عناصر التنقل للإدارة
const adminNavigationItems = computed(() => {
  const items = []
  
  if (isTeacher.value) {
    items.push({
      name: 'كورساتي',
      path: '/instructor/courses',
      icon: AcademicCapIcon
    })
  }
  
  if (isAdmin.value) {
    items.push(
      {
        name: t('navigation.users'),
        path: '/admin/users',
        icon: UserGroupIcon
      },
      {
        name: t('navigation.analytics'),
        path: '/admin/analytics',
        icon: ChartBarIcon
      }
    )
  }
  
  items.push({
    name: t('navigation.settings'),
    path: '/settings',
    icon: CogIcon
  })
  
  return items
})

// العناصر المعروضة بناءً على دور المستخدم
const navigationItems = computed(() => {
  return baseNavigationItems.value.filter(item => {
    if (item.path === '/admin' && !isAdmin.value) return false
    return true
  })
})

onMounted(async () => {
  if (isStudent.value) {
    await enrollmentsStore.fetchUserEnrollments()
    calculateOverallProgress()
  }
})

const getDashboardPath = () => {
  if (isStudent.value) return '/dashboard'
  if (isTeacher.value) return '/dashboard'
  if (isAdmin.value) return '/dashboard'
  return '/'
}

const getCoursesPath = () => {
  if (isStudent.value) return '/student/courses'
  if (isTeacher.value) return '/instructor/courses'
  return '/courses'
}

const getAssignmentsPath = () => {
  if (isStudent.value) return '/student/assignments'
  return '/assignments'
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const isActive = (item) => {
  return route.path === item.path || route.path.startsWith(item.path + '/')
}

const calculateOverallProgress = () => {
  if (enrollmentsStore.enrollments.length === 0) {
    overallProgress.value = 0
    return
  }
  
  const totalProgress = enrollmentsStore.enrollments.reduce((sum, enrollment) => {
    return sum + (enrollment.progress || 0)
  }, 0)
  
  overallProgress.value = Math.round(totalProgress / enrollmentsStore.enrollments.length)
}
</script>