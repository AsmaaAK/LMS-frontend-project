import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

// إنشاء instance للطلبات العادية
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// إنشاء instance لطلبات CSRF
const csrfClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// دالة مساعدة لجلب CSRF token
const getCsrfToken = () => {
  const metaTag = document.querySelector('meta[name="csrf-token"]')
  if (metaTag) return metaTag.getAttribute('content')
  
  // محاولة الحصول من cookies
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'XSRF-TOKEN') return decodeURIComponent(value)
  }
  return null
}

// interceptor لطلبات API
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    const csrfToken = getCsrfToken()
    if (csrfToken && !config.url.includes('/sanctum/csrf-cookie')) {
      config.headers['X-CSRF-TOKEN'] = csrfToken
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

// interceptor للردود
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const AuthService = {
  // الحصول على CSRF cookie
  getCsrfCookie: async () => {
    try {
      const response = await csrfClient.get('/sanctum/csrf-cookie')
      return response
    } catch (error) {
      console.warn('CSRF cookie request failed:', error.message)
      throw error
    }
  },

  // الحصول على CSRF token
  getCsrfToken: async () => {
    try {
      const response = await apiClient.get('/csrf-token')
      return response
    } catch (error) {
      console.warn('CSRF token request failed:', error.message)
      throw error
    }
  },

  // تسجيل الدخول
  login: async (credentials) => {
    try {
      // محاولة الحصول على CSRF cookie أولاً
      try {
        await AuthService.getCsrfCookie()
        console.log('CSRF cookie set successfully')
      } catch (csrfError) {
        console.warn('Proceeding without CSRF cookie:', csrfError.message)
      }

      // محاولة الحصول على CSRF token
      try {
        const tokenResponse = await AuthService.getCsrfToken()
        if (tokenResponse.data?.csrf_token) {
          const metaTag = document.querySelector('meta[name="csrf-token"]')
          if (metaTag) {
            metaTag.setAttribute('content', tokenResponse.data.csrf_token)
            console.log('CSRF token updated in meta tag')
          }
        }
      } catch (tokenError) {
        console.warn('Proceeding without CSRF token:', tokenError.message)
      }

      // طلب تسجيل الدخول
      const response = await apiClient.post('/login', credentials)
      
      return {
        status: response.status,
        data: {
          access_token: response.data.access_token,
          user: response.data.user
        }
      }
    } catch (error) {
      // استخدام mock data إذا كان الخادم غير متاح
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404 || import.meta.env.VITE_MOCK_AUTH === 'true') {
        console.log('Using mock authentication...')
        return {
          status: 200,
          data: {
            access_token: 'mock_token_' + Date.now(),
            user: {
              id: 1,
              name: credentials.email.split('@')[0],
              email: credentials.email,
              role: 'student'
            }
          }
        }
      }
      throw error
    }
  },

  // التسجيل
  register: async (userData) => {
    try {
      try {
        await AuthService.getCsrfCookie()
        console.log('CSRF cookie set successfully')
      } catch (csrfError) {
        console.warn('Proceeding without CSRF cookie:', csrfError.message)
      }

      // محاولة الحصول على CSRF token
      try {
        const tokenResponse = await AuthService.getCsrfToken()
        if (tokenResponse.data?.csrf_token) {
          const metaTag = document.querySelector('meta[name="csrf-token"]')
          if (metaTag) {
            metaTag.setAttribute('content', tokenResponse.data.csrf_token)
            console.log('CSRF token updated in meta tag')
          }
        }
      } catch (tokenError) {
        console.warn('Proceeding without CSRF token:', tokenError.message)
      }
      console.log('Making registration request with axios...');
      
      const response = await apiClient.post('/register', userData);
      return response;
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // استخدام mock data إذا فشل الاتصال
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
        console.log('Using mock registration...');
        return {
          status: 201,
          data: {
            access_token: 'mock_token_' + Date.now(),
            user: {
              id: Math.floor(Math.random() * 1000),
              name: userData.name,
              email: userData.email,
              role: userData.role || 'student'
            }
          }
        };
      }
      throw error;
    }
  },
  // جلب بيانات المستخدم الحالي
  getUser: async () => {
    try {
      const response = await apiClient.get('/user')
      
      // تحويل تنسيق الاستجابة من Laravel إلى التنسيق المتوقع
      if (response.data) {
        return {
          status: response.status,
          data: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.roles && response.data.roles.length > 0 
              ? response.data.roles[0].name 
              : 'student'
          }
        }
      }
      
      return response
    } catch (error) {
      throw error
    }
  },

  // تسجيل الخروج
  logout: async () => {
    try {
      const response = await apiClient.post('/logout')
      return response
    } catch (error) {
      throw error
    }
  },

  // تحديث بيانات المستخدم
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/auth/profile', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  // تغيير كلمة المرور
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.post('/auth/change-password', passwordData)
      return response
    } catch (error) {
      throw error
    }
  }
}

export default AuthService