import { useLocalizationStore } from '@/stores/localization'

export function useLocalization() {
  const store = useLocalizationStore()
  
  return {
    currentLocale: store.currentLocale,
    languages: store.languages,
    setLocale: store.setLocale,
    toggleLocale: store.toggleLocale,
    loadLocale: store.loadLocale
  }
}