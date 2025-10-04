import api from './api'

export const gradeService = {
  getUserGrades() {
    return api.get('/user/grades')
  },

  getCourseGrades(courseId) {
    return api.get(`/courses/${courseId}/grades`)
  },

  getAssignmentGrades(assignmentId) {
    return api.get(`/assignments/${assignmentId}/grades`)
  },

  submitGrade(submissionId, data) {
    return api.put(`/submissions/${submissionId}/grade`, data)
  }
}