import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

// اختبار الاتصال بعد تحميل التطبيق
app.mount('#app')

// اختبار الاتصال بشكل منفصل
import { testConnection } from '@/utils/testConnection'

setTimeout(async () => {
  const success = await testConnection()
  if (success) {
    console.log('🎉 التطبيق جاهز للعمل!')
  } else {
    console.log('💡 يعمل التطبيق في الوضع المستقل')
  }
}, 1000)