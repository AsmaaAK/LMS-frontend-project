<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-300 dark:text-gray-600">404</h1>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">الصفحة غير موجودة</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
      </div>
      
      <div class="space-y-4">
        <router-link 
          to="/" 
          class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          العودة للرئيسية
        </router-link>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          أو
        </div>
        
        <button 
          @click="$router.go(-1)" 
          class="inline-block border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200"
        >
          العودة للصفحة السابقة
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// يمكن إضافة منطق إضافي هنا إذا لزم الأمر
</script>

<style scoped>
/* يمكن إضافة أنماط إضافية هنا إذا لزم الأمر */
</style>
