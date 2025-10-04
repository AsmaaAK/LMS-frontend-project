<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useLocalizationStore } from '@/stores/localization'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const localizationStore = useLocalizationStore()

onMounted(async () => {
 
  localizationStore.loadLocale()
  
 
  themeStore.loadTheme()
  
  // ثم التحقق من المصادقة
   await authStore.checkAuth()
  
   console.log('✅ التطبيق جاهز:', {
     isAuthenticated: authStore.isAuthenticated,
     user: authStore.user,
     role: authStore.currentRole,
     locale: localizationStore.currentLocale,
     theme: themeStore.currentTheme
   })
})
</script>