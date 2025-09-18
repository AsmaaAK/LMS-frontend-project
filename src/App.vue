<template>
  <div :class="{'dark': isDarkMode}">
    <div class="bg-white dark:bg-gray-900 min-h-screen">
      <router-view />
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