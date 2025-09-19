// src/services/AuthService.js
import apiClient from './api';

// خدمة المصادقة فقط
const AuthService = {
  async login(credentials) {
    try {
      // لا حاجة لطلب CSRF منفصل هنا لأن interceptor سيتكفل به
      const response = await apiClient.post('/api/login', credentials);
      return response;
    } catch (error) {
      if (error.response?.status === 422) {
      // إعادة Error مع رسائل التحقق
      const validationErrors = error.response.data.errors;
      const errorMessage = Object.values(validationErrors).flat().join(', ');
      throw new Error(errorMessage);
    }
    throw error;
  }
  },

  async register(userData) {
    try {
      // لا حاجة لطلب CSRF منفصل هنا لأن interceptor سيتكفل به
      const response = await apiClient.post('/api/register', userData);
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const response = await apiClient.post('/api/logout');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getUser() {
    try {
      const response = await apiClient.get('/api/user');
      return response;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }
};

export default AuthService;