import api from './api'

export const analyticsService = {
  getDashboardStats(timeRange = 'month') {
    return api.get('/analytics/dashboard', { params: { range: timeRange } })
  },

  getUserGrowth() {
    return api.get('/analytics/user-growth')
  },

  getRevenueStats() {
    return api.get('/analytics/revenue')
  },

  getCoursePerformance() {
    return api.get('/analytics/course-performance')
  },

  getStudentProgress() {
    return api.get('/analytics/student-progress')
  },

  exportReport(timeRange) {
    return api.get('/analytics/export', { 
      params: { range: timeRange },
      responseType: 'blob'
    })
  }
}