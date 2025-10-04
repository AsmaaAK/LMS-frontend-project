import { defineStore } from 'pinia'
import { ref } from 'vue'
import { enrollmentService } from '@/services/enrollmentService'

export const useEnrollmentsStore = defineStore('enrollments', () => {
  const enrollments = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUserEnrollments = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await enrollmentService.getUserEnrollments()
      enrollments.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch enrollments'
    } finally {
      loading.value = false
    }
  }

  const enrollInCourse = async (courseId) => {
    loading.value = true
    error.value = null
    try {
      const response = await enrollmentService.enroll(courseId)
      enrollments.value.push(response.data.data)
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to enroll in course'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProgress = async (enrollmentId, progress) => {
    try {
      const response = await enrollmentService.updateProgress(enrollmentId, progress)
      const index = enrollments.value.findIndex(e => e.id === enrollmentId)
      if (index !== -1) {
        enrollments.value[index] = response.data.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update progress'
      throw err
    }
  }

  return {
    enrollments,
    loading,
    error,
    fetchUserEnrollments,
    enrollInCourse,
    updateProgress
  }
})