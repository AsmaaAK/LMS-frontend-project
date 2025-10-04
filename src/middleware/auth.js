import { useAuthStore } from '@/stores/auth'

export const requireAuth = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
}

export const requireGuest = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    next('/app/dashboard')
  } else {
    next()
  }
}

export const requirePermission = (permission) => {
  return (to, from, next) => {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated) {
      next('/login')
    } else if (!authStore.hasPermission(permission)) {
      next('/unauthorized')
    } else {
      next()
    }
  }
}

export const requireRole = (role) => {
  return (to, from, next) => {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated) {
      next('/login')
    } else if (!authStore.hasRole(role)) {
      next('/unauthorized')
    } else {
      next()
    }
  }
}