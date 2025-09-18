// src/services/api.js
import axios from 'axios';

// إنشاء instance من axios مع الإعدادات الأساسية فقط
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// إضافة interceptors للتعامل مع CSRF والأخطاء
apiClient.interceptors.request.use(
  async (config) => {
    // إذا كان الطلب ليس للحصول على CSRF cookie نفسه
    if (!config.url.includes('sanctum/csrf-cookie')) {
      // تأكد من أن لدينا CSRF cookie أولاً
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });
    }
    
    // إضافة token إذا موجود
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor للتعامل مع الأخطاء
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// تصدير apiClient فقط
export default apiClient;