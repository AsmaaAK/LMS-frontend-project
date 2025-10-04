<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- الخلفية المعتمة -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="close"></div>

      <!-- المركز الرأسي -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <!-- نموذج الكورس -->
      <div class="relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-right align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:p-6">
        <!-- رأس النموذج -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ isEdit ? 'تعديل الكورس' : 'إضافة كورس جديد' }}
          </h3>
          <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- محتوى النموذج -->
        <form @submit.prevent="saveCourse" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- عنوان الكورس -->
            <div class="md:col-span-2">
              <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عنوان الكورس
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="أدخل عنوان الكورس"
              >
            </div>

            <!-- الوصف -->
            <div class="md:col-span-2">
              <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                وصف الكورس
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="أدخل وصف الكورس"
              ></textarea>
            </div>

            <!-- المعلم -->
            <div>
              <label for="instructor" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                المعلم
              </label>
              <select
                id="instructor"
                v-model="form.instructor"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">اختر المعلم</option>
                <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.name">
                  {{ instructor.name }}
                </option>
              </select>
            </div>

            <!-- المستوى -->
            <div>
              <label for="level" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                المستوى
              </label>
              <select
                id="level"
                v-model="form.level"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">اختر المستوى</option>
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>

            <!-- المدة -->
            <div>
              <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                المدة (ساعات)
              </label>
              <input
                id="duration"
                v-model="form.duration"
                type="number"
                min="1"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="أدخل المدة"
              >
            </div>

            <!-- السعر -->
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                السعر ($)
              </label>
              <input
                id="price"
                v-model="form.price"
                type="number"
                min="0"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="أدخل السعر"
              >
            </div>

            <!-- الحالة -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحالة
              </label>
              <select
                id="status"
                v-model="form.status"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">اختر الحالة</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="draft">مسودة</option>
              </select>
            </div>

            <!-- التصنيف -->
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                التصنيف
              </label>
              <select
                id="category"
                v-model="form.category"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">اختر التصنيف</option>
                <option value="programming">برمجة</option>
                <option value="design">تصميم</option>
                <option value="marketing">تسويق</option>
                <option value="business">أعمال</option>
                <option value="language">لغات</option>
              </select>
            </div>

            <!-- صورة الكورس -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                صورة الكورس
              </label>
              <div class="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600">
                <div class="space-y-1 text-center">
                  <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600 dark:text-gray-400">
                    <label for="image" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>رفع صورة</span>
                      <input id="image" type="file" class="sr-only" @change="handleImageUpload">
                    </label>
                    <p class="pr-1">أو اسحب وأفلت</p>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF حتى 10MB
                  </p>
                </div>
              </div>
            </div>

            <!-- المحتوى -->
            <div class="md:col-span-2">
              <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                محتوى الكورس
              </label>
              <textarea
                id="content"
                v-model="form.content"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="أدخل محتوى الكورس التفصيلي..."
              ></textarea>
            </div>
          </div>

          <!-- أزرار الإجراءات -->
          <div class="flex items-center justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">جاري الحفظ...</span>
              <span v-else>{{ isEdit ? 'تحديث' : 'إضافة' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  course: Object
})

const emit = defineEmits(['close', 'saved'])

const loading = ref(false)

// بيانات تجريبية للمعلمين
const instructors = ref([
  { id: 1, name: 'أحمد محمد' },
  { id: 2, name: 'فاطمة علي' },
  { id: 3, name: 'محمد الخالد' },
  { id: 4, name: 'سارة عبدالله' }
])

const form = ref({
  title: '',
  description: '',
  instructor: '',
  level: '',
  duration: 1,
  price: 0,
  status: 'draft',
  category: '',
  content: '',
  image: null
})

const isEdit = computed(() => !!props.course?.id)

// مراقبة تغيير الكورس المحدد
watch(() => props.course, (newCourse) => {
  if (newCourse) {
    form.value = {
      title: newCourse.title || '',
      description: newCourse.description || '',
      instructor: newCourse.instructor || '',
      level: newCourse.level || '',
      duration: newCourse.duration || 1,
      price: newCourse.price || 0,
      status: newCourse.status || 'draft',
      category: newCourse.category || '',
      content: newCourse.content || '',
      image: newCourse.image || null
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    instructor: '',
    level: '',
    duration: 1,
    price: 0,
    status: 'draft',
    category: '',
    content: '',
    image: null
  }
}

const close = () => {
  resetForm()
  emit('close')
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // هنا يمكنك معالجة رفع الصورة
    form.value.image = file
  }
}

const saveCourse = async () => {
  if (loading.value) return

  // التحقق من صحة البيانات
  if (!form.value.title || !form.value.description || !form.value.instructor || 
      !form.value.level || !form.value.duration || !form.value.status || !form.value.category) {
    alert('يرجى ملء جميع الحقول المطلوبة')
    return
  }

  loading.value = true

  try {
    // محاكاة حفظ البيانات
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const courseData = {
      ...form.value,
      id: props.course?.id
    }

    emit('saved', courseData)
    close()
  } catch (error) {
    console.error('Error saving course:', error)
    alert('حدث خطأ أثناء حفظ البيانات')
  } finally {
    loading.value = false
  }
}
</script>