import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocalizationStore = defineStore('localization', () => {
  const { locale } = useI18n()
  
  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]
  
  const currentLocale = computed(() => locale.value)
  
  const setLocale = (newLocale) => {
    if (!languages.find(lang => lang.code === newLocale)) {
      console.warn(`Language ${newLocale} is not supported`)
      return
    }
    
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
    
    // تطبيق اتجاه النص
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
    
    // إضافة/إزالة class للـ RTL
    if (newLocale === 'ar') {
      document.documentElement.classList.add('rtl')
    } else {
      document.documentElement.classList.remove('rtl')
    }
  }
  
  const toggleLocale = () => {
    const newLocale = currentLocale.value === 'ar' ? 'en' : 'ar'
    setLocale(newLocale)
  }
  
  const loadLocale = () => {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && languages.find(lang => lang.code === savedLocale)) {
      setLocale(savedLocale)
    } else {
      setLocale('ar') // اللغة الافتراضية
    }
  }
  
  return {
    languages,
    currentLocale,
    setLocale,
    toggleLocale,
    loadLocale
  }
})


