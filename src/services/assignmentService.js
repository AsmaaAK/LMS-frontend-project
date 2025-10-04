import api from './api'

export const assignmentService = {
  // الحصول على جميع الواجبات
  async getAssignments(filters = {}) {
    try {
      const response = await api.get('/assignments', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching assignments:', error)
      throw error
    }
  },

  // الحصول على واجب محدد
  async getAssignment(id) {
    try {
      const response = await api.get(`/assignments/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching assignment:', error)
      throw error
    }
  },

  // إنشاء واجب جديد
  async createAssignment(assignmentData) {
    try {
      const response = await api.post('/assignments', assignmentData)
      return response.data
    } catch (error) {
      console.error('Error creating assignment:', error)
      throw error
    }
  },

  // تحديث واجب
  async updateAssignment(id, assignmentData) {
    try {
      const response = await api.put(`/assignments/${id}`, assignmentData)
      return response.data
    } catch (error) {
      console.error('Error updating assignment:', error)
      throw error
    }
  },

  // حذف واجب
  async deleteAssignment(id) {
    try {
      const response = await api.delete(`/assignments/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting assignment:', error)
      throw error
    }
  },

  // تسليم واجب
  async submitAssignment(assignmentId, submissionData) {
    try {
      const formData = new FormData()
      
      // إضافة الملفات
      if (submissionData.files) {
        submissionData.files.forEach(file => {
          formData.append('files[]', file)
        })
      }
      
      // إضافة البيانات الأخرى
      formData.append('notes', submissionData.notes || '')
      formData.append('assignment_id', assignmentId)

      const response = await api.post('/assignments/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error submitting assignment:', error)
      throw error
    }
  },

  // الحصول على تسليمات واجب (للمعلم)
  async getSubmissions(assignmentId) {
    try {
      const response = await api.get(`/assignments/${assignmentId}/submissions`)
      return response.data
    } catch (error) {
      console.error('Error fetching submissions:', error)
      throw error
    }
  },

  // تقييم واجب (للمعلم)
  async gradeSubmission(submissionId, gradeData) {
    try {
      const response = await api.post(`/submissions/${submissionId}/grade`, gradeData)
      return response.data
    } catch (error) {
      console.error('Error grading submission:', error)
      throw error
    }
  },

  // الحصول على واجبات الطالب
  async getStudentAssignments(studentId) {
    try {
      const response = await api.get(`/students/${studentId}/assignments`)
      return response.data
    } catch (error) {
      console.error('Error fetching student assignments:', error)
      throw error
    }
  },

  // الحصول على واجبات المعلم
  async getInstructorAssignments(instructorId) {
    try {
      const response = await api.get(`/instructors/${instructorId}/assignments`)
      return response.data
    } catch (error) {
      console.error('Error fetching instructor assignments:', error)
      throw error
    }
  }
}

export default assignmentService