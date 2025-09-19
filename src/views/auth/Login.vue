<!-- <template>
  <div class="login-page">
    <LoginForm @submit="handleLogin" />
    <SocialLogin />
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'
import SocialLogin from '@/components/auth/SocialLogin.vue'

export default {
  components: {
    LoginForm,
    SocialLogin
  },
  methods: {
    handleLogin(credentials) {
      // معالجة تسجيل الدخول
    }
  }
}
</script> -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ $t('login.sign_in') }}
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">{{ $t('login.email') }}</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
              :placeholder="$t('login.email')"
              v-model="form.email"
            >
          </div>
          <div>
            <label for="password" class="sr-only">{{ $t('login.password') }}</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
              :placeholder="$t('login.password')"
              v-model="form.password"
            >
          </div>
        </div>

        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-700 dark:text-red-200">
          {{ errorMessage }}
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ loading ? $t('login.signing_in') : $t('login.sign_in') }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="text-center mt-4">
    <router-link to="/signup" class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
      {{ $t('login.create_account') }}
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import services from '@/services';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Login',
  setup() {
    const form = ref({
      email: '',
      password: ''
    });
    const loading = ref(false);
    const errorMessage = ref('');
    const router = useRouter();
    const { t } = useI18n();

 const handleLogin = async () => {
      loading.value = true;
      errorMessage.value = '';

      try {
        const response = await services.AuthService.login(form.value);
        
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          router.push('/dashboard');
        }
      } catch (error) {
        if (error.response?.status === 401) {
          errorMessage.value = t('login.invalid_credentials');
        } else {
          errorMessage.value = t('login.login_failed');
        }
        console.error('Login error:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      errorMessage,
      handleLogin
    };
  }
};
</script>