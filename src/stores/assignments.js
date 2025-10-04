import { defineStore } from 'pinia'
import { ref } from 'vue'
import { assignmentService } from '@/services/assignmentService'

export const useAssignmentsStore = defineStore('assignments', () => {
  const assignments = ref([])
  const currentAssignment = ref(null)
  const submissions = ref([])
  const upcomingAssignments = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCourseAssignments = async (courseId) => {
    loading.value = true
    error.value = null
    try {
      const response = await assignmentService.getAssignments(courseId)
      assignments.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch assignments'
    } finally {
      loading.value = false
    }
  }

  const fetchAssignment = async (assignmentId) => {
    loading.value = true
    error.value = null
    try {
      const response = await assignmentService.getAssignment(assignmentId)
      currentAssignment.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch assignment'
    } finally {
      loading.value = false
    }
  }

  const fetchUpcomingAssignments = async () => {
    loading.value = true
    try {
      // افترض أن لديك endpoint للواجبات القادمة
      const response = await assignmentService.getUpcomingAssignments()
      upcomingAssignments.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch upcoming assignments'
    } finally {
      loading.value = false
    }
  }

  const submitAssignment = async (assignmentId, formData) => {
    loading.value = true
    error.value = null
    try {
      const response = await assignmentService.submitAssignment(assignmentId, formData)
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to submit assignment'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchSubmissions = async (assignmentId) => {
    loading.value = true
    try {
      const response = await assignmentService.getSubmissions(assignmentId)
      submissions.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch submissions'
    } finally {
      loading.value = false
    }
  }

  const gradeSubmission = async (submissionId, data) => {
    try {
      const response = await assignmentService.gradeSubmission(submissionId, data)
      // تحديث حالة التسليم محلياً
      const index = submissions.value.findIndex(s => s.id === submissionId)
      if (index !== -1) {
        submissions.value[index] = response.data.data
      }
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to grade submission'
      throw err
    }
  }

  return {
    assignments,
    currentAssignment,
    submissions,
    upcomingAssignments,
    loading,
    error,
    fetchCourseAssignments,
    fetchAssignment,
    fetchUpcomingAssignments,
    submitAssignment,
    fetchSubmissions,
    gradeSubmission
  }
})