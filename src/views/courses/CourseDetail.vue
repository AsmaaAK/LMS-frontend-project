<!-- src/views/courses/CourseDetails.vue -->
<template>
  <AppLayout>
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">جاري تحميل الكورس...</p>
    </div>

    <div v-else-if="course" class="min-h-screen bg-gray-50">
      <!-- رأس الكورس -->
      <div class="bg-white shadow-sm border-b">
        <div class="relative h-80  flex items-center justify-center">
          <img 
            v-if="course.image" 
            :src="course.image" 
            :alt="course.title" 
            class="w-full h-full object-cover absolute inset-0 z-0"
          />
          <h1 class="text-4xl text-white font-bold z-10">{{ course.title }}</h1>
        </div>
      </div>

      <!-- المحتوى الرئيسي -->
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <!-- العمود الرئيسي -->
          <div class="lg:col-span-3 space-y-6">

            <!-- شريط الإجراءات -->
            <div class="bg-white rounded-xl shadow-sm border p-6 flex flex-wrap gap-4 justify-between items-center">
              <!-- للطالب -->
              <div v-if="isStudent">
                <button
                  v-if="!course.is_enrolled"
                  @click="enrollInCourse"
                  class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  التسجيل في الكورس
                </button>
                <div v-else class="flex items-center gap-4">
                  <span class="text-green-600 font-semibold">✓ مسجل في الكورس</span>
                  <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    متابعة التعلم
                  </button>
                </div>
              </div>

              <!-- للمعلم/الأدمن -->
              <div v-if="canEditCourse" class="flex gap-3">
                <router-link
                  :to="`/courses/${course.id}/edit`"
                  class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  تعديل الكورس
                </router-link>
                <button
                  @click="deleteCourse"
                  class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  حذف الكورس
                </button>
              </div>
            </div>

            <!-- وصف الكورس -->
            <div class="bg-white rounded-xl shadow-sm border p-6">
              <h3 class="font-semibold mb-4">وصف الكورس</h3>
              <p class="text-gray-700">{{ course.description }}</p>
            </div>

            <!-- الدروس -->
            <div v-if="course.lessons?.length" class="bg-white rounded-xl shadow-sm border p-6">
              <h3 class="font-semibold mb-4">الدروس ({{ course.lessons_count }})</h3>
              <ul class="space-y-2">
                <li v-for="lesson in course.lessons" :key="lesson.id" class="border-b py-2">
                  {{ lesson.title }}
                </li>
              </ul>
            </div>

            <!-- الواجبات -->
            <div v-if="course.assignments?.length" class="bg-white rounded-xl shadow-sm border p-6">
              <h3 class="font-semibold mb-4">الواجبات ({{ course.assignments.length }})</h3>
              <ul class="space-y-2">
                <li v-for="assignment in course.assignments" :key="assignment.id" class="border-b py-2">
                  {{ assignment.title }}
                </li>
              </ul>
            </div>

          </div>

          <!-- الشريط الجانبي -->
          <div class="lg:col-span-1 space-y-6">
            
            <!-- معلومات عامة -->
            <div class="bg-white rounded-xl shadow-sm border p-6">
              <h3 class="font-semibold mb-4">معلومات الكورس</h3>
              <p><strong>المدرس:</strong> {{ course.instructor?.name || 'غير معروف' }}</p>
              <p><strong>الفئة:</strong> {{ course.category?.name || 'عام' }}</p>
              <p><strong>المستوى:</strong> {{ getLevelText(course.level) }}</p>
              <p><strong>السعر:</strong> {{ course.price || 'مجاني' }}</p>
              <p><strong>تم نشره:</strong> {{ course.is_published ? 'نعم' : 'لا' }}</p>
            </div>

            <!-- تقدم الطالب -->
            <div v-if="isStudent && course.is_enrolled" class="bg-white rounded-xl shadow-sm border p-6">
              <h3 class="font-semibold mb-4">تقدمك في الكورس</h3>
              <p>{{ course.progress || 0 }}%</p>
              <div class="w-full bg-gray-200 h-3 rounded-full mt-2">
                <div class="bg-green-600 h-3 rounded-full" :style="{ width: course.progress + '%' }"></div>
              </div>
            </div>

            <!-- إحصائيات المدرس -->
            <div v-if="canEditCourse" class="bg-white rounded-xl shadow-sm border p-6">
              <h3 class="font-semibold mb-4">إحصائيات الكورس</h3>
              <p>عدد الدروس: {{ course.lessons_count || 0 }}</p>
              <p>عدد الطلاب المسجلين: {{ course.enrollments_count || 0 }}</p>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-600">
      الكورس غير موجود
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { courseService } from '@/services/courseService'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const course = ref(null)
const loading = ref(true)

// الحسابات
const isStudent = computed(() => authStore.user?.role === 'student')
const isTeacher = computed(() => ['teacher', 'instructor'].includes(authStore.user?.role))
const canEditCourse = computed(() => {
  return authStore.user?.role === 'admin' || 
         (isTeacher.value && course.value?.user_id === authStore.user?.id)
})

const getLevelText = (level) => {
  const levels = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  }
  return levels[level] || level
}

// التوابع
const loadCourse = async () => {
  loading.value = true
  try {
    const response = await courseService.getCourse(route.params.id)
    if (response.success) {
      course.value = response.data
    } else {
      router.push('/courses')
    }
  } catch (error) {
    console.error('Failed to load course:', error)
    router.push('/courses')
  } finally {
    loading.value = false
  }
}

const enrollInCourse = async () => {
  try {
    const response = await courseService.enrollInCourse(route.params.id)
    console.log('Enroll response:', response)
    if (response.success) {await loadCourse()
      
      alert(response.message || 'تم التسجيل في الكورس بنجاح')
    }
    if(!response.success)
    {
      alert(response.error )
    }
    else {
      alert(response.message || 'فشل التسجيل في الكورس')
    }

  } catch (error) {

    console.error('Enroll failed:', error)
  }
}

const deleteCourse = () => {
  if (confirm('هل أنت متأكد من حذف هذا الكورس؟')) {
    courseService.deleteCourse(route.params.id)
      .then(response => {
        if (response.success) {
          alert(response.message || 'تم حذف الكورس بنجاح')
          router.push('/courses')
        } else {
          alert(response.error || 'فشل حذف الكورس')
        }
      })
      .catch(error => {
        console.error('Delete failed:', error)
        alert('حدث خطأ أثناء حذف الكورس')
      })
  }
}

onMounted(loadCourse)
</script>
