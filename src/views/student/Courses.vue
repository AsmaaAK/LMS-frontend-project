<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">الكورسات المتاحة</h1>
      <p class="text-gray-600 dark:text-gray-400">استعرض جميع الكورسات المتاحة واختر ما يناسبك</p>
    </div>

    <!-- فلترة البحث -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">بحث</label>
          <input 
            v-model="filters.search"
            type="text"
            placeholder="ابحث عن كورس..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">التصنيف</label>
          <select 
            v-model="filters.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">جميع التصنيفات</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">المستوى</label>
          <select 
            v-model="filters.level"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">جميع المستويات</option>
            <option value="beginner">مبتدئ</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">متقدم</option>
          </select>
        </div>
      </div>
    </div>

    <!-- قائمة الكورسات -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="course in filteredCourses" :key="course.id" class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="h-48 bg-gray-200 dark:bg-gray-600 relative">
          <img v-if="course.image" :src="course.image" :alt="course.title" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
            <span class="text-white text-2xl font-bold">{{ course.title.charAt(0) }}</span>
          </div>
          <div class="absolute top-2 right-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {{ course.level }}
            </span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{{ course.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{{ course.description }}</p>
          
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-gray-500">{{ course.lessons_count }} دروس</span>
            <span class="text-sm font-semibold text-green-600">{{ course.price === 0 ? 'مجاني' : `$${course.price}` }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">بواسطة {{ course.instructor?.name }}</span>
            <button 
              v-if="!isEnrolled(course.id)"
              @click="enrollInCourse(course.id)"
              :disabled="enrolling"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              سجل الآن
            </button>
            <router-link 
              v-else
              :to="`/student/courses/${course.id}`"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              استمر في التعلم
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- حالة عدم وجود كورسات -->
    <div v-if="filteredCourses.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      <p class="mt-4 text-gray-600 dark:text-gray-400">لا توجد كورسات متاحة حالياً</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { courseService } from '@/services';

export default {
  name: 'StudentCourses',
  setup() {
    const courses = ref([]);
    const enrolledCourses = ref([]);
    const categories = ref([]);
    const enrolling = ref(false);
    const filters = ref({
      search: '',
      category: '',
      level: ''
    });

    const filteredCourses = computed(() => {
      return courses.value.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(filters.value.search.toLowerCase()) ||
                            course.description.toLowerCase().includes(filters.value.search.toLowerCase());
        const matchesCategory = !filters.value.category || course.category_id == filters.value.category;
        const matchesLevel = !filters.value.level || course.level === filters.value.level;
        
        return matchesSearch && matchesCategory && matchesLevel;
      });
    });

    const loadCourses = async () => {
      try {
        const [coursesResponse, enrolledResponse, categoriesResponse] = await Promise.all([
          courseService.getAllCourses(),
          courseService.getStudentCourses(),
          courseService.getCategories()
        ]);
        
        courses.value = coursesResponse.data.data;
        enrolledCourses.value = enrolledResponse.data.data;
        categories.value = categoriesResponse.data;
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    const isEnrolled = (courseId) => {
      return enrolledCourses.value.some(course => course.id === courseId);
    };

    const enrollInCourse = async (courseId) => {
      enrolling.value = true;
      try {
        await courseService.enroll(courseId);
        // أضف الكورس إلى القائمة المسجلة
        const course = courses.value.find(c => c.id === courseId);
        if (course) {
          enrolledCourses.value.push({ ...course, progress: 0 });
        }
      } catch (error) {
        console.error('Failed to enroll:', error);
        alert('فشل في التسجيل في الكورس');
      } finally {
        enrolling.value = false;
      }
    };

    onMounted(() => {
      loadCourses();
    });

    return {
      courses,
      enrolledCourses,
      categories,
      filters,
      filteredCourses,
      enrolling,
      isEnrolled,
      enrollInCourse
    };
  }
};
</script>