<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="flex flex-1 w-0">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'pr-1 border-t-2 border-transparent pt-4 flex items-center text-sm font-medium',
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        <ArrowLongRightIcon class="ml-3 h-5 w-5" />
        السابق
      </button>
    </div>
    
    <div class="hidden md:flex">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'border-t-2 px-4 pt-4 text-sm font-medium',
          page === currentPage
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        {{ page }}
      </button>
      
      <span
        v-if="showEllipsis"
        class="border-transparent text-gray-500 px-4 pt-4 text-sm font-medium"
      >
        ...
      </span>
    </div>
    
    <div class="flex justify-end flex-1 w-0">
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === lastPage"
        :class="[
          'pl-1 border-t-2 border-transparent pt-4 flex items-center text-sm font-medium',
          currentPage === lastPage
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        التالي
        <ArrowLongLeftIcon class="mr-3 h-5 w-5" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['page-changed'])

const visiblePages = computed(() => {
  const pages = []
  const delta = 2
  const left = props.currentPage - delta
  const right = props.currentPage + delta
  
  for (let i = 1; i <= props.lastPage; i++) {
    if (i === 1 || i === props.lastPage || (i >= left && i <= right)) {
      pages.push(i)
    }
  }
  
  return pages
})

const showEllipsis = computed(() => {
  return props.lastPage > 7 && visiblePages.value.length < props.lastPage
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('page-changed', page)
  }
}
</script>