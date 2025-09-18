import axios from 'axios';

// إنشاء instance من axios مع الإعدادات الأساسية
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// دوال API
export const authService = {
  async login(credentials) {
    try {
      // أولاً، احصل على CSRF cookie
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });
      
      // ثم أرسل طلب تسجيل الدخول
      const response = await apiClient.post('/api/login', credentials);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      // أولاً، احصل على CSRF cookie
      await axios.post('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });
      
      // ثم أرسل طلب التسجيل
      const response = await apiClient.post('http://localhost:8000/api/register', userData);
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  async logout() {
    const response = await apiClient.post('/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return response;
  },

  async getUser() {
    try {
    const response = await apiClient.get('/api/user');
    return response;
  } catch (error) {
    console.error('Get user error:', error);
    
    // إذا كان الخطأ 401 (غير مصرح)، توجيه إلى صفحة Login
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    throw error;
  }
  }
};

// أو يمكنك التصدير بشكل منفصل
export default apiClient;