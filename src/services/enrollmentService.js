import api from './api'

export const enrollmentService = {
  getUserEnrollments() {
    return api.get('/user/enrollments')
  },

  enroll(courseId) {
    return api.post(`/courses/${courseId}/enroll`)
  },

  updateProgress(enrollmentId, progress) {
    return api.put(`/enrollments/${enrollmentId}`, { progress })
  },

  completeCourse(enrollmentId) {
    return api.post(`/enrollments/${enrollmentId}/complete`)
  }
}