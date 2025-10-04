<template>
  <div>
    <button @click="showModal = true">فتح نموذج التسليم</button>
    
    <AssignmentSubmissionModal
      :is-open="showModal"
      :assignment="currentAssignment"
      @close="showModal = false"
      @submit="handleSubmission"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AssignmentSubmissionModal from '@/components/assignments/AssignmentSubmissionModal.vue'

const showModal = ref(false)
const currentAssignment = ref({
  id: 1,
  title: 'الواجب الأول',
  description: 'حل التمارين من الصفحة ١٠ إلى ٢٠',
  due_date: '2024-01-15',
  total_points: 100
})

const handleSubmission = (submissionData) => {
  console.log('تم تسليم الواجب:', submissionData)
  // هنا يمكنك إرسال البيانات للخادم
}
</script>