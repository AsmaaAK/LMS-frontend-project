<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ $t('signup.create_account') }}
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">{{ $t('signup.name') }}</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              autocomplete="name" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
              :placeholder="$t('signup.name')"
              v-model="form.name"
            >
          </div>
          <div>
            <label for="email" class="sr-only">{{ $t('signup.email') }}</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
              :placeholder="$t('signup.email')"
              v-model="form.email"
            >
          </div>
          <div>
            <label for="password" class="sr-only">{{ $t('signup.password') }}</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="new-password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
              :placeholder="$t('signup.password')"
              v-model="form.password"
            >
          </div>
          <div>
            <label for="password_confirmation" class="sr-only">{{ $t('signup.confirm_password') }}</label>
            <input 
              id="password_confirmation" 
              name="password_confirmation" 
              type="password" 
              autocomplete="new-password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
              :placeholder="$t('signup.confirm_password')"
              v-model="form.password_confirmation"
            >
          </div>
        </div>

        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-700 dark:text-red-200">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative dark:bg-green-900 dark:border-green-700 dark:text-green-200">
          {{ successMessage }}
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ loading ? $t('signup.creating_account') : $t('signup.create_account') }}
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            {{ $t('signup.already_have_account') }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Signup',
  setup() {
    const form = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    });
    const loading = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');
    const router = useRouter();
    const { t } = useI18n();

    const handleSignup = async () => {
     console.log('Data being sent:', this.form);
      loading.value = true;
      errorMessage.value = '';
      successMessage.value = '';

      try {
        console.log('Attempting signup with:', form.value);
        
        const response = await AuthService.register(form.value);
        
        if (response.status === 201) {
          console.log('Signup successful, response:', response.data);
          
          successMessage.value = t('signup.signup_success');
          
          // تخزين token وبيانات المستخدم
          localStorage.setItem('access_token', response.data.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          
          // الانتقال إلى Dashboard بعد ثانيتين
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        }
      } catch (error) {
        console.error('Signup error details:', error);
        
        if (error.response?.status === 422) {
          // أخطاء التحقق
          const errors = error.response.data.errors;
          errorMessage.value = Object.values(errors).flat().join(', ');
        } else if (error.response?.status === 500) {
          errorMessage.value = t('signup.server_error');
        } else if (error.code === 'ERR_NETWORK') {
          errorMessage.value = t('signup.network_error');
        } else {
          errorMessage.value = t('signup.signup_failed');
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      errorMessage,
      successMessage,
      handleSignup
    };
  }
};
</script>