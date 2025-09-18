// src/services/UserService.js
import apiClient from './api';

// خدمة إدارة المستخدمين
const UserService = {
  async getUsers() {
    try {
      const response = await apiClient.get('/api/users');
      return response;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const response = await apiClient.get(`/api/users/${userId}`);
      return response;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const response = await apiClient.post('/api/users', userData);
      return response;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await apiClient.put(`/api/users/${userId}`, userData);
      return response;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const response = await apiClient.delete(`/api/users/${userId}`);
      return response;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },

  async getUserStatistics() {
    try {
      const response = await apiClient.get('/api/users/statistics');
      return response;
    } catch (error) {
      console.error('Get user statistics error:', error);
      throw error;
    }
  },

  async getRoles() {
    try {
      const response = await apiClient.get('/api/roles');
      return response;
    } catch (error) {
      console.error('Get roles error:', error);
      throw error;
    }
  }
};

export default UserService;