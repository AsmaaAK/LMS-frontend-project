
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import Dashboard from '@/views/Dashboard.vue'
import AdminUsers from '@/views/admin/Users.vue'; 

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true, requiresRole: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// حماية Routes التي تتطلب مصادقة
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.name === 'Login' && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRoles = user.roles || [];

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresRole && !userRoles.some(role => role.name === to.meta.requiresRole)) {
    next('/dashboard');
  } else if (to.name === 'Login' && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;