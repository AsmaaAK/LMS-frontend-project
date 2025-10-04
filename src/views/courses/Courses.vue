<!-- src/views/courses/Courses.vue -->
<template>
  <AppLayout>
    <div class="container mx-auto px-4 py-8">
      <!-- العنوان -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ $t('navigation.courses') }}
          </h1>
          <p class="text-gray-600 mt-2">
            {{ $t('app.description') }}
          </p>
        </div>

        <!-- زر الإنشاء -->
        <router-link
          v-if="canCreateCourse"
          to="/admin/courses/create"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ $t('course.create_course') }}
        </router-link>
      </div>

      <!-- الفلاتر -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <!-- بحث -->
          <div class="flex-1 min-w-64">
            <input
              v-model="filters.search"
              type="text"
              :placeholder="$t('common.search')"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- مستوى -->
          <select
            v-model="filters.level"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">جميع المستويات</option>
            <option value="beginner">مبتدئ</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">متقدم</option>
          </select>

          <!-- كورساتي للمعلم -->
          <button
            v-if="isTeacher"
            @click="filters.mine = !filters.mine"
            :class="[filters.mine
              ? 'bg-blue-100 border-blue-300 text-blue-700'
              : 'bg-white border-gray-300 text-gray-700',
              'px-4 py-2 border rounded-lg transition-colors'
            ]"
          >
            كورساتي فقط
          </button>

          <!-- المسجلة للطالب -->
          <button
            v-if="isStudent"
            @click="filters.enrolled = !filters.enrolled"
            :class="[filters.enrolled
              ? 'bg-green-100 border-green-300 text-green-700'
              : 'bg-white border-gray-300 text-gray-700',
              'px-4 py-2 border rounded-lg transition-colors'
            ]"
          >
            المسجلة فقط
          </button>

          <!-- مسح -->
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            مسح الكل
          </button>
        </div>
      </div>

      <!-- حالة التحميل -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">{{ $t('common.loading') }}</p>
      </div>

      <!-- لا توجد نتائج -->
      <div v-else-if="paginatedCourses.length === 0" class="text-center py-20">
        <div class="max-w-md mx-auto">
          <BookOpenIcon class="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">لا توجد كورسات</h3>
          <p class="text-gray-500 mb-6">لم يتم العثور على كورسات تطابق معايير البحث</p>
          <button
            @click="resetFilters"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            عرض جميع الكورسات
          </button>
        </div>
      </div>

      <!-- شبكة الكورسات -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          v-for="course in paginatedCourses"
          :key="course.id"
          :course="course"
          @edit="editCourse(course)"
          @manage="manageCourse(course)"
          @delete="deleteCourse(course)"
        />
      </div>

      <!-- ترقيم -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <Pagination
          :current-page="pagination.page"
          :last-page="totalPages"
          :total="filteredCourses.length"
          @page-changed="goToPage"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpenIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'
import { courseService } from '@/services/courseService'
import CourseCard from '@/components/courses/CourseCard.vue'
import Pagination from '@/components/ui/Pagination.vue'
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const allCourses = ref([])

// فلاتر
const filters = ref({
  search: '',
  level: '',
  mine: false,
  enrolled: false
})

// صلاحيات
const isStudent = computed(() => authStore.user?.role === 'student')
const isTeacher = computed(() => ['teacher', 'instructor'].includes(authStore.user?.role))
const isAdmin = computed(() => authStore.user?.role === 'admin')
const canCreateCourse = computed(() => isTeacher.value || isAdmin.value)

// فلترة الكورسات محلياً
const filteredCourses = computed(() => {
  let list = [...allCourses.value]

  console.log('Filtering courses with', filters.value)

  if (filters.value.search) {
    const term = filters.value.search.toLowerCase()
    console.log('term filter',term)
    list = list.filter(c =>
      c.title.toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term)
    )
    
  }

  if (filters.value.level) {
    list = list.filter(c => c.level === filters.value.level)
  }

  if (filters.value.mine && isTeacher.value) {
    list = list.filter(c => c.instructor.id === authStore.user?.id)
  }

  if (filters.value.enrolled && isStudent.value) {
    list = list.filter(c => c.is_enrolled)
  }

 
  return list
})

// ترقيم الصفحات محلي
const pagination = ref({ page: 1, perPage: 6 })

const totalPages = computed(() =>
  Math.ceil(filteredCourses.value.length / pagination.value.perPage)
)

const paginatedCourses = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.perPage
  console.log('Paginating courses:', filteredCourses.value.slice(start, start + pagination.value.perPage)[0])
  return filteredCourses.value.slice(start, start + pagination.value.perPage)
})

// تحميل الكورسات
const loadCourses = async () => {
  loading.value = true
  try {
    const res = await courseService.getAllCourses()
    allCourses.value = res.data.data || []
    console.log('Courses loaded:', allCourses.value)
  } catch (e) {
    console.error('Error loading courses:', e)
  } finally {
    loading.value = false
  }
}

// التحكم في التصفية / الترقيم
const resetFilters = () => {
  filters.value = { search: '', level: '', mine: false, enrolled: false }
}

const goToPage = (page) => {
  pagination.value.page = page
}

// عمليات الكورسات
const editCourse = (course) => router.push(`/courses/${course.id}/edit`)
const manageCourse = (course) => router.push(`/courses/${course.id}?manage=true`)
const deleteCourse = async (course) => {
  if (confirm(`هل أنت متأكد من حذف الكورس "${course.title}"؟`)) {
    await courseService.deleteCourse(course.id)
    loadCourses()
  }
}

// أول تحميل
onMounted(loadCourses)
</script>
