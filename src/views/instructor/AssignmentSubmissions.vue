<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">تسليمات الواجب</h1>
        <p class="text-gray-600 dark:text-gray-300">{{ assignment?.title }}</p>
      </div>
      <div class="flex space-x-2 rtl:space-x-reverse">
        <BaseSelect 
          v-model="filterStatus"
          :options="statusOptions"
          placeholder="جميع الحالات"
        />
        <BaseButton variant="secondary" @click="exportGrades">
          تصدير الدرجات
        </BaseButton>
      </div>
    </div>

    <!-- إحصائيات سريعة -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="إجمالي التسليمات"
        :value="stats.totalSubmissions"
        icon="📄"
        color="blue"
      />
      <StatCard
        title="تم التصحيح"
        :value="stats.gradedSubmissions"
        icon="✅"
        color="green"
      />
      <StatCard
        title="بانتظار التصحيح"
        :value="stats.pendingSubmissions"
        icon="⏳"
        color="orange"
      />
      <StatCard
        title="لم يسلموا"
        :value="stats.missingSubmissions"
        icon="❌"
        color="red"
      />
    </div>

    <!-- قائمة التسليمات -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">التسليمات</h2>
      </div>
      <div class="p-6">
        <div v-if="loading" class="text-center py-8">
          <Spinner size="lg" />
        </div>

        <div v-else-if="filteredSubmissions.length === 0" class="text-center py-8 text-gray-500">
          لا توجد تسليمات
        </div>

        <div v-else class="space-y-4">
          <SubmissionItem
            v-for="submission in filteredSubmissions"
            :key="submission.id"
            :submission="submission"
            :assignment="assignment"
            @grade="openGradingModal(submission)"
          />
        </div>
      </div>
    </div>

    <!-- نموذج التصحيح -->
    <GradingModal
      v-if="selectedSubmission"
      :submission="selectedSubmission"
      :assignment="assignment"
      :show="showGradingModal"
      @close="closeGradingModal"
      @graded="handleSubmissionGraded"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAssignmentsStore } from '@/stores/assignments'
import { useToast } from '@/composables/useToast'
import StatCard from '@/components/ui/StatCard.vue'
// import SubmissionItem from '@/components/instructor/SubmissionItem.vue'
// import GradingModal from '@/components/instructor/GradingModal.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import Spinner from '@/components/ui/Spinner.vue'

const route = useRoute()
const assignmentsStore = useAssignmentsStore()
const toast = useToast()

const assignmentId = parseInt(route.params.id)
const loading = ref(false)
const filterStatus = ref('')
const selectedSubmission = ref(null)
const showGradingModal = ref(false)

const statusOptions = [
  { value: '', label: 'جميع الحالات' },
  { value: 'graded', label: 'تم التصحيح' },
  { value: 'pending', label: 'بانتظار التصحيح' }
]

const assignment = computed(() => assignmentsStore.currentAssignment)
const submissions = computed(() => assignmentsStore.submissions)

const stats = computed(() => {
  const total = submissions.value.length
  const graded = submissions.value.filter(s => s.score !== null).length
  const pending = submissions.value.filter(s => s.score === null).length
  const missing = (assignment.value?.total_students || 0) - total

  return {
    totalSubmissions: total,
    gradedSubmissions: graded,
    pendingSubmissions: pending,
    missingSubmissions: missing > 0 ? missing : 0
  }
})

const filteredSubmissions = computed(() => {
  let filtered = submissions.value

  if (filterStatus.value === 'graded') {
    filtered = filtered.filter(s => s.score !== null)
  } else if (filterStatus.value === 'pending') {
    filtered = filtered.filter(s => s.score === null)
  }

  return filtered.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  loading.value = true
  try {
    await Promise.all([
      assignmentsStore.fetchAssignment(assignmentId),
      assignmentsStore.fetchSubmissions(assignmentId)
    ])
  } catch (error) {
    toast.error('حدث خطأ أثناء تحميل البيانات')
  } finally {
    loading.value = false
  }
}

const openGradingModal = (submission) => {
  selectedSubmission.value = submission
  showGradingModal.value = true
}

const closeGradingModal = () => {
  showGradingModal.value = false
  selectedSubmission.value = null
}

const handleSubmissionGraded = () => {
  closeGradingModal()
  assignmentsStore.fetchSubmissions(assignmentId)
}

const exportGrades = () => {
  // تصدير الدرجات إلى Excel أو CSV
  console.log('Export grades')
}
</script>