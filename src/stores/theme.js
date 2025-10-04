import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref(localStorage.getItem('theme') || 'light')
  
  const isDark = computed(() => currentTheme.value === 'dark')
  
  const setTheme = (theme) => {
    if (theme !== 'light' && theme !== 'dark') {
      console.warn('Theme must be either "light" or "dark"')
      return
    }
    
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    
    // تطبيق الثيم على HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  const toggleTheme = () => {
    setTheme(currentTheme.value === 'light' ? 'dark' : 'light')
  }
  
  const loadTheme = () => {
    setTheme(currentTheme.value)
  }
  
  return {
    currentTheme,
    isDark,
    setTheme,
    toggleTheme,
    loadTheme
  }
})