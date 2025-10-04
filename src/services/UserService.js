import apiClient from './api'

const UserService = {
  // جلب جميع المستخدمين
async getUsers(filters = {}) {
  try {
    const params = new URLSearchParams()
    
      if (filters.search && filters.search.trim() !== '') {
        params.append('search', filters.search.trim())
      }
      if (filters.role && filters.role !== '') {
        params.append('role', filters.role)
      }
      if (filters.status && filters.status !== '') {
        params.append('status', filters.status)
      }
      
      const queryString = params.toString()
      const url = queryString ? `/users?${queryString}` : '/users'
      
      console.log('🟡 API URL:', url)
      
      const response = await apiClient.get(url)
      console.log('🟢 Users fetched successfully')
      return response.data
      
    } catch (error) {
      console.error('🔴 Get users error:', error)
      
      // عرض تفاصيل الخطأ
      if (error.response) {
        console.error('🔴 Response data:', error.response.data)
      }
      
      throw error
    }
  },

  // جلب مستخدم بواسطة ID
  async getUser(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Get user error:', error)
      throw error
    }
  },
    async updateUser(userId, userData) {
    try {
      console.log('🟡 Updating user:', userId, userData)
      
      // التأكد من CSRF token
      await this.ensureCsrfToken()
      
      // 🔹 استخدام البيانات بشكل مباشر (بدون role_id)
      const formattedData = {
        name: userData.name,
        email: userData.email,
        role: userData.role, // 🔹 إرسال role مباشرة
        status: userData.status || 'active'
      }
      
      // إضافة كلمة المرور فقط إذا تم تقديمها
      if (userData.password && userData.password.trim() !== '') {
        formattedData.password = userData.password
        formattedData.password_confirmation = userData.password_confirmation
      }
      
      console.log('🟡 Sending update data:', formattedData)
      
      const response = await apiClient.put(`/users/${userId}`, formattedData)
      console.log('🟢 User updated successfully')
      return response.data
      
    } catch (error) {
      console.error('🔴 Update user error:', error)
      
      if (error.response) {
        console.error('🔴 Response data:', error.response.data)
      }
      
      throw error
    }
  },

  // 🔹 دالة مساعدة لـ CSRF token
  async ensureCsrfToken() {
    try {
      const response = await apiClient.get('/csrf-token')
      if (response.data?.csrf_token) {
        apiClient.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token
      }
    } catch (error) {
      console.warn('CSRF token not available:', error.message)
    }
  },

  // إنشاء مستخدم جديد
  async createUser(userData) {
    try {
      const formattedData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        role_id: this.getRoleId(userData.role) // استخدام this.
      }
      
      const response = await apiClient.post('/users', formattedData)
      return response.data
    } catch (error) {
      console.error('Create user error:', error)
      throw error
    }
  },

  // تحديث مستخدم
  // async updateUser(userId, userData) {
  //   try {
  //     const formattedData = {
  //       name: userData.name,
  //       email: userData.email,
  //       role_id: this.getRoleId(userData.role), // استخدام this.
  //       status: userData.status
  //     }
      
  //     if (userData.password) {
  //       formattedData.password = userData.password
  //       formattedData.password_confirmation = userData.password_confirmation
  //     }
      
  //     const response = await apiClient.put(`/users/${userId}`, formattedData)
  //     return response.data
  //   } catch (error) {
  //     console.error('Update user error:', error)
  //     throw error
  //   }
  // },

  // حذف مستخدم
  async ensureCsrfToken() {
    try {
      const response = await apiClient.get('/csrf-token')
      if (response.data?.csrf_token) {
        apiClient.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token
        console.log('CSRF token set successfully')
      }
    } catch (error) {
      console.warn('CSRF token endpoint not available, trying alternative methods...')
      
      const csrfToken = this.getCsrfTokenFromCookie()
      if (csrfToken) {
        apiClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        console.log('CSRF token set from cookie')
      } else {
        console.warn('No CSRF token available, requests may fail')
      }
    }
  },

  // استخراج CSRF token من الـ cookies
  getCsrfTokenFromCookie() {
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'XSRF-TOKEN') {
        return decodeURIComponent(value)
      }
    }
    return null
  },

  //   دالة الحذف
  async deleteUser(userId) {
    try {
      await this.ensureCsrfToken()
      
      console.log('Deleting user with ID:', userId)
      const response = await apiClient.delete(`/users/${userId}`)
      console.log('Delete response:', response.data)
      return response.data
    } catch (error) {
      console.error('Delete user error:', error)
      
      // 🔹 محاولة بديلة إذا فشلت الأولى
      if (error.response?.status === 419) {
        console.log('CSRF error, retrying with fresh token...')
        // إزالة الـ token القديم والمحاولة مرة أخرى
        delete apiClient.defaults.headers.common['X-CSRF-TOKEN']
        await this.ensureCsrfToken()
        
        const retryResponse = await apiClient.delete(`/users/${userId}`)
        return retryResponse.data
      }
      
      throw error
    }
  },

  // جلب إحصائيات المستخدمين
  async getUserStats() {
    try {
      const response = await apiClient.get('/users/statistics')
      return response.data
    } catch (error) {
      console.error('Get user stats error:', error)
      
      // إرجاع إحصائيات افتراضية إذا فشل
      try {
        const usersResponse = await this.getUsers()
        const users = usersResponse.data || usersResponse || []
        
        return {
          success: true,
          data: {
            total_users: users.length,
            admin_users: users.filter(u => u.role === 'admin').length,
            instructor_users: users.filter(u => u.role === 'teacher' || u.role === 'teacher').length,
            student_users: users.filter(u => u.role === 'student').length
          }
        }
      } catch (innerError) {
        // إرجاع إحصائيات افتراضية إذا فشل جلب المستخدمين أيضاً
        return {
          success: true,
          data: {
            total_users: 0,
            admin_users: 0,
            instructor_users: 0,
            student_users: 0
          }
        }
      }
    }
  },

  // دالة مساعدة لتحويل اسم الدور إلى role_id
  getRoleId(roleName) {
    const roleMap = {
      'student': 3,
      'instructor': 2,  
      'teacher': 2,
      'admin': 1
    }
    return roleMap[roleName] || 3
  }
}

export default UserService