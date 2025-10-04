<!-- <template>
  <slot v-if="checkAccess()" />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const props = defineProps({
  permission: [String, Array],
  role: [String, Array],
  any: {
    type: Boolean,
    default: false
  }
})

const checkAccess = () => {
  // التحقق من الصلاحية
  if (props.permission) {
    if (Array.isArray(props.permission)) {
      if (props.any) {
        return props.permission.some(p => authStore.hasPermission(p))
      } else {
        return props.permission.every(p => authStore.hasPermission(p))
      }
    }
    return authStore.hasPermission(props.permission)
  }
  
  // التحقق من الدور
  if (props.role) {
    if (Array.isArray(props.role)) {
      if (props.any) {
        return props.role.some(r => authStore.hasRole(r))
      } else {
        return props.role.every(r => authStore.hasRole(r))
      }
    }
    return authStore.hasRole(props.role)
  }
  
  return true
}
</script> -->
<template>
  <slot v-if="checkAccess()" />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const props = defineProps({
  permission: [String, Array],
  role: [String, Array],
  any: {
    type: Boolean,
    default: false
  }
})

const checkAccess = () => {
  console.log('🔐 AccessControl - Checking access for:', { 
    permission: props.permission, 
    role: props.role,
    userRole: authStore.user?.role,
    hasPermission: props.permission ? authStore.hasPermission(props.permission) : null
  })

  // التحقق من الصلاحية
  if (props.permission) {
    if (Array.isArray(props.permission)) {
      if (props.any) {
        return props.permission.some(p => authStore.hasPermission(p))
      } else {
        return props.permission.every(p => authStore.hasPermission(p))
      }
    }
    return authStore.hasPermission(props.permission)
  }
  
  // التحقق من الدور
  if (props.role) {
    if (Array.isArray(props.role)) {
      if (props.any) {
        return props.role.some(r => authStore.hasRole(r))
      } else {
        return props.role.every(r => authStore.hasRole(r))
      }
    }
    return authStore.hasRole(props.role)
  }
  
  return true
}
</script>