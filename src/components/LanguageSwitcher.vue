<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
    >
      <GlobeAltIcon class="w-4 h-4" />
      <span>{{ currentLanguage.name }}</span>
      <ChevronDownIcon class="w-4 h-4" />
    </button>

    <div
      v-if="showDropdown"
      class="absolute top-full mt-1 right-0 rtl:right-auto rtl:left-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
    >
      <button
        v-for="language in languages"
        :key="language.code"
        @click="setLanguage(language.code)"
        :class="[
          'w-full text-left px-4 py-2 text-sm transition-colors',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          currentLocale === language.code 
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300'
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-lg">{{ language.flag }}</span>
            <span>{{ language.name }}</span>
          </div>
          <span v-if="currentLocale === language.code" class="text-blue-600">
            <CheckIcon class="w-4 h-4" />
          </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocalization } from '@/composables/useLocalization'
import { GlobeAltIcon, ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

const { currentLocale, languages, setLocale } = useLocalization()
const showDropdown = ref(false)

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === currentLocale.value) || languages[0]
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const setLanguage = (languageCode) => {
  setLocale(languageCode)
  showDropdown.value = false
}

// إغلاق القائمة عند النقر خارجها
const clickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutside)
})
</script>