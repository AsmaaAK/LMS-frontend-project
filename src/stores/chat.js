import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatService, setupChatWebSocket } from '@/services/chatService'

export const useChatStore = defineStore('chat', () => {
  const chatRooms = ref([])
  const currentRoom = ref(null)
  const messages = ref({}) // { roomId: [messages] }
  const onlineUsers = ref([])
  const loading = ref(false)

  const fetchChatRooms = async () => {
    loading.value = true
    try {
      const response = await chatService.getChatRooms()
      chatRooms.value = response.data.data
    } catch (error) {
      console.error('Error fetching chat rooms:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchRoomMessages = async (roomId) => {
    try {
      const response = await chatService.getRoomMessages(roomId)
      if (!messages.value[roomId]) {
        messages.value[roomId] = []
      }
      messages.value[roomId] = response.data.data
    } catch (error) {
      console.error('Error fetching room messages:', error)
      throw error
    }
  }

  const sendMessage = async (roomId, message) => {
    try {
      const response = await chatService.sendMessage(roomId, message)
      if (!messages.value[roomId]) {
        messages.value[roomId] = []
      }
      messages.value[roomId].push(response.data.data)
      return response.data.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  const getRoomMessages = (roomId) => {
    return messages.value[roomId] || []
  }

  const addMessage = (message) => {
    const roomId = message.chat_room_id
    if (!messages.value[roomId]) {
      messages.value[roomId] = []
    }
    
    // تجنب التكرار
    if (!messages.value[roomId].some(m => m.id === message.id)) {
      messages.value[roomId].push(message)
    }
  }

  const markAsRead = async (roomId) => {
    try {
      await chatService.markAsRead(roomId)
      // تحديث حالة الرسائل كمقروءة
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
  }

  const initializeWebSocket = (authStore) => {
    setupChatWebSocket(authStore)
  }

  return {
    chatRooms,
    currentRoom,
    messages,
    onlineUsers,
    loading,
    fetchChatRooms,
    fetchRoomMessages,
    sendMessage,
    getRoomMessages,
    addMessage,
    markAsRead,
    initializeWebSocket
  }
})