<template>
  <!-- Modal Background -->
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background Overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeModal"></div>

      <!-- Modal Panel -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-right align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              تسليم الواجب
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400" v-if="assignment">
              {{ assignment.title }}
            </p>
          </div>
          <button
            type="button"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            @click="closeModal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="mt-4 space-y-4">
          <!-- Assignment Details -->
          <div v-if="assignment" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white">تفاصيل الواجب:</h4>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ assignment.description }}</p>
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <p>الموعد النهائي: {{ formatDate(assignment.due_date) }}</p>
              <p>الدرجة الكاملة: {{ assignment.total_points }} نقطة</p>
            </div>
          </div>

          <!-- File Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              رفع الملفات
            </label>
            <div 
              class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              @drop="handleFileDrop"
              @dragover.prevent
              @dragenter.prevent
            >
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600 dark:text-gray-400">
                  <label for="file-upload" class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>رفع ملف</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      class="sr-only" 
                      multiple 
                      @change="handleFileSelect"
                      accept=".pdf,.doc,.docx,.txt,.zip,.rar,.jpg,.jpeg,.png"
                    >
                  </label>
                  <p class="pr-1">أو اسحب وأفلت الملفات هنا</p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, DOCX, TXT, ZIP, JPG, PNG (الحد الأقصى 10MB)
                </p>
              </div>
            </div>
          </div>

          <!-- Selected Files -->
          <div v-if="selectedFiles.length > 0" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الملفات المحددة:</h4>
            <div class="space-y-2">
              <div 
                v-for="(file, index) in selectedFiles" 
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center space-x-3 space-x-reverse">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ file.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatFileSize(file.size) }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="removeFile(index)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label for="submission-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ملاحظات إضافية (اختياري)
            </label>
            <textarea
              id="submission-notes"
              v-model="submissionNotes"
              rows="3"
              class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              placeholder="أضف أي ملاحظات حول التسليم..."
            ></textarea>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
            {{ errorMessage }}
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 sm:mt-5 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            :disabled="selectedFiles.length === 0 || isSubmitting"
            :class="[
              'inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm',
              selectedFiles.length === 0 || isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            ]"
            @click="submitAssignment"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="w-4 h-4 ml-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              جاري التسليم...
            </span>
            <span v-else>تسليم الواجب</span>
          </button>
          <button
            type="button"
            :disabled="isSubmitting"
            class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto sm:text-sm"
            @click="closeModal"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  assignment: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

// Reactive data
const selectedFiles = ref([])
const submissionNotes = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

// Computed properties
const totalFileSize = computed(() => {
  return selectedFiles.value.reduce((total, file) => total + file.size, 0)
})

// Methods
const closeModal = () => {
  if (!isSubmitting.value) {
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  selectedFiles.value = []
  submissionNotes.value = ''
  isSubmitting.value = false
  errorMessage.value = ''
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
  event.target.value = '' // Reset input
}

const handleFileDrop = (event) => {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files)
  addFiles(files)
}

const addFiles = (files) => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const MAX_TOTAL_SIZE = 50 * 1024 * 1024 // 50MB

  for (const file of files) {
    // Check individual file size
    if (file.size > MAX_FILE_SIZE) {
      errorMessage.value = `الملف ${file.name} يتجاوز الحجم المسموح (10MB)`
      continue
    }

    // Check total size
    if (totalFileSize.value + file.size > MAX_TOTAL_SIZE) {
      errorMessage.value = 'إجمالي حجم الملفات يتجاوز الحد المسموح (50MB)'
      continue
    }

    // Check for duplicates
    if (!selectedFiles.value.some(f => f.name === file.name && f.size === file.size)) {
      selectedFiles.value.push(file)
    }
  }

  // Clear error if files were added successfully
  if (selectedFiles.value.length > 0) {
    errorMessage.value = ''
  }
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
  errorMessage.value = ''
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString) => {
  if (!dateString) return 'غير محدد'
  const date = new Date(dateString)
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const submitAssignment = async () => {
  if (selectedFiles.value.length === 0) {
    errorMessage.value = 'يرجى اختيار ملف واحد على الأقل'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Here you would typically upload files and submit the assignment
    const formData = new FormData()
    selectedFiles.value.forEach(file => {
      formData.append('files[]', file)
    })
    formData.append('notes', submissionNotes.value)
    formData.append('assignment_id', props.assignment?.id)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Emit submit event with submission data
    emit('submit', {
      files: selectedFiles.value,
      notes: submissionNotes.value,
      assignmentId: props.assignment?.id
    })

    resetForm()
  } catch (error) {
    errorMessage.value = 'حدث خطأ أثناء التسليم. يرجى المحاولة مرة أخرى.'
    console.error('Submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Handle escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Watch for modal open/close
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
  } else {
    document.body.style.overflow = 'auto'
    document.removeEventListener('keydown', handleEscape)
    resetForm()
  }
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* RTL specific styles */
[dir="rtl"] .space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

[dir="rtl"] .space-x-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

/* Smooth transitions */
.fixed {
  transition: opacity 0.3s ease-in-out;
}

.relative {
  transition: all 0.3s ease-in-out;
}

/* Animation for spinner */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>