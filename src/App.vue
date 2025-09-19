<template>
  <div>
    <router-view />
  
    <!-- للتصحيح فقط: عرض المسارات المتاحة -->
    <div v-if="false" class="debug-routes">
      <h3>المسارات المتاحة:</h3>
      <ul>
        <li v-for="route in $router.getRoutes()" :key="route.path">
           {{ route.path }} - {{ route.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    const isDarkMode = ref(false);

    onMounted(() => {
      // التحقق من إعدادات النظام أو التخزين المحلي لوضع الظلام
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      isDarkMode.value = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
      
      // تحديث class في html element
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    return {
      isDarkMode
    };
  }
};
</script>