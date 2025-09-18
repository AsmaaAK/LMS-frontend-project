import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import Signup from '../components/Signup.vue'; // أضف هذا الاستيراد


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
   {
    path: '/signup',
    name: 'Signup',
    component: Signup, // أضف هذا المسار
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
  path: '/admin/users',
  name: 'UserManagement',
  component: () => import('../components/admin/UserManagement.vue'),
  meta: { requiresAuth: true, requiresRole: 'admin' }
}
];

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

export default router;