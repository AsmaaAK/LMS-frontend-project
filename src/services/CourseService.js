// src/services/courseService.js
import api from '@/utils/api'

export const courseService = {
    async getAllCourses() {
    
      const response = await api.get('/courses')
      
      return response
    
    
  },
  // جلب جميع الكورسات
  async getCourses(params = {}) {
    try {
      const response = await api.get('/courses', { params })
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'فشل في جلب الكورسات',
        status: error.response?.status
      }
    }
  },

  // جلب كورس مفرد
  async getCourse(id) {
    try {
      const response = await api.get(`/courses/${id}`)
      return {
        success: true,
        data: response.data.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'فشل في جلب بيانات الكورس',
        status: error.response?.status
      }
    }
  },

  // إنشاء كورس جديد
  async createCourse(courseData) {
  
      // استخدام FormData للتعامل مع الملفات
      // const formData = new FormData()
      
      // Object.keys(courseData).forEach(key => {
      //   if (courseData[key] !== null && courseData[key] !== undefined) {
      //     if (key === 'image' && courseData[key] instanceof File) {
      //       formData.append('image', courseData[key])
      //     } else {
      //       formData.append(key, courseData[key])
      //     }
      //   }
      // })

      const response = await api.post('/courses', courseData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response

      
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: error.response?.data?.message || 'فشل في إنشاء الكورس',
    //     errors: error.response?.data?.errors
    //   }
    // }
  },

  // تحديث كورس
  async updateCourse(id, courseData) {
    try {
      const formData = new FormData()
      
      Object.keys(courseData).forEach(key => {
        if (courseData[key] !== null && courseData[key] !== undefined) {
          if (key === 'image' && courseData[key] instanceof File) {
            formData.append('image', courseData[key])
          } else {
            formData.append(key, courseData[key])
          }
        }
      })

      // استخدام POST مع _method=PUT للتعامل مع FormData
      formData.append('_method', 'PUT')

      const response = await api.post(`/courses/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'تم تحديث الكورس بنجاح'
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'فشل في تحديث الكورس',
        errors: error.response?.data?.errors
      }
    }
  },

  // حذف كورس
  async deleteCourse(id) {
    try {
      const response = await api.delete(`/courses/${id}`)
      return {
        success: true,
        message: response.data.message || 'تم حذف الكورس بنجاح'
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'فشل في حذف الكورس'
      }
    }
  },

  // التسجيل في كورس
  async enrollInCourse(courseId) {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`)
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'تم التسجيل في الكورس بنجاح'
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'فشل في التسجيل في الكورس'
      }
    }
  },

  // جلب الكورسات المسجلة (للطالب)
  async getEnrolledCourses() {
    try {
      const response = await api.get('/student/courses')
      return {
        success: true,
        data: response.data.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'فشل في جلب الكورسات المسجلة'
      }
    }
  },

  // جلب كورسات المدرس
  async getInstructorCourses() {
    try {
      const response = await api.get('/instructor/courses')
      return {
        success: true,
        data: response.data.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'فشل في جلب كورساتي'
      }
    }
  }
}