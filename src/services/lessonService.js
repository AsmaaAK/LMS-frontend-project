import api from './api'

export const lessonService = {
  getLessons(courseId) {
    return api.get(`/courses/${courseId}/lessons`)
  },

  getLesson(lessonId) {
    return api.get(`/lessons/${lessonId}`)
  },

  createLesson(courseId, data) {
    return api.post(`/courses/${courseId}/lessons`, data)
  },

  updateLesson(lessonId, data) {
    return api.put(`/lessons/${lessonId}`, data)
  },

  deleteLesson(lessonId) {
    return api.delete(`/lessons/${lessonId}`)
  },

  markAsCompleted(lessonId) {
    return api.post(`/lessons/${lessonId}/complete`)
  }
}