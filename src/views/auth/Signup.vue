<template>
<div class="min-h-screen flex bg-white dark:bg-gray-900 transition-colors duration-300">
   
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-blue-700 relative dark:from-gray-900 dark:to-gray-800">
      <div class="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      <div class="relative z-10 flex flex-col justify-start pt-20 px-12 text-white">
        
        <div class="mb-12">
        
          <h2 class="text-4xl font-bold mb-4">انضم إلينا اليوم!</h2>
          <p class="text-lg opacity-90">ابدأ رحلتك التعليمية مع آلاف الطلاب حول العالم</p>
        </div>
        
        <!-- مزايا -->
        <div class="space-y-6">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-green-300 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-lg">دورات تعليمية متنوعة</span>
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-green-300 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-lg">مدربون محترفون</span>
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-green-300 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-lg">شهادات معتمدة</span>
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-green-300 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-lg">مجتمع تعليمي نشط</span>
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-green-300 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-lg">دعم فني متواصل</span>
          </div>
        </div>
      </div>
    
      <!-- موجات تصميمية -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25" class="fill-current text-white dark:text-gray-900"></path>
          <path d="M0,0 V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5" class="fill-current text-white dark:text-gray-900"></path>
          <path d="M0,0 V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                class="fill-current text-white dark:text-gray-900"></path>
        </svg>
      </div>
    </div>

    <!-- الجانب الأيمن - نموذج التسجيل -->
    <div class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="max-w-md w-full space-y-8">
        <!-- الشعار وتبديل الوضع -->
        <div class="text-center relative">
          <!-- Language and Theme Controls -->
          <!-- <div class="absolute left-0 top-0 flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher />
            <ThemeToggle />
          </div> -->
          
          <div class="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 dark:from-green-600 dark:to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
          <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">{{ $t('signup.create_account') }}</h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ $t('signup.join_community') }}</p>
        </div>

        <!-- رسائل الخطأ والنجاح -->
        <div v-if="errorMessage" class="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-red-700 dark:text-red-300">{{ errorMessage }}</span>
          </div>
        </div>

        <div v-if="successMessage" class="rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-green-700 dark:text-green-300">{{ successMessage }}</span>
          </div>
        </div>

        <!-- النموذج -->
        <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
          <div class="space-y-4">
            <!-- حقل الاسم -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ $t('signup.name') }}
              </label>
              <div class="relative">
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="relative block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  :placeholder="$t('signup.name')"
                  :disabled="loading"
                >
                <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- حقل البريد الإلكتروني -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ $t('signup.email') }}
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="relative block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  :placeholder="$t('signup.email')"
                  :disabled="loading"
                >
                <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- حقل الدور -->
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ $t('signup.role') }}
              </label>
              <div class="relative">
                <select
                  id="role"
                  v-model="form.role"
                  required
                  class="relative block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none"
                  :disabled="loading"
                >
                  <option value="">{{ $t('signup.select_role') }}</option>
                  <option value="student">{{ $t('roles.student') }}</option>
                  <option value="teacher">{{ $t('roles.teacher') }}</option>
                </select>
                <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- حقل كلمة المرور -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ $t('signup.password') }}
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="relative block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  :placeholder="$t('signup.password')"
                  :disabled="loading"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  :disabled="loading"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- تأكيد كلمة المرور -->
            <div>
              <label for="password_confirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ $t('signup.confirm_password') }}
              </label>
              <div class="relative">
                <input
                  id="password_confirmation"
                  v-model="form.password_confirmation"
                  type="password"
                  required
                  class="relative block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  :placeholder="$t('signup.confirm_password')"
                  :disabled="loading"
                >
                <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- زر التسجيل -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900"
            >
              <span class="absolute right-0 inset-y-0 flex items-center ml-3">
                <svg v-if="!loading" class="h-5 w-5 text-green-300 group-hover:text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                <svg v-else class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? $t('signup.creating_account') : $t('signup.create_account') }}
            </button>
          </div>

          <!-- رابط تسجيل الدخول -->
          <div class="text-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ $t('signup.already_have_account') }} </span>
            <router-link to="/login" class="text-sm text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-medium transition-colors">
              {{ $t('login.sign_in') }}
            </router-link>
          </div>
        </form>

        <!-- تسجيل الدخول بالسوشيال ميديا -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">{{ $t('signup.or_continue_with') }}</span>
            </div>
          </div>

          <div class="mt-3 grid grid-cols-2 gap-3">
            <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="mr-2">Google</span>
            </button>

            <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <span class="mr-2">Twitter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AuthService from '@/services/authService';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';

export default {
  name: 'Signup',
  components: {
    LanguageSwitcher,
    ThemeToggle
  },
  setup() {
    const form = reactive({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'student'
    });

    const showPassword = ref(false);
    const loading = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');
    const router = useRouter();
    const { t } = useI18n();

    const handleSignup = async () => {
      loading.value = true;
      errorMessage.value = '';
      successMessage.value = '';

      console.log('🔄 بدء عملية التسجيل...', form);

      // التحقق من صحة البيانات
      if (form.password !== form.password_confirmation) {
        errorMessage.value = 'كلمات المرور غير متطابقة';
        loading.value = false;
        return;
      }

      try {
        console.log('📤 إرسال بيانات التسجيل:', form);
        
        // استخدام form مباشرة بدون .value
        const response = await AuthService.register(form);
        console.log("📨 استجابة التسجيل:", response);

        if (response.status === 200) {
          const data = response.data;
          console.log('✅ التسجيل ناجح:', data);
          
          successMessage.value = 'تم إنشاء الحساب بنجاح!';

          // حفظ بيانات المستخدم
          const userData = data.user || data.data?.user || data;
          const token = data.access_token || data.data?.access_token || data.token;

          if (token && userData) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            setTimeout(() => {
              console.log('🔄 التوجيه إلى صفحة تسجيل الدخول...');
              router.push('/login');
            }, 2000);
          } else {
            errorMessage.value = 'بيانات المستخدم غير مكتملة من الخادم';
          }
        } else {
          errorMessage.value = `فشل في إنشاء الحساب (خطأ ${response.status})`;
        }

      } catch (error) {
        console.error('❌ خطأ في التسجيل:', error);
        
        if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
          errorMessage.value = 'الخادم غير متاح. جاري استخدام الوضع التجريبي...';
          await handleMockSignup();
        } else if (error.response?.status === 422) {
          const errors = error.response.data.errors;
          errorMessage.value = Object.values(errors).flat().join(', ') || 'بيانات غير صالحة';
        } else {
          errorMessage.value = error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
        }
      } finally {
        loading.value = false;
      }
    };

    const handleMockSignup = async () => {
      console.log('🎭 استخدام التسجيل الوهمي...');
      
      const mockUser = {
        id: Math.floor(Math.random() * 1000),
        name: form.name,
        email: form.email,
        role: form.role || 'student'
      };
      
      const mockToken = 'mock_token_' + Date.now();
      
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      successMessage.value = 'تم إنشاء الحساب بنجاح (وضع تجريبي)';
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    };

    return { 
      form, 
      showPassword,
      loading, 
      errorMessage, 
      successMessage, 
      handleSignup, 
      t 
    };
  }
};
</script>

<style scoped>
/* تأثيرات إضافية */
input:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.dark input:focus, .dark select:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

button:disabled {
  transform: none !important;
}

/* تحسينات للعربية */
[dir="rtl"] .absolute.inset-y-0.right-3 {
  left: 0.75rem;
  right: auto;
}

[dir="rtl"] .mr-2 {
  margin-left: 0.5rem;
  margin-right: 0;
}

[dir="rtl"] .ml-2 {
  margin-right: 0.5rem;
  margin-left: 0;
}

[dir="rtl"] .ml-3 {
  margin-right: 0.75rem;
  margin-left: 0;
}

/* تأثيرات انتقال سلسة */
* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* تخصيص شريط التمرير للمتصفحات المختلفة */
select::-ms-expand {
  display: none;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>