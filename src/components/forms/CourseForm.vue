<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- العنوان -->
      <BaseInput
        v-model="form.title"
        label="عنوان الكورس"
        :error="errors.title"
        required
      />

      <!-- التصنيف -->
      <BaseSelect
        v-model="form.category_id"
        label="التصنيف"
        :options="categories"
        option-value="id"
        option-label="name"
        :error="errors.category_id"
        required
      />
    </div>

    <!-- الوصف -->
    <BaseTextarea
      v-model="form.description"
      label="وصف الكورس"
      :error="errors.description"
      rows="4"
      required
    />

    <!-- المستوى -->
    <BaseSelect
      v-model="form.level"
      label="المستوى"
      :options="levels"
      :error="errors.level"
      required
    />

    <!-- السعر -->
    <BaseInput
      v-model="form.price"
      label="السعر"
      type="number"
      step="0.01"
      :error="errors.price"
    />

    <!-- صورة الكورس -->
    <FileUpload
      v-model="form.image"
      label="صورة الكورس"
      accept="image/*"
      :error="errors.image"
    />

    <!-- حالة النشر -->
    <BaseCheckbox
      v-model="form.is_published"
      label="نشر الكورس"
    />

    <!-- أزرار -->
    <div class="flex justify-end space-x-4 rtl:space-x-reverse">
      <BaseButton variant="secondary" @click="$emit('cancel')">
        إلغاء
      </BaseButton>
      <BaseButton 
        type="submit" 
        variant="primary" 
        :loading="loading"
        :disabled="loading"
      >
        {{ courseId ? 'تحديث' : 'إنشاء' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useCoursesStore } from '@/stores/courses'

const props = defineProps({
  courseId: Number,
  categories: Array
})

const emit = defineEmits(['success', 'cancel'])

const coursesStore = useCoursesStore()
const loading = ref(false)
const errors = ref({})

const levels = [
  { value: 'beginner', label: 'مبتدئ' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'متقدم' }
]

const form = reactive({
  title: '',
  description: '',
  category_id: null,
  level: 'beginner',
  price: 0,
  image: null,
  is_published: false
})

// إذا كان تعديل، جلب بيانات الكورس
onMounted(async () => {
  if (props.courseId) {
    await coursesStore.fetchCourse(props.courseId)
    Object.assign(form, coursesStore.currentCourse)
  }
})

const submitForm = async () => {
  loading.value = true
  errors.value = {}

  try {
    if (props.courseId) {
      await coursesStore.updateCourse(props.courseId, form)
    } else {
      await coursesStore.createCourse(form)
    }
    emit('success')
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    }
  } finally {
    loading.value = false
  }
}
</script>