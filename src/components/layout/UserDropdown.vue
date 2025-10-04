<template>
  <div class="relative">
    <button class="flex items-center space-x-3 text-sm rounded-full focus:outline-none">
      <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
        {{ userInitials }}
      </div>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const userInitials = computed(() => {
  const name = authStore.user?.name || 'م'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})
</script>