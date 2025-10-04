import axios from 'axios'
import { API_CONFIG } from '@/config/api'

// إعداد axios base URL
const API_BASE_URL = API_CONFIG.BASE_URL

// إنشاء instance من axios مع الإعدادات الأساسية
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // إرسال cookies مع الطلبات للـ CSRF
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// إضافة interceptor لإضافة token للمطالبات
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// إضافة interceptor للتعامل مع الأخطاء
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // إزالة token منتهي الصلاحية
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      // إعادة توجيه لصفحة تسجيل الدخول
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
