import api from './api'

export const chatService = {
  // غرف الدردشة
  getChatRooms() {
    return api.get('/chat/rooms')
  },

  createChatRoom(participantId) {
    return api.post('/chat/rooms', { participant_id: participantId })
  },

  getRoomMessages(roomId, params = {}) {
    return api.get(`/chat/rooms/${roomId}/messages`, { params })
  },

  sendMessage(roomId, message) {
    return api.post(`/chat/rooms/${roomId}/messages`, { message })
  },

  markAsRead(roomId) {
    return api.post(`/chat/rooms/${roomId}/read`)
  },

  // الدردشة الجماعية (لكورس معين)
  getCourseChat(courseId) {
    return api.get(`/chat/courses/${courseId}`)
  },

  sendCourseMessage(courseId, message) {
    return api.post(`/chat/courses/${courseId}/messages`, { message })
  }
}

// إعدادات الـ WebSocket للدردشة الحية
export const setupChatWebSocket = (store) => {
  const Echo = window.Echo
  
  // الاشتراك في قناة المستخدم
  Echo.private(`user.${store.user.id}`)
    .listen('MessageSent', (e) => {
      store.addMessage(e.message)
    })
    .listen('ChatRoomCreated', (e) => {
      store.addChatRoom(e.room)
    })

  // الاشتراك في دردشات الكورس
  if (store.userRole === 'student' || store.userRole === 'teacher') {
    store.enrollments.forEach(enrollment => {
      Echo.private(`course.${enrollment.course_id}`)
        .listen('CourseMessageSent', (e) => {
          store.addCourseMessage(e.message)
        })
    })
  }
}
