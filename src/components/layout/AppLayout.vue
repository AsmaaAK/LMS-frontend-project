<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Navbar -->
    <!-- <nav class="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          شعار وزر القائمة للموبايل -->
          <!-- <div class="flex items-center">
            <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden p-2">
              <Bars3Icon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <router-link to="/" class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <AcademicCapIcon class="w-6 h-6 text-white" />
              </div>
              <span class="mr-3 text-xl font-bold text-gray-900 dark:text-white">EduPlatform</span>
            </router-link>
          </div> -->
          <AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

          <!-- معلومات المستخدم والدور -->
          <!-- <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
              <span class="font-medium">{{ authStore.user?.name }}</span>
              <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs mr-2">
                {{ userRoleText }}
              </span>
            </div>
            <ThemeToggle />
            <NotificationBell />
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>  -->

    <!-- Sidebar and Main Content -->
    <div class="flex pt-17">
      <!-- Sidebar للشاشات الكبيرة -->
      <aside class=" hidden md:block w-64 bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] top-[4.2rem] shadow-lg fixed">
        <nav class="mt-8">
          <div class="px-4 space-y-2">
            <NavItem to="/" icon="HomeIcon" :active="$route.path === '/'">لوحة التحكم</NavItem>

            <!-- القوائم حسب الدور -->
            <template v-if="isStudent">
              <NavItem to="/courses" icon="BookOpenIcon" :active="$route.path.startsWith('/courses')">الكورسات</NavItem>
              <NavItem to="/assignments" icon="DocumentTextIcon" :active="$route.path.startsWith('/assignments')">الواجبات</NavItem>
              <NavItem to="/grades" icon="AcademicCapIcon" :active="$route.path.startsWith('/grades')">الدرجات</NavItem>
            </template>

            <template v-else-if="isInstructor">
              <NavItem to="/instructor/courses" icon="BookOpenIcon" :active="$route.path.startsWith('/instructor/courses')">دوراتي</NavItem>
              <NavItem to="/instructor/students" icon="UserGroupIcon" :active="$route.path.startsWith('/instructor/students')">الطلاب</NavItem>
              <NavItem to="/instructor/grading" icon="ClipboardDocumentCheckIcon" :active="$route.path.startsWith('/instructor/grading')">تصحيح الواجبات</NavItem>
              <NavItem to="/instructor/assignments" icon="DocumentPlusIcon" :active="$route.path.startsWith('/instructor/assignments')">إدارة الواجبات</NavItem>
            </template>

            <template v-else-if="isAdmin">
              <NavItem to="/admin/users" icon="UsersIcon" :active="$route.path.startsWith('/admin/users')">المستخدمين</NavItem>
              <NavItem to="/admin/courses" icon="BookOpenIcon" :active="$route.path.startsWith('/admin/courses')">إدارة الكورسات</NavItem>
              <NavItem to="/admin/reports" icon="ChartBarIcon" :active="$route.path.startsWith('/admin/reports')">التقارير</NavItem>
            </template>

            <!-- عناصر للجميع -->
            <NavItem to="/profile" icon="UserIcon" :active="$route.path.startsWith('/profile')">الملف الشخصي</NavItem>
            <NavItem to="/settings" icon="Cog6ToothIcon" :active="$route.path.startsWith('/settings')">الإعدادات</NavItem>
          </div>
        </nav>
      </aside>

      <!-- Sidebar للشاشات الصغيرة -->
      <div v-if="isSidebarOpen" class="md:hidden fixed inset-0 z-40">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="isSidebarOpen = false"></div>
        <div class="fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
          <nav class="mt-8">
            <div class="px-4 space-y-2">
              <!-- نفس العناصر كما في الأعلى -->
              <NavItem to="/" icon="HomeIcon" :active="$route.path === '/'" @click="isSidebarOpen=false">لوحة التحكم</NavItem>
              <template v-if="isStudent">
                <NavItem to="/courses" icon="BookOpenIcon" :active="$route.path.startsWith('/courses')" @click="isSidebarOpen=false">الكورسات</NavItem>
                <NavItem to="/assignments" icon="DocumentTextIcon" :active="$route.path.startsWith('/assignments')" @click="isSidebarOpen=false">الواجبات</NavItem>
                <NavItem to="/grades" icon="AcademicCapIcon" :active="$route.path.startsWith('/grades')" @click="isSidebarOpen=false">الدرجات</NavItem>
              </template>
              <template v-else-if="isInstructor">
                <NavItem to="/instructor/courses" icon="BookOpenIcon" :active="$route.path.startsWith('/instructor/courses')" @click="isSidebarOpen=false">دوراتي</NavItem>
                <NavItem to="/instructor/students" icon="UserGroupIcon" :active="$route.path.startsWith('/instructor/students')" @click="isSidebarOpen=false">الطلاب</NavItem>
                <NavItem to="/instructor/grading" icon="ClipboardDocumentCheckIcon" :active="$route.path.startsWith('/instructor/grading')" @click="isSidebarOpen=false">تصحيح الواجبات</NavItem>
                <NavItem to="/instructor/assignments" icon="DocumentPlusIcon" :active="$route.path.startsWith('/instructor/assignments')" @click="isSidebarOpen=false">إدارة الواجبات</NavItem>
              </template>
              <template v-else-if="isAdmin">
                <NavItem to="/admin/users" icon="UsersIcon" :active="$route.path.startsWith('/admin/users')" @click="isSidebarOpen=false">المستخدمين</NavItem>
                <NavItem to="/admin/courses" icon="BookOpenIcon" :active="$route.path.startsWith('/admin/courses')" @click="isSidebarOpen=false">إدارة الكورسات</NavItem>
                <NavItem to="/admin/reports" icon="ChartBarIcon" :active="$route.path.startsWith('/admin/reports')" @click="isSidebarOpen=false">التقارير</NavItem>
              </template>
              <NavItem to="/profile" icon="UserIcon" :active="$route.path.startsWith('/profile')" @click="isSidebarOpen=false">الملف الشخصي</NavItem>
              <NavItem to="/settings" icon="Cog6ToothIcon" :active="$route.path.startsWith('/settings')" @click="isSidebarOpen=false">الإعدادات</NavItem>
            </div>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <main :class="{'md:ml-64': !isSidebarOpen}" class="flex-1 lg:ml-2 pt-3 pr-70 transition-all duration-300">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'

import { Bars3Icon, AcademicCapIcon } from '@heroicons/vue/24/outline'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import NotificationBell from '@/components/ui/NotificationBell.vue'
import UserDropdown from '@/components/layout/UserDropdown.vue'
import NavItem from '@/components/layout/NavItem.vue'

const route = useRoute()
const authStore = useAuthStore()
const isSidebarOpen = ref(false)

const isStudent = computed(() => authStore.user?.role === 'student')
const isInstructor = computed(() => authStore.user?.role === 'teacher')
const isAdmin = computed(() => authStore.user?.role === 'admin')

const userRoleText = computed(() => {
  const roles = {
    admin: 'مدير النظام',
    instructor: 'مدرب',
    teacher: 'معلم',
    student: 'طالب'
  }
  return roles[authStore.user?.role] || 'مستخدم'
})

// إغلاق السايدبار عند النقر خارجها
const closeSidebarOnClickOutside = (event) => {
  if (!event.target.closest('.fixed') && isSidebarOpen.value) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeSidebarOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeSidebarOnClickOutside)
})
</script>
