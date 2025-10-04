import { defineStore } from 'pinia'
import { ref } from 'vue'
import { gradeService } from '@/services/gradeService'

export const useGradesStore = defineStore('grades', () => {
  const grades = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUserGrades = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await gradeService.getUserGrades()
      grades.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch grades'
    } finally {
      loading.value = false
    }
  }

  const fetchCourseGrades = async (courseId) => {
    loading.value = true
    try {
      const response = await gradeService.getCourseGrades(courseId)
      grades.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch course grades'
    } finally {
      loading.value = false
    }
  }

  return {
    grades,
    loading,
    error,
    fetchUserGrades,
    fetchCourseGrades
  }
})