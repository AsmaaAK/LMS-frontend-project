import { createI18n } from 'vue-i18n'
import ar from '../locales/ar.json'
import en from '../locales/en.json'

const messages = {
  ar,
  en
}
silentTranslationWarn: true
// تحديد اللغة الافتراضية من localStorage أو المتصفح
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && messages[savedLocale]) {
    return savedLocale
  }
  
  // تحديد اللغة من المتصفح
  const browserLang = navigator.language.split('-')[0]
  return messages[browserLang] ? browserLang : 'ar'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'ar',
  messages,
  globalInjection: true
})

export default i18n


