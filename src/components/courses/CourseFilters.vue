<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
    <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
      <!-- شريط البحث -->
      <div class="flex-1 w-full lg:max-w-md">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="localFilters.search"
            type="text"
            placeholder="ابحث في الكورسات..."
            class="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            @input="handleFilterChange"
          />
        </div>
      </div>

      <!-- الفلاتر -->
      <div class="flex flex-wrap gap-3 w-full lg:w-auto">
        <!-- فلتر المستوى -->
        <select
          v-model="localFilters.level"
          @change="handleFilterChange"
          class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 min-w-32"
        >
          <option value="">جميع المستويات</option>
          <option value="beginner">مبتدئ</option>
          <option value="intermediate">متوسط</option>
          <option value="advanced">متقدم</option>
        </select>

        <!-- فلتر كورساتي (للمدرس) -->
        <button
          v-if="isInstructor"
          @click="toggleMineFilter"
          :class="[
            'px-4 py-3 border rounded-lg transition-all duration-200 font-medium flex items-center gap-2',
            localFilters.mine
              ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
          ]"
        >
          <UserIcon class="w-4 h-4" />
          دوراتي فقط
        </button>

        <!-- فلتر المسجلة (للطالب) -->
        <button
          v-if="isStudent"
          @click="toggleEnrolledFilter"
          :class="[
            'px-4 py-3 border rounded-lg transition-all duration-200 font-medium flex items-center gap-2',
            localFilters.enrolled
              ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
          ]"
        >
          <BookmarkIcon class="w-4 h-4" />
          المسجلة فقط
        </button>

        <!-- فلتر النشر (للمدرس والأدمن) -->
        <select
          v-if="isInstructor || isAdmin"
          v-model="localFilters.is_published"
          @change="handleFilterChange"
          class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 min-w-32"
        >
          <option value="">جميع الحالات</option>
          <option value="true">منشورة</option>
          <option value="false">مسودة</option>
        </select>

        <!-- زر مسح الفلاتر -->
        <button
          @click="clearFilters"
          class="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
        >
          <XMarkIcon class="w-4 h-4" />
          مسح الكل
        </button>

        <!-- زر إنشاء كورس جديد -->
        <router-link
          v-if="isInstructor || isAdmin"
          to="/courses/create"
          class="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md font-medium flex items-center gap-2"
        >
          <PlusIcon class="w-4 h-4" />
          إنشاء كورس
        </router-link>
      </div>
    </div>

    <!-- الفلاتر النشطة -->
    <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
      <span 
        v-for="(value, key) in activeFilters" 
        :key="key"
        class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
      >
        {{ getFilterLabel(key, value) }}
        <button @click="removeFilter(key)" class="hover:text-blue-900">
          <XMarkIcon class="w-3 h-3" />
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { 
  MagnifyingGlassIcon,
  UserIcon,
  BookmarkIcon,
  XMarkIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCoursesStore } from '@/stores/courses'

const authStore = useAuthStore()
const coursesStore = useCoursesStore()

const localFilters = ref({ ...coursesStore.filters })

const isStudent = computed(() => authStore.isStudent)
const isInstructor = computed(() => authStore.isInstructor)
const isAdmin = computed(() => authStore.isAdmin)

const hasActiveFilters = computed(() => {
  return Object.values(activeFilters.value).some(value => value !== '')
})

const activeFilters = computed(() => {
  const filters = { ...localFilters.value }
  delete filters.search // نستثني البحث من العرض
  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => 
      value !== '' && value !== false && value !== null
    )
  )
})

const filterLabels = {
  level: {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  },
  is_published: {
    true: 'منشورة',
    false: 'مسودة'
  },
  mine: {
    true: 'دوراتي'
  },
  enrolled: {
    true: 'المسجلة'
  }
}

// التوابع
const handleFilterChange = () => {
  coursesStore.updateFilters(localFilters.value)
  coursesStore.fetchCourses({ page: 1, ...localFilters.value })
}

const toggleMineFilter = () => {
  localFilters.value.mine = !localFilters.value.mine
  handleFilterChange()
}

const toggleEnrolledFilter = () => {
  localFilters.value.enrolled = !localFilters.value.enrolled
  handleFilterChange()
}

const clearFilters = () => {
  coursesStore.clearFilters()
  localFilters.value = { ...coursesStore.filters }
  coursesStore.fetchCourses({ page: 1 })
}

const removeFilter = (filterKey) => {
  localFilters.value[filterKey] = coursesStore.filters[filterKey]
  handleFilterChange()
}

const getFilterLabel = (key, value) => {
  if (filterLabels[key] && filterLabels[key][value]) {
    return filterLabels[key][value]
  }
  return value
}

// مراقبة تغييرات الفلاتر من الخارج
watch(() => coursesStore.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })
</script>