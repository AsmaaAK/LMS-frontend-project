import { useAuthStore } from '@/stores/auth'

export const roleGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next('/login')
    return
  }

  const requiredRole = to.meta.role
  const userRole = authStore.userRole

  if (requiredRole && userRole !== requiredRole) {
    // إعادة التوجيه بناءً على دور المستخدم
    switch (userRole) {
      case 'student':
        next('/student/dashboard')
        break
      case 'teacher':
        next('/instructor/dashboard')
        break
      case 'admin':
        next('/admin/dashboard')
        break
      default:
        next('/')
    }
    return
  }

  next()
}