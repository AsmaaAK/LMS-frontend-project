<template>
  <div class="flex flex-wrap gap-3">
    <button type="button" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
      إجراء 1
    </button>
    <button type="button" class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
      إجراء 2
    </button>
    <button type="button" class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
      إجراء 3
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  userRole: {
    type: String,
    default: 'student'
  }
})
</script>












