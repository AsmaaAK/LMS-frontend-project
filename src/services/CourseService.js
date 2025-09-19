import apiClient from './api';

const CourseService = {
  // الحصول على جميع الكورسات
  async getAllCourses() {
    try {
      const response = await apiClient.get('/api/courses');
      return response;
    } catch (error) {
      console.error('Get courses error:', error);
      throw error;
    }
  },

  // الحصول على كورسات الطالب
  async getStudentCourses() {
    try {
      const response = await apiClient.get('/api/student/courses');
      return response;
    } catch (error) {
      console.error('Get student courses error:', error);
      throw error;
    }
  },

  // التسجيل في كورس
  async enroll(courseId) {
    try {
      const response = await apiClient.post(`/api/courses/${courseId}/enroll`);
      return response;
    } catch (error) {
      console.error('Enroll error:', error);
      throw error;
    }
  },

  // الحصول على التصنيفات
  async getCategories() {
    try {
      const response = await apiClient.get('/api/categories');
      return response;
    } catch (error) {
      console.error('Get categories error:', error);
      throw error;
    }
  },

  // الحصول على كورس معين
  async getCourse(courseId) {
    try {
      const response = await apiClient.get(`/api/courses/${courseId}`);
      return response;
    } catch (error) {
      console.error('Get course error:', error);
      throw error;
    }
  }
};

export default CourseService;