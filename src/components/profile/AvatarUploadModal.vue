<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <CameraIcon class="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    تغيير صورة الملف الشخصي
                  </DialogTitle>
                  
                  <div class="mt-4">
                    <!-- معاينة الصورة -->
                    <div v-if="previewUrl" class="mb-4">
                      <img :src="previewUrl" alt="معاينة الصورة" class="mx-auto h-32 w-32 rounded-full object-cover">
                    </div>
                    
                    <!-- تحميل الصورة -->
                    <div class="flex justify-center">
                      <label class="cursor-pointer">
                        <input
                          type="file"
                          class="hidden"
                          accept="image/*"
                          @change="handleFileSelect"
                        />
                        <span class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          اختر صورة
                        </span>
                      </label>
                    </div>

                    <!-- رسائل الخطأ -->
                    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
                    
                    <!-- معلومات الملف -->
                    <div v-if="selectedFile" class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p class="text-sm text-gray-600 dark:text-gray-300">
                        الملف: {{ selectedFile.name }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        الحجم: {{ formatFileSize(selectedFile.size) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <BaseButton
                  variant="primary"
                  class="w-full"
                  :loading="loading"
                  :disabled="!selectedFile || loading"
                  @click="uploadAvatar"
                >
                  حفظ
                </BaseButton>
                <BaseButton
                  variant="secondary"
                  class="mt-3 sm:mt-0 w-full"
                  @click="$emit('close')"
                  :disabled="loading"
                >
                  إلغاء
                </BaseButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CameraIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close', 'uploaded'])

const authStore = useAuthStore()
const toast = useToast()

const selectedFile = ref(null)
const previewUrl = ref('')
const loading = ref(false)
const error = ref('')

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // التحقق من نوع الملف
  if (!file.type.startsWith('image/')) {
    error.value = 'يرجى اختيار ملف صورة فقط'
    return
  }

  // التحقق من حجم الملف (5MB كحد أقصى)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'حجم الملف يجب أن يكون أقل من 5MB'
    return
  }

  error.value = ''
  selectedFile.value = file

  // إنشاء معاينة للصورة
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const uploadAvatar = async () => {
  if (!selectedFile.value) return

  loading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('avatar', selectedFile.value)

    const response = await authStore.uploadAvatar(formData)
    emit('uploaded', response.data.avatar_url)
    toast.success('تم تحديث صورة الملف الشخصي بنجاح')
    emit('close')
  } catch (err) {
    error.value = err.response?.data?.message || 'حدث خطأ أثناء رفع الصورة'
  } finally {
    loading.value = false
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>