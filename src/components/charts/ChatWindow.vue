<template>
  <div class="chat-window flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <!-- رأس الدردشة -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div class="flex items-center">
        <img 
          :src="participant.avatar || '/images/avatar-placeholder.png'" 
          :alt="participant.name"
          class="w-10 h-10 rounded-full"
        >
        <div class="mr-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ participant.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            <span class="w-2 h-2 bg-green-500 rounded-full inline-block ml-1"></span>
            {{ isOnline ? 'متصل الآن' : 'غير متصل' }}
          </p>
        </div>
      </div>
      
      <div class="flex space-x-2 rtl:space-x-reverse">
        <button @click="toggleInfo" class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <InformationCircleIcon class="w-5 h-5" />
        </button>
        <button @click="$emit('close')" class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- منطقة الرسائل -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-if="loading" class="text-center py-4">
        <Spinner />
      </div>
      
      <div v-else-if="messages.length === 0" class="text-center py-8 text-gray-500">
        لا توجد رسائل بعد. ابدأ المحادثة الآن!
      </div>
      
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :is-own="message.sender_id === user.id"
      />
    </div>

    <!-- منطقة الكتابة -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <form @submit.prevent="sendMessage" class="flex space-x-2 rtl:space-x-reverse">
        <div class="flex-1">
          <BaseInput
            v-model="newMessage"
            placeholder="اكتب رسالتك هنا..."
            @keypress.enter="sendMessage"
          />
        </div>
        <BaseButton type="submit" :disabled="!newMessage.trim()">
          <PaperAirplaneIcon class="w-4 h-4" />
        </BaseButton>
      </form>
    </div>

    <!-- معلومات الدردشة -->
    <ChatInfoPanel 
      v-if="showInfo"
      :participant="participant"
      @close="showInfo = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInfoPanel from '@/components/chat/ChatInfoPanel.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import Spinner from '@/components/ui/Spinner.vue'
import { 
  InformationCircleIcon, 
  XMarkIcon, 
  PaperAirplaneIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  roomId: {
    type: Number,
    required: true
  },
  participant: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const authStore = useAuthStore()
const chatStore = useChatStore()

const messagesContainer = ref(null)
const newMessage = ref('')
const showInfo = ref(false)
const loading = ref(false)

const user = authStore.user
const messages = chatStore.getRoomMessages(props.roomId)
const isOnline = ref(false)

onMounted(async () => {
  await loadMessages()
  setupWebSocket()
  scrollToBottom()
})

onUnmounted(() => {
  // تنظيف الـ WebSocket
})

watch(messages, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

const loadMessages = async () => {
  loading.value = true
  try {
    await chatStore.fetchRoomMessages(props.roomId)
  } catch (error) {
    console.error('Error loading messages:', error)
  } finally {
    loading.value = false
  }
}

const setupWebSocket = () => {
  // الاشتراك في قناة الدردشة
  window.Echo.private(`chat.${props.roomId}`)
    .listen('MessageSent', (e) => {
      chatStore.addMessage(e.message)
    })
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  try {
    await chatStore.sendMessage(props.roomId, newMessage.value.trim())
    newMessage.value = ''
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const toggleInfo = () => {
  showInfo.value = !showInfo.value
}
</script>

<style scoped>
.chat-window {
  min-height: 500px;
  max-height: 600px;
}
</style>