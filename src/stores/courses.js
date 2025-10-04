// src/stores/courses.js
import { defineStore } from 'pinia'
import { courseService } from '@/services/courseService'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    currentCourse: null,
    enrolledCourses: [],
    myCourses: [],
    loading: false,
    pagination: {
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: 12
    },
    filters: {
      search: '',
      level: '',
      is_published: '',
      mine: false,
      enrolled: false
    }
  }),

  getters: {
    getCourses: (state) => state.courses,
    getCurrentCourse: (state) => state.currentCourse,
    getEnrolledCourses: (state) => state.enrolledCourses,
    getMyCourses: (state) => state.myCourses,
    isLoading: (state) => state.loading,
    getPagination: (state) => state.pagination,
    getFilters: (state) => state.filters
  },

  actions: {
    async fetchCourses(params = {}) {
      this.loading = true
      
      const requestParams = {
        ...this.filters,
        ...params
      }

      const result = await courseService.getCourses(requestParams)
      
      if (result.success) {
        this.courses = result.data
        this.pagination = result.meta || this.pagination
      }
      
      this.loading = false
      return result
    },

    // جلب كورس مفرد
    async fetchCourse(id) {
      this.loading = true
      const result = await courseService.getCourse(id)
      
      if (result.success) {
        this.currentCourse = result.data
      }
      
      this.loading = false
      return result
    },

    // جلب الكورسات المسجلة (للطالب)
    async fetchEnrolledCourses() {
      this.loading = true
      const result = await courseService.getEnrolledCourses()
      
      if (result.success) {
        this.enrolledCourses = result.data
      }
      
      this.loading = false
      return result
    },

    // جلب كورسات المدرس
    async fetchMyCourses() {
      this.loading = true
      const result = await courseService.getInstructorCourses()
      
      if (result.success) {
        this.myCourses = result.data
      }
      
      this.loading = false
      return result
    },

    // إنشاء كورس جديد
    async createCourse(courseData) {
      const result = await courseService.createCourse(courseData)
      
      if (result.success) {
        this.courses.unshift(result.data)
        this.myCourses.unshift(result.data)
      }
      
      return result
    },

    // تحديث كورس
    async updateCourse({ id, courseData }) {
      const result = await courseService.updateCourse(id, courseData)
      
      if (result.success) {
        // تحديث البيانات المحلية
        const index = this.courses.findIndex(course => course.id === id)
        if (index !== -1) {
          this.courses[index] = result.data
        }
        
        const myIndex = this.myCourses.findIndex(course => course.id === id)
        if (myIndex !== -1) {
          this.myCourses[myIndex] = result.data
        }
        
        if (this.currentCourse?.id === id) {
          this.currentCourse = result.data
        }
      }
      
      return result
    },

    // حذف كورس
    async deleteCourse(id) {
      const result = await courseService.deleteCourse(id)
      
      if (result.success) {
        // إزالة من البيانات المحلية
        this.courses = this.courses.filter(course => course.id !== id)
        this.myCourses = this.myCourses.filter(course => course.id !== id)
        
        if (this.currentCourse?.id === id) {
          this.currentCourse = null
        }
      }
      
      return result
    },

    // التسجيل في كورس
    async enrollInCourse(courseId) {
      return await courseService.enrollInCourse(courseId)
    },

    // تحديث الفلاتر
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
    },

    // مسح الفلاتر
    clearFilters() {
      this.filters = {
        search: '',
        level: '',
        is_published: '',
        mine: false,
        enrolled: false
      }
    }
  }
})