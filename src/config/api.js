// إعدادات API
export const API_CONFIG = {
  // URL الباك إند - غير هذا إلى URL الخاص بك
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // إعدادات أخرى
  TIMEOUT: 10000, // 10 ثواني
  RETRY_ATTEMPTS: 3
}

// إعدادات التطبيق
export const APP_CONFIG = {
  NAME: 'Learning Management System',
  VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'ar',
  DEFAULT_THEME: 'light'
}





