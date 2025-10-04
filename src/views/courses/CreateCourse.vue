<!-- src/views/courses/CreateCourse.vue -->
<template>
  <AppLayout>
    <div class="container mx-auto px-4 py-8 max-w-4xl">

      <!-- التحقق من الصلاحية -->
      <div v-if="!canAccess" class="text-center py-12">
        <p class="text-red-600 text-lg">غير مصرح لك بالوصول إلى هذه الصفحة</p>
        <router-link to="/courses" class="text-blue-600 hover:underline">
          العودة إلى الكورسات
        </router-link>
      </div>

      <div v-else>
        <h1 class="text-3xl font-bold mb-6">إنشاء كورس جديد</h1>

        <form @submit.prevent="submitCourse" class="bg-white p-6 rounded-xl shadow-sm space-y-6">

          <!-- العنوان -->
          <div>
            <label class="block mb-2 font-semibold">عنوان الكورس</label>
            <input
              v-model="course.title"
              type="text"
              placeholder="أدخل عنوان الكورس"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- الوصف -->
          <div>
            <label class="block mb-2 font-semibold">الوصف</label>
            <textarea
              v-model="course.description"
              rows="4"
              placeholder="أدخل وصف الكورس"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <!-- المستوى -->
          <div>
            <label class="block mb-2 font-semibold">المستوى</label>
            <select
              v-model="course.level"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر المستوى</option>
              <option value="beginner">مبتدئ</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">متقدم</option>
            </select>
          </div>

          <!-- السعر -->
          <div>
            <label class="block mb-2 font-semibold">السعر (اختياري)</label>
            <input
              v-model.number="course.price"
              type="number"
              min="0"
              placeholder="0 للعرض المجاني"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- الفئة -->
          <div>
            <label class="block mb-2 font-semibold">الفئة</label>
            <select
              v-model="course.category_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>اختر الفئة</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }} 
              </option>
            </select>
          </div>

          <!-- صورة الكورس -->
          <div>
            <label class="block mb-2 font-semibold">صورة الكورس</label>
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="w-full text-gray-700"
            />
            <img
              v-if="previewImage"
              :src="previewImage"
              alt="معاينة الصورة"
              class="mt-4 w-48 h-48 object-cover rounded-lg border"
            />
          </div>

          <!-- حالة النشر -->
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              v-model="course.is_published"
              id="isPublished"
              class="h-4 w-4"
            />
            <label for="isPublished" class="font-semibold">نشر الكورس مباشرة</label>
          </div>

          <!-- أزرار الإرسال -->
          <div class="flex justify-end gap-4 mt-6">
            <router-link
              to="/courses"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </router-link>
            <button
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              :disabled="loading"
            >
              {{ loading ? 'جاري الحفظ...' : 'إنشاء الكورس' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { courseService } from '@/services/courseService'

const router = useRouter()
const authStore = useAuthStore()

const canAccess = computed(() => {
  const userRole = authStore.user?.role
  return ['teacher', 'instructor', 'admin'].includes(userRole)
})

const course = ref({
  title: '',
  description: '',
  level: '',
  price: 0,
  category_id: '1', // افتراضي إلى فئة عامة (يمكنك تعديلها)
  image: null,
  is_published: false
})

const categories = ref([]) // يمكنك جلبها من API إذا أردت
const previewImage = ref(null)
const loading = ref(false)

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  course.value.image = file
  if (file) {
    previewImage.value = URL.createObjectURL(file)
  }
}

const submitCourse = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    
    // إرسال الحقول النصية والرقمية
    formData.append('title', course.value.title || '')
    formData.append('description', course.value.description || '')
    formData.append('level', course.value.level || '')
    formData.append('price', course.value.price ?? 0)
    formData.append('category_id', course.value.category_id || '')
    formData.append('is_published', course.value.is_published ? 1 : 0)
    console.log('Submitting course with data:', {
      title: course.value.title,
      description: course.value.description,
      level: course.value.level,
      price: course.value.price,
      category_id: course.value.category_id,
      is_published: course.value.is_published,
      image: course.value.image ? course.value.image.name : null
    })
    // إرسال الصورة إذا تم اختيارها
    if (course.value.image) {
      formData.append('image', course.value.image)
    }

    const res = await courseService.createCourse(formData)
    console.log('Create course response:', res)
    if (res.data.success) {
      router.push(`/courses/${res.data.id}`)
    } else if (!res.data.success) {
      // عرض الأخطاء في console أو alert
      console.log('Validation errors:', res.errors)
      alert('هناك أخطاء في النموذج. تحقق من جميع الحقول.')
    } else {
      alert(res.data.message || 'فشل في إنشاء الكورس')
    }
  } catch (e) {
    console.error('Error creating course:', e)
    alert('حدث خطأ أثناء إنشاء الكورس')
  } finally {
    loading.value = false
  }
}


// إذا أردت تحميل الفئات من API
onMounted(async () => {
  // مثال: categories.value = await categoryService.getAll()
})
</script>
