// services/profileService.js
import { AuthService } from '@/services/authService'

export const ProfileService = {
  // تحديث الملف الشخصي
  updateProfile: async (profileData) => {
    try {
      const response = await AuthService.put('/api/profile', profileData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // تغيير كلمة المرور
  changePassword: async (passwordData) => {
    try {
      const response = await AuthService.post('/api/change-password', passwordData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // رفع صورة الملف الشخصي
  uploadAvatar: async (avatarFile) => {
    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile)
      
      const response = await AuthService.post('/api/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}