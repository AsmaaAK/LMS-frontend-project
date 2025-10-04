import apiClient from './api'

const RoleService = {
  // جلب جميع الأدوار
  async getRoles() {
    try {
      // إذا كان لديك endpoint للأدوار
      const response = await apiClient.get('/roles')
      return response.data
    } catch (error) {
      console.error('Get roles error:', error)
      // إرجاع أدوار افتراضية إذا فشل الاتصال
      return {
        success: true,
        data: [
          { id: 1, name: 'admin', display_name: 'مدير النظام' },
          { id: 2, name: 'teacher', display_name: 'معلم' },
          { id: 3, name: 'student', display_name: 'طالب' }
        ]
      }
    }
  }
}

export default RoleService