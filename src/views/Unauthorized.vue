<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="max-w-md w-full text-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">صلاحية غير كافية</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">ليس لديك الصلاحية للوصول إلى هذه الصفحة</p>
        <div class="space-y-3">
          <router-link to="/app/dashboard" class="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            العودة للرئيسية
          </router-link>
          <button @click="$router.go(-1)" class="block w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            الرجوع للخلف
          </button>
        </div>
      </div>
    </div>
  </div>
</template>