// src/services/index.js
import apiClient from './api';
import AuthService from './AuthService';
import UserService from './UserService';
import CourseService from './CourseService';


// تصدير الخدمات ككائن واحد
export {
  apiClient,
  AuthService,
  UserService
};

// أو تصدير افتراضي
export default {
  api: apiClient,
  auth: AuthService,
  user: UserService,
  user: CourseService
};