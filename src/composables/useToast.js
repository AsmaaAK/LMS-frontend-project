import { getCurrentInstance } from 'vue'

export function useToast() {
  const instance = getCurrentInstance()
  
  const toast = {
    success(message, description = null, duration = 5000) {
      this.show('success', message, description, duration)
    },
    
    error(message, description = null, duration = 5000) {
      this.show('error', message, description, duration)
    },
    
    warning(message, description = null, duration = 5000) {
      this.show('warning', message, description, duration)
    },
    
    info(message, description = null, duration = 5000) {
      this.show('info', message, description, duration)
    },
    
    show(type, message, description = null, duration = 5000) {
      // استخدام window object إذا كان متاحاً
      if (window.$toast && window.$toast[type]) {
        window.$toast[type](message, description, duration)
      } else {
        console.warn('Toast notification system not initialized')
        console.log(`[${type.toUpperCase()}] ${message}: ${description}`)
      }
    }
  }
  
  return toast
}