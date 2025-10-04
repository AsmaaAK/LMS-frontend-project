import api from './api'

export const notificationService = {
  getNotifications(params = {}) {
    return api.get('/notifications', { params })
  },

  getUnreadCount() {
    return api.get('/notifications/unread-count')
  },

  markAsRead(notificationId) {
    return api.post(`/notifications/${notificationId}/read`)
  },

  markAllAsRead() {
    return api.post('/notifications/mark-all-read')
  },

  deleteNotification(notificationId) {
    return api.delete(`/notifications/${notificationId}`)
  },

  clearAll() {
    return api.delete('/notifications/clear')
  }
}