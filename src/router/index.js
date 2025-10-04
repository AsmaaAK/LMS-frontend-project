import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// تعريف المسارات في ملف منفصل src/router/routes.js

const router = createRouter({
  history: createWebHistory(),
  routes
})
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
  
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next('/login')
//   } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
//     next('/')
//   } else if (to.meta.roles && !authStore.hasAnyRole(to.meta.roles)) {
//     // إعادة التوجيه للدايشبورد إذا لم يكن لديه الصلاحية
//     next('/')
//   } else {
//     next()
//   }
// })
export default router