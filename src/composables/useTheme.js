import { useThemeStore } from '@/stores/theme'

export function useTheme() {
  const store = useThemeStore()
  
  return {
    currentTheme: store.currentTheme,
    isDark: store.isDark,
    setTheme: store.setTheme,
    toggleTheme: store.toggleTheme,
    loadTheme: store.loadTheme
  }
}