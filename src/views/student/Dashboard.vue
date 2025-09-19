<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        مرحباً، {{ user.name }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">لوحة تحكم الطالب</p>
    </div>

    <!-- إحصائيات سريعة -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ enrolledCourses.length }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">الكورسات المسجلة</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ completedCourses }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">الكورسات المكتملة</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ ongoingCourses }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">الكورسات قيد التقدم</p>
          </div>
        </div>
      </div>
    </div>

    <!-- الكورسات الحديثة -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">كورساتي الحديثة</h2>
      </div>
      <div class="p-6">
        <div v-if="enrolledCourses.length === 0" class="text-center py-8">
          <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <p class="mt-4 text-gray-600 dark:text-gray-400">لم تسجل في أي كورسات بعد</p>
          <router-link to="/student/courses" class="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            استعرض الكورسات
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="course in recentCourses" :key="course.id" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-32 bg-gray-200 dark:bg-gray-600 relative">
              <img v-if="course.image" :src="course.image" :alt="course.title" class="w-full h-full object-cover">
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
                <span class="text-white text-2xl font-bold">{{ course.title.charAt(0) }}</span>
              </div>
              <div class="absolute top-2 right-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {{ course.progress }}%
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{{ course.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{{ course.description }}</p>
              <div class="flex justify-between items-center">
                <router-link :to="`/student/courses/${course.id}`" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  استمر في التعلم
                </router-link>
                <span class="text-xs text-gray-500">{{ course.lessons_count }} دروس</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { courseService } from '@/services';

export default {
  name: 'StudentDashboard',
  setup() {
    const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));
    const enrolledCourses = ref([]);
    const router = useRouter();

    const completedCourses = computed(() => {
      return enrolledCourses.value.filter(course => course.progress === 100).length;
    });

    const ongoingCourses = computed(() => {
      return enrolledCourses.value.filter(course => course.progress > 0 && course.progress < 100).length;
    });

    const recentCourses = computed(() => {
      return enrolledCourses.value.slice(0, 3);
    });

    const loadEnrolledCourses = async () => {
      try {
        const response = await courseService.getStudentCourses();
        enrolledCourses.value = response.data.data;
      } catch (error) {
        console.error('Failed to load enrolled courses:', error);
      }
    };

    onMounted(() => {
      loadEnrolledCourses();
    });

    return {
      user,
      enrolledCourses,
      completedCourses,
      ongoingCourses,
      recentCourses
    };
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>