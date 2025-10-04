<template>
  
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- شريط التنقل -->
    <nav class="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- الشعار -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                </svg>
              </div>
              <span class="mr-3 text-xl font-bold text-gray-900 dark:text-white">EduPlatform</span>
            </router-link>
          </div>

          <!-- روابط التنقل -->
          <div class="hidden md:flex items-center space-x-8">
            <a 
              v-for="item in navigation" 
              :key="item.name" 
              href="#" 
              @click="handleNavigation(item)"
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              :class="{ 'text-blue-600 dark:text-blue-400': activeSection === item.section }">
              {{ item.name }}
            </a>
          </div>

          <!-- أزرار العمل -->
          <div class="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <router-link to="/login" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              تسجيل الدخول
            </router-link>
            <router-link to="/register" 
                class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              ابدأ الآن
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- القسم الرئيسي (Hero) -->
    <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- النص -->
          <div class="text-center lg:text-right">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                طور مهاراتك
              </span>
              <br>
              <span class="text-gray-900 dark:text-white">بأفضل الطرق التعليمية</span>
            </h1>
            <p class="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              انضم إلى منصتنا التعليمية المتطورة واكتشف عالمًا من المعرفة. 
              دورات احترافية، مدربون خبراء، وتجربة تعلم فريدة من نوعها.
            </p>
            <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <router-link to="/register" 
                           class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                ابدأ رحلتك التعليمية
              </router-link>
              <button @click="scrollToFeatures" 
                      class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200">
                اكتشف المميزات
              </button>
            </div>
            
            <!-- الإحصائيات -->
            <div class="mt-16 grid grid-cols-3 gap-8">
              <div v-for="stat in stats" :key="stat.label" class="text-center">
                <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}+</div>
                <div class="text-gray-600 dark:text-gray-400 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- الصورة/الفيديو -->
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                   alt="التعلم عبر الإنترنت" class="w-full h-auto">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <!-- تأثيرات متحركة -->
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- بطاقات عائمة -->
            <div class="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div class="mr-3">
                  <div class="font-semibold text-gray-900 dark:text-white">شهادة معتمدة</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">100% معترف بها</div>
                </div>
              </div>
            </div>
            
            <div class="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <div class="mr-3">
                  <div class="font-semibold text-gray-900 dark:text-white">تعلم تفاعلي</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">تجربة غامرة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم المميزات -->
    <section id="features" ref="featuresSection" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">مميزات منصتنا</h2>
          <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">اكتشف ما يجعلنا مختلفين</p>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" 
               class="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <!-- استخدام SVG مباشرة -->
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.iconPath"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم الدورات -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">أشهر الدورات</h2>
          <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">اختر من بين أفضل الدورات التعليمية</p>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="course in featuredCourses" :key="course.id"
               class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative">
              <img :src="course.image" :alt="course.title" class="w-full h-48 object-cover">
              <div class="absolute top-4 left-4">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ course.category }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ course.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ course.description }}</p>
              
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <img :src="course.instructorAvatar" :alt="course.instructor" class="w-8 h-8 rounded-full">
                  <span class="mr-2 text-sm text-gray-600 dark:text-gray-400">{{ course.instructor }}</span>
                </div>
                <div class="text-yellow-500 flex items-center">
                  <span>{{ course.rating }}</span>
                  <svg class="w-4 h-4 fill-current ml-1" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ course.price }}</span>
                <router-link to="/register" 
                             class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  انضم الآن
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم آراء العملاء -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">ماذا يقول طلابنا؟</h2>
          <p class="text-xl opacity-90">انضم إلى آلاف الطلاب الراضين عن تجربتهم</p>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name"
               class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
            <div class="flex items-center mb-4">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full">
              <div class="mr-3">
                <div class="font-semibold">{{ testimonial.name }}</div>
                <div class="text-sm opacity-80">{{ testimonial.role }}</div>
              </div>
            </div>
            <p class="opacity-90 leading-relaxed">"{{ testimonial.comment }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم CTA -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          مستعد لبدء رحلتك التعليمية؟
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          انضم إلى منصتنا اليوم وابدأ في تطوير مهاراتك مع أفضل المدربين
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/register" 
                       class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            ابدأ مجانًا
          </router-link>
          <button @click="scrollToFeatures" 
                  class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200">
            تعرف أكثر
          </button>
        </div>
      </div>
    </section>

    <!-- التذييل -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                </svg>
              </div>
              <span class="mr-3 text-xl font-bold">EduPlatform</span>
            </div>
            <p class="text-gray-400">منصة التعليم الرائدة في العالم العربي لتطوير المهارات وبناء المستقبل.</p>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">روابط سريعة</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" @click="scrollToTop" class="hover:text-white transition-colors cursor-pointer">الرئيسية</a></li>
              <li><a href="#features" @click="scrollToFeatures" class="hover:text-white transition-colors cursor-pointer">المميزات</a></li>
              <li><a href="#" @click="handleNavigation({type: 'route', to: '/courses'})" class="hover:text-white transition-colors cursor-pointer">الدورات</a></li>
              <li><a href="#" @click="handleNavigation({type: 'route', to: '/about'})" class="hover:text-white transition-colors cursor-pointer">عن المنصة</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">الدعم</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" @click="handleNavigation({type: 'route', to: '/help'})" class="hover:text-white transition-colors cursor-pointer">المساعدة</a></li>
              <li><a href="#" @click="handleNavigation({type: 'route', to: '/faq'})" class="hover:text-white transition-colors cursor-pointer">الأسئلة الشائعة</a></li>
              <li><a href="#" @click="handleNavigation({type: 'route', to: '/contact'})" class="hover:text-white transition-colors cursor-pointer">اتصل بنا</a></li>
              <li><a href="#" @click="handleNavigation({type: 'route', to: '/terms'})" class="hover:text-white transition-colors cursor-pointer">الشروط والأحكام</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">تابعنا</h3>
            <div class="flex space-x-4">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" 
                 class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="social.iconPath"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EduPlatform. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const router = useRouter()
const featuresSection = ref(null)
const activeSection = ref('home')

const navigation = [
  { name: 'الرئيسية', type: 'scroll', section: 'home' },
  { name: 'المميزات', type: 'scroll', section: 'features' },
  { name: 'الدورات', type: 'route', to: '/courses' },
  { name: 'عن المنصة', type: 'route', to: '/about' },
  { name: 'اتصل بنا', type: 'route', to: '/contact' }
]

const stats = [
  { value: '50K', label: 'طالب مسجل' },
  { value: '500', label: 'دورة تدريبية' },
  { value: '100', label: 'مدرب محترف' }
]

const features = [
  {
    iconPath: "M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h5a2 2 0 012 2z",
    title: 'محتوى تعليمي متميز',
    description: 'دورات تعليمية شاملة ومحدثة بأفضل الطرق التعليمية الحديثة'
  },
  {
    iconPath: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    title: 'فيديوهات عالية الجودة',
    description: 'جودة عالية للفيديوهات مع إمكانية التحكم بالسرعة والترجمة'
  },
  {
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: 'شهادات معتمدة',
    description: 'احصل على شهادات معتمدة بعد إتمام كل دورة بنجاح'
  },
  {
    iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    title: 'دعم فني متكامل',
    description: 'فريق دعم فني متاح على مدار الساعة لمساعدتك في رحلتك التعليمية'
  },
  {
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    title: 'تعلم من أي مكان',
    description: 'ادخل إلى منصتك التعليمية من أي جهاز وفي أي وقت'
  },
  {
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: 'مجتمع تفاعلي',
    description: 'انضم إلى مجتمع من المتعلمين وتبادل الخبرات والمعرفة'
  }
]

const featuredCourses = [
  {
    id: 1,
    title: 'تعلم JavaScript المتقدم',
    description: 'احترف JavaScript من الصفر إلى الاحتراف مع مشاريع عملية',
    category: 'برمجة',
    instructor: 'أحمد محمد',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: '4.9',
    price: 'مجاني',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'تصميم واجهات المستخدم',
    description: 'تعلم أحدث تقنيات UI/UX Design مع مشاريع عملية',
    category: 'تصميم',
    instructor: 'فاطمة علي',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: '4.8',
    price: '₪199',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'التسويق الرقمي الشامل',
    description: 'أتقن استراتيجيات التسويق الرقمي لتعزيز وجودك على الإنترنت',
    category: 'تسويق',
    instructor: 'محمد خالد',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: '4.7',
    price: '₪299',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'
  }
]

const testimonials = [
  {
    name: 'سارة أحمد',
    role: 'مطورة ويب',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    comment: 'ساعدتني المنصة في الانتقال من مبتدئة إلى مطورة محترفة في وقت قياسي'
  },
  {
    name: 'خالد محمد',
    role: 'مصمم جرافيك',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    comment: 'المحتوى المقدم ممتاز والمدربون محترفون جداً، أنصح الجميع بالانضمام'
  },
  {
    name: 'لمى عبدالله',
    role: 'طالبة',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    comment: 'التجربة رائعة، المرونة في التعلم جعلتني أستفيد بشكل كبير'
  }
]

const socialLinks = [
  { 
    name: 'Twitter', 
    url: '#', 
    iconPath: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
  },
  { 
    name: 'Facebook', 
    url: '#', 
    iconPath: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
  },
  { 
    name: 'LinkedIn', 
    url: '#', 
    iconPath: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"
  },
  { 
    name: 'YouTube', 
    url: '#', 
    iconPath: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02V8.98l5.75 3.02-5.75 3.02z"
  }
]

const handleNavigation = (item) => {
  if (item.type === 'route') {
    router.push(item.to)
  } else if (item.type === 'scroll') {
    if (item.section === 'features') {
      scrollToFeatures()
    } else if (item.section === 'home') {
      scrollToTop()
    }
  }
}

const scrollToFeatures = () => {
  const featuresElement = document.getElementById('features')
  if (featuresElement) {
    featuresElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  const featuresElement = document.getElementById('features')
  if (featuresElement) {
    const rect = featuresElement.getBoundingClientRect()
    if (rect.top <= 100 && rect.bottom >= 100) {
      activeSection.value = 'features'
    } else {
      activeSection.value = 'home'
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // إضافة تأثيرات scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.feature-card, .course-card').forEach(el => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* تأثيرات scroll suave */
html {
  scroll-behavior: smooth;
}

/* تحسينات للعربية */
[dir="rtl"] .text-right {
  text-align: right;
}

[dir="rtl"] .mr-3 {
  margin-left: 0.75rem;
  margin-right: 0;
}

[dir="rtl"] .ml-1 {
  margin-right: 0.25rem;
  margin-left: 0;
}

/* تحسينات للروابط */
a {
  cursor: pointer;
}
</style>