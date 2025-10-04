<template>
  <header class="bg-white dark:bg-gray-800 fixed top-0 left-0 right-0 shadow-sm border-b border-gray-200 dark:border-gray-700 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
      <div class="flex justify-between items-center h-16">
        <!-- الجزء الأيسر -->
        <div class="flex items-center">
          <button 
            @click="$emit('toggle-sidebar')"
            class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white lg:hidden"
          >
            <Bars3Icon class="w-6 h-6" />
          </button>

          <RouterLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
            <AcademicCapIcon class="h-8 w-8 text-blue-600" />
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              {{ $t('app.name') }}
            </span>
          </RouterLink>
        </div>

        <!-- الجزء الأيمن -->
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <!-- محول السمة -->
          <ThemeToggle />

          <!-- محول اللغة -->
          <LanguageSwitcher />

          <!-- جرس الإشعارات -->
          <NotificationBell />

          <!-- صورة المستخدم -->
          <div class="relative">
            <button 
              @click="toggleUserMenu"
              class="flex items-center space-x-2 rtl:space-x-reverse text-sm rounded-full focus:outline-none"
            >
              <img 
                :src="user.avatar || '/images/avatar-placeholder.png'" 
                :alt="user.name"
                class="h-8 w-8 rounded-full"
              >
              <span class="hidden md:block text-gray-700 dark:text-gray-300">
                {{ user.name }}
              </span>
              <ChevronDownIcon class="w-4 h-4 text-gray-400" />
            </button>

            <!-- قائمة المستخدم -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                <p class="text-xs text-blue-600 dark:text-blue-400 capitalize">
                  {{ $t(`roles.${user.role}`) }}
                </p>
              </div>

              <div class="py-1">
                <RouterLink 
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="showUserMenu = false"
                >
                  {{ $t('navigation.profile') }}
                </RouterLink>
                <RouterLink 
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="showUserMenu = false"
                >
                  {{ $t('navigation.settings') }}
                </RouterLink>
              </div>

              <div class="py-1 border-t border-gray-200 dark:border-gray-700">
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {{ $t('auth.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import NotificationBell from '@/components/ui/NotificationBell.vue'
import { 
  AcademicCapIcon, 
  Bars3Icon, 
  ChevronDownIcon 
} from '@heroicons/vue/24/outline'

defineEmits(['toggle-sidebar'])

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

const showUserMenu = ref(false)

const user = computed(() => authStore.user || {})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    showUserMenu.value = false
  }
}

// إغلاق القائمة عند النقر خارجها
const clickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutside)
})
</script>