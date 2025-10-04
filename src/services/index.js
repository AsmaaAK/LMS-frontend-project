import axios from 'axios'
import { AuthService } from './authService'
import { API_CONFIG } from '@/config/api'
// import { CourseAPI } from './courseService'

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

// خدمات الكورسات
export const CourseAPI = {
  // جلب جميع الكورسات
  getCourses: async (params = {}) => {
    try {
      const response = await apiClient.get('/courses', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  // جلب كورس محدد
  getCourse: async (id) => {
    try {
      const response = await apiClient.get(`/courses/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // إنشاء كورس جديد
  createCourse: async (courseData) => {
    try {
      const response = await apiClient.post('/courses', courseData)
      return response
    } catch (error) {
      throw error
    }
  },

  // تحديث كورس
  updateCourse: async (id, courseData) => {
    try {
      const response = await apiClient.put(`/courses/${id}`, courseData)
      return response
    } catch (error) {
      throw error
    }
  },

  // حذف كورس
  deleteCourse: async (id) => {
    try {
      const response = await apiClient.delete(`/courses/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // التسجيل في كورس
  enroll: async (courseId) => {
    try {
      const response = await apiClient.post(`/courses/${courseId}/enroll`)
      return response
    } catch (error) {
      throw error
    }
  },

  // جلب كورسات المستخدم
  getUserCourses: async () => {
    try {
      const response = await apiClient.get('/user/courses')
      return response
    } catch (error) {
      throw error
    }
  }
}

// خدمات المستخدمين (للمديرين)
export const UserService = {
  // جلب جميع المستخدمين
  getUsers: async (params = {}) => {
    try {
      const response = await apiClient.get('/users', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  // جلب مستخدم محدد
  getUser: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // إنشاء مستخدم جديد
  createUser: async (userData) => {
    try {
      const response = await apiClient.post('/users', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  // تحديث مستخدم
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData)
      return response
    } catch (error) {
      throw error
    }
  },

  // حذف مستخدم
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  }
}

// خدمات الواجبات
export const AssignmentService = {
  // جلب جميع الواجبات
  getAssignments: async (params = {}) => {
    try {
      const response = await apiClient.get('/assignments', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  // جلب واجب محدد
  getAssignment: async (id) => {
    try {
      const response = await apiClient.get(`/assignments/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // إنشاء واجب جديد
  createAssignment: async (assignmentData) => {
    try {
      const response = await apiClient.post('/assignments', assignmentData)
      return response
    } catch (error) {
      throw error
    }
  },

  // تحديث واجب
  updateAssignment: async (id, assignmentData) => {
    try {
      const response = await apiClient.put(`/assignments/${id}`, assignmentData)
      return response
    } catch (error) {
      throw error
    }
  },

  // حذف واجب
  deleteAssignment: async (id) => {
    try {
      const response = await apiClient.delete(`/assignments/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // تسليم واجب
  submitAssignment: async (assignmentId, submissionData) => {
    try {
      const response = await apiClient.post(`/assignments/${assignmentId}/submit`, submissionData)
      return response
    } catch (error) {
      throw error
    }
  }
}

// تصدير جميع الخدمات
export default {
  AuthService,
  CourseAPI,
  UserService,
  AssignmentService
}