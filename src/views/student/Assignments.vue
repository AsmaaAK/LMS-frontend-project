<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">الواجبات</h1>
      <div class="flex space-x-2 rtl:space-x-reverse">
        <BaseSelect v-model="filterStatus" :options="statusOptions" />
        <BaseInput v-model="searchQuery" placeholder="بحث في الواجبات..." />
      </div>
    </div>

    <!-- تصفية بالكورسات -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="course in enrolledCourses"
        :key="course.id"
        @click="toggleCourseFilter(course.id)"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition-colors',
          selectedCourses.includes(course.id)
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]"
      >
        {{ course.title }}
      </button>
    </div>

    <!-- قائمة الواجبات -->
    <div class="grid gap-4">
      <div v-if="filteredAssignments.loading" class="text-center py-8">
        <Spinner size="lg" />
      </div>

      <div v-else-if="filteredAssignments.data.length === 0" class="text-center py-8 text-gray-500">
        لا توجد واجبات
      </div>

      <AssignmentCard
        v-for="assignment in filteredAssignments.data"
        :key="assignment.id"
        :assignment="assignment"
        :submission="getSubmission(assignment.id)"
        @submit="openSubmissionModal(assignment)"
        @view="viewAssignment(assignment)"
      />
    </div>

    <!-- نموذج تسليم الواجب -->
    <AssignmentSubmissionModal
      v-if="selectedAssignment"
      :assignment="selectedAssignment"
      :show="showSubmissionModal"
      @close="closeSubmissionModal"
      @submitted="handleAssignmentSubmitted"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAssignmentsStore } from '@/stores/assignments'
import { useEnrollmentsStore } from '@/stores/enrollments'
import AssignmentCard from '@/components/assignments/AssignmentCard.vue'
import AssignmentSubmissionModal from '@/components/assignments/AssignmentSubmissionModal.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import Spinner from '@/components/ui/Spinner.vue'

const router = useRouter()
const assignmentsStore = useAssignmentsStore()
const enrollmentsStore = useEnrollmentsStore()

const searchQuery = ref('')
const filterStatus = ref('all')
const selectedCourses = ref([])
const selectedAssignment = ref(null)
const showSubmissionModal = ref(false)

const statusOptions = [
  { value: 'all', label: 'جميع الواجبات' },
  { value: 'pending', label: 'معلقة' },
  { value: 'submitted', label: 'مسلمة' },
  { value: 'graded', label: 'مصححة' },
  { value: 'overdue', label: 'منتهية' }
]

const enrolledCourses = computed(() => enrollmentsStore.enrollments.map(e => e.course))

const assignments = computed(() => {
  // دمج الواجبات من جميع الكورسات المسجلة
  return enrollmentsStore.enrollments.flatMap(enrollment => 
    enrollment.course.assignments?.map(assignment => ({
      ...assignment,
      course: enrollment.course,
      enrollmentProgress: enrollment.progress
    })) || []
  )
})

const filteredAssignments = computed(() => {
  let filtered = assignments.value

  // البحث
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.course.title.toLowerCase().includes(query)
    )
  }

  // تصفية بالحالة
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(a => {
      const submission = getSubmission(a.id)
      switch (filterStatus.value) {
        case 'pending': return !submission && !isOverdue(a)
        case 'submitted': return submission && !submission.score
        case 'graded': return submission?.score
        case 'overdue': return isOverdue(a)
        default: return true
      }
    })
  }

  // تصفية بالكورسات
  if (selectedCourses.value.length > 0) {
    filtered = filtered.filter(a => selectedCourses.value.includes(a.course.id))
  }

  return {
    loading: assignmentsStore.loading,
    data: filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  }
})

onMounted(async () => {
  await enrollmentsStore.fetchUserEnrollments()
  // جلب الواجبات لكل كورس
  for (const enrollment of enrollmentsStore.enrollments) {
    await assignmentsStore.fetchCourseAssignments(enrollment.course.id)
  }
})

const getSubmission = (assignmentId) => {
  // البحث عن تسليم الواجب (يجب تنفيذ هذا في الـ API)
  return null // مؤقتاً
}

const isOverdue = (assignment) => {
  if (!assignment.deadline) return false
  return new Date(assignment.deadline) < new Date()
}

const toggleCourseFilter = (courseId) => {
  const index = selectedCourses.value.indexOf(courseId)
  if (index > -1) {
    selectedCourses.value.splice(index, 1)
  } else {
    selectedCourses.value.push(courseId)
  }
}

const openSubmissionModal = (assignment) => {
  selectedAssignment.value = assignment
  showSubmissionModal.value = true
}

const closeSubmissionModal = () => {
  showSubmissionModal.value = false
  selectedAssignment.value = null
}

const handleAssignmentSubmitted = () => {
  closeSubmissionModal()
  // إعادة تحميل البيانات
  enrollmentsStore.fetchUserEnrollments()
}

const viewAssignment = (assignment) => {
  router.push(`/student/courses/${assignment.course.id}?assignment=${assignment.id}`)
}
</script>


