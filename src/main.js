import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { authDirective } from './directives/auth';
import authMixin from './mixins/authMixin';
import './assets/main.css';

// إعداد i18n للترجمة (الإنجليزية والعربية)
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    dashboard: {
      welcome: 'Welcome',
      logout: 'Logout',
      profile: 'Profile',
      settings: 'Settings',
      my_courses: 'My Courses',
      manage_users: 'Manage Users',
      manage_courses: 'Manage Courses'
    },
      signup: {
      create_account: 'Create account',
      name: 'Full name',
      email: 'Email address',
      password: 'Password',
      confirm_password: 'Confirm password',
      creating_account: 'Creating account...',
      already_have_account: 'Already have an account? Sign in',
      signup_success: 'Account created successfully! Redirecting...',
      server_error: 'Server error. Please try again later.',
      network_error: 'Network error. Please check your connection.',
      signup_failed: 'Signup failed. Please try again.'
    },
    login: {
      sign_in: 'Sign in to your account',
      email: 'Email address',
      password: 'Password',
      signing_in: 'Signing in...',
      invalid_credentials: 'Invalid email or password',
      login_failed: 'Login failed. Please try again.',
      create_account: "Don't have an account? Sign up"
    }
  },
  ar: {
    dashboard: {
      welcome: 'مرحباً',
      logout: 'تسجيل الخروج',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      my_courses: 'كورساتي',
      manage_users: 'إدارة المستخدمين',
      manage_courses: 'إدارة الكورسات'
    },
    signup: {
      create_account: 'إنشاء حساب',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirm_password: 'تأكيد كلمة المرور',
      creating_account: 'جاري إنشاء الحساب...',
      already_have_account: 'لديك حساب بالفعل؟ سجل الدخول',
      signup_success: 'تم إنشاء الحساب بنجاح! جاري التوجيه...',
      server_error: 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
      network_error: 'خطأ في الشبكة. يرجى التحقق من اتصالك.',
      signup_failed: 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.'
    },
    login: {
      sign_in: 'تسجيل الدخول إلى حسابك',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signing_in: 'جاري تسجيل الدخول...',
      invalid_credentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      login_failed: 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.',
      create_account: "ليس لديك حساب؟ سجل الآن"

    }
  }
};

const i18n = createI18n({
  legacy: false,   // 🚀 هذا يخلينا نستعمل Composition API
  globalInjection: true, // علشان نقدر نستعمل $t مباشرة في القوالب
  locale: 'en', // اللغة الافتراضية
  fallbackLocale: 'en',
  messages
});

createApp(App)
  .use(router)
  .use(i18n)
  .directive('auth', authDirective)
  .mixin(authMixin)
  .mount('#app');