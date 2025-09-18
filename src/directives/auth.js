import { getCurrentInstance } from 'vue';

export const authDirective = {
  mounted(el, binding) {
    const { hasRole, hasAnyRole, hasPermission } = getCurrentInstance().appContext.config.globalProperties;
    
    const { value } = binding;
    
    if (typeof value === 'string') {
      // التحقق من دور واحد
      if (!hasRole(value)) {
        el.style.display = 'none';
      }
    } else if (Array.isArray(value)) {
      // التحقق من عدة أدوار
      if (!hasAnyRole(value)) {
        el.style.display = 'none';
      }
    } else if (typeof value === 'object') {
      // التحقق من الصلاحية
      if (value.permission && !hasPermission(value.permission)) {
        el.style.display = 'none';
      }
    }
  }
};