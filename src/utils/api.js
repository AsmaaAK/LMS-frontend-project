import axios from 'axios'

const api = axios.create({
  baseURL:'http://localhost:8000/api',// استخدم localhost لمطابقة الدومين مع الكوكيز
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
})

// طلب interceptor لإضافة التوكن
api.interceptors.request.use(
  (config) => {
    // الحصول على التوكن من localStorage
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // إضافة header للطلبات البسيطة (لـ CORS)
    if (config.method === 'get') {
      config.headers['Access-Control-Allow-Origin'] = '*'
    }
    
    // تمرير XSRF-TOKEN يدوياً عند توفره (حل مشاكل 419)
    try {
      const cookies = document.cookie.split(';').map(c => c.trim())
      const xsrfCookie = cookies.find(c => c.startsWith('XSRF-TOKEN='))
      if (xsrfCookie) {
        const value = decodeURIComponent(xsrfCookie.split('=')[1])
        config.headers['X-XSRF-TOKEN'] = value
      }
    } catch (_) {}
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// رد interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data)
    
    if (error.response?.status === 401) {
      // غير مصرح - مسح التوكن
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    
    if (error.response?.status === 404) {
      console.error('Endpoint غير موجود:', error.config.url)
    }
    
    if (error.code === 'NETWORK_ERROR') {
      console.error('مشكلة في الاتصال بالخادم')
    }
    
    return Promise.reject(error)
  }
)

export default api