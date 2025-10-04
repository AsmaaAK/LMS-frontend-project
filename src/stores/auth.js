import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { USER_ROLES } from '@/utils/constants'
import { AuthService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const currentRole = ref(null)

  const userRole = computed(() => currentRole.value)

  const hasRole = (role) => {
    if (!currentRole.value) return false
    const normalized = role === 'teacher' ? USER_ROLES.INSTRUCTOR : role
    return currentRole.value === normalized
  }

  const hasAnyRole = (roles) => {
    if (!Array.isArray(roles)) return hasRole(roles)
    return roles.some(r => hasRole(r))
  }

  const hasPermission = (permission) => {
    if (!user.value || !user.value.permissions) return false
    return user.value.permissions.includes(permission)
  }

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials)
      if (response.status === 200) {
        const userData = response.data.user || response.data.data?.user || response.data
        const token = response.data.access_token || response.data.data?.access_token || response.data.token

        localStorage.setItem('access_token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        
        user.value = userData
        currentRole.value = userData.role
        isAuthenticated.value = true
        
        return { success: true, user: userData }
      }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData)
      if (response.status === 200 || response.status === 201) {
        const userDataFromApi = response.data.user || response.data.data?.user || response.data
        const token = response.data.access_token || response.data.data?.access_token || response.data.token

        localStorage.setItem('access_token', token)
        localStorage.setItem('user', JSON.stringify(userDataFromApi))
        
        user.value = userDataFromApi
        currentRole.value = userDataFromApi.role
        isAuthenticated.value = true
        
        return { success: true, user: userDataFromApi }
      }
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      isAuthenticated.value = false
      user.value = null
      currentRole.value = null
    }
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const storedUser = localStorage.getItem('user')
      
      if (!token || !storedUser) {
        isAuthenticated.value = false
        user.value = null
        currentRole.value = null
        return
      }

      // استخدم البيانات من localStorage
      const localUser = JSON.parse(storedUser)
      user.value = localUser
      currentRole.value = localUser.role
      isAuthenticated.value = true

      // تحديث البيانات من السيرفر
      try {
        const response = await AuthService.getUser()
        const apiUser = response.data?.data?.user || response.data?.user || response.data
        if (apiUser) {
          user.value = apiUser
          currentRole.value = apiUser.role
          localStorage.setItem('user', JSON.stringify(apiUser))
        }
      } catch (error) {
        console.warn('Could not refresh user data from server:', error.message)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      isAuthenticated.value = false
      user.value = null
      currentRole.value = null
    }
  }

  return {
    isAuthenticated,
    user,
    currentRole,
    userRole,
    hasRole,
    hasAnyRole,
    hasPermission,
    login,
    register,
    logout,
    checkAuth
  }
})
