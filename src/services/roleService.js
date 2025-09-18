import api from './api';

export const roleService = {
  async getRoles() {
    try {
      const response = await api.get('/roles');
      return response.data;
    } catch (error) {
      console.error('Get roles error:', error);
      throw error;
    }
  },

  async assignRole(userId, roleId) {
    try {
      const response = await api.post(`/users/${userId}/assign-role`, { role_id: roleId });
      return response.data;
    } catch (error) {
      console.error('Assign role error:', error);
      throw error;
    }
  },

  async removeRole(userId, roleId) {
    try {
      const response = await api.delete(`/users/${userId}/remove-role/${roleId}`);
      return response.data;
    } catch (error) {
      console.error('Remove role error:', error);
      throw error;
    }
  }
};