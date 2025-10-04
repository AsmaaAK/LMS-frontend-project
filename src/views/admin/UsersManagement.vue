<template>
  <div class="space-y-6">
    <!-- رأس الصفحة -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">إدارة المستخدمين</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">إدارة جميع مستخدمي النظام وإضافة مستخدمين جدد</p>
      </div>
      <button 
        @click="openCreateModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>إضافة مستخدم</span>
      </button>
    </div>

    <!-- حالة التحميل -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="text-gray-600 dark:text-gray-400 mt-2">جاري تحميل البيانات...</p>
    </div>

    <!-- حالة الخطأ -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>خطأ في تحميل البيانات: {{ error }}</p>
      <button @click="loadUsers" class="mt-2 bg-red-600 text-white px-4 py-2 rounded">
        إعادة المحاولة
      </button>
    </div>

    <!-- المحتوى الرئيسي -->
    <div v-else>
      <!-- إحصائيات سريعة -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">إجمالي المستخدمين</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalUsers }}</p>
            </div>
            <div class="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">الطلاب</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.students }}</p>
            </div>
            <div class="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">المعلمين</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.instructors }}</p>
            </div>
            <div class="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">المديرين</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.admins }}</p>
            </div>
            <div class="h-12 w-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- فلترة وبحث -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">بحث</label>
            <input 
              v-model="filters.search"
              type="text"
              placeholder="ابحث بالاسم أو البريد الإلكتروني..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              @input="handleFilter"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الدور</label>
            <select 
              v-model="filters.role"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              @change="handleFilter"
            >
              <option value="">جميع الأدوار</option>
              <option value="student">طالب</option>
              <option value="instructor">معلم</option>
              <option value="admin">مدير</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
            <select 
              v-model="filters.status"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              @change="handleFilter"
            >
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </div>
      </div>

      <!-- جدول المستخدمين -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  المستخدم
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الدور
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الحالة
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  تاريخ التسجيل
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <!-- 🔹 إضافة التحقق من وجود users -->
              <tr v-if="users && users.length > 0" v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {{ getUserInitials(user.name) }}
                      </div>
                    </div>
                    <div class="mr-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="getRoleBadgeClass(user.role)">
                    {{ getRoleText(user.role) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'">
                    {{ user.status === 'active' ? 'نشط' : 'غير نشط' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2 space-x-reverse">
                    <button 
                      @click="openEditModal(user)"
                      class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="openDeleteModal(user)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 🔹 تحديث حالة عدم وجود مستخدمين -->
        <div v-if="!users || users.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
          </svg>
          <p class="mt-4 text-gray-600 dark:text-gray-400">لا توجد مستخدمين</p>
        </div>
      </div>
    </div>

    <!-- نموذج إضافة/تعديل مستخدم -->
    <UserModal 
      v-if="showUserModal"
      :user="selectedUser"
      :show="showUserModal"
      @close="closeUserModal"
      @saved="handleUserSaved"
    />

    <!-- نموذج تأكيد الحذف -->
    <ConfirmModal 
      v-if="showDeleteModal"
      :show="showDeleteModal"
      title="تأكيد الحذف"
      :message="`هل أنت متأكد من حذف المستخدم ${selectedUser?.name}؟`"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import UserService from '@/services/userService'
import { useAuthStore } from '@/stores/auth'
import UserModal from '@/components/admin/UserModal.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'

// 🔹 تهيئة المتغيرات بقيم افتراضية
const users = ref([]) 
const loading = ref(false)
const error = ref(null)
const selectedUser = ref(null)
const showUserModal = ref(false)
const showDeleteModal = ref(false)

const stats = ref({
  totalUsers: 0,
  students: 0,
  instructors: 0,
  admins: 0
})

const filters = ref({
  search: '',
  role: '',
  status: ''
})

const authStore = useAuthStore()

// 🔹 الدوال المساعدة
const getUserInitials = (name) => {
  if (!name) return '??'
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

const getRoleBadgeClass = (role) => {
  const classes = {
    'admin': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'teacher': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    // 'instructor': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'student': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'manager': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  }
  return classes[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
}

const getRoleText = (role) => {
  const roles = {
    'admin': 'مدير',
    'teacher': 'معلم',
    // 'instructor': 'معلم',
    'student': 'طالب',
    'manager': 'مدير'
  }
  return roles[role] || role
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ar-EG').format(date)
}

// 🔹 دوال إدارة النماذج
const openCreateModal = () => {
  selectedUser.value = null
  showUserModal.value = true
}

const openEditModal = (user) => {
  selectedUser.value = { ...user }
  showUserModal.value = true
}

const openDeleteModal = (user) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedUser.value = null
}

const handleUserSaved = () => {
  closeUserModal()
  loadUsers()
  loadStats()
}

const confirmDelete = async () => {
  if (!selectedUser.value) return
  
  try {
    await UserService.deleteUser(selectedUser.value.id)
    closeDeleteModal()
    
    // إعادة تحميل البيانات
    await loadUsers()
    await loadStats()
    
    // إظهار رسالة نجاح
    console.log('User deleted successfully')
  } catch (err) {
    console.error('Failed to delete user:', err)
    error.value = err.response?.data?.message || 'فشل في حذف المستخدم'
    
    // 🔹 معالجة أخطاء محددة
    if (err.response?.status === 419) {
      error.value = 'مشكلة في المصادقة، يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى'
    } else if (err.response?.status === 403) {
      error.value = 'ليس لديك صلاحية لحذف المستخدمين'
    }
  }
}

// 🔹 دالة debounce مخصصة
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 🔹 تحديث loadUsers لمعالجة الأخطاء
const loadUsers = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await UserService.getUsers(filters.value)
    // 🔹 التحقق من وجود البيانات
    users.value = response.data?.data || response.data || []
    console.log('Users loaded:', users.value)
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'حدث خطأ في تحميل البيانات'
    console.error('Failed to load users:', err)
    users.value = []
  } finally {
    loading.value = false
  }
}

// 🔹 تحديث loadStats لمعالجة الأخطاء
const loadStats = async () => {
  try {
    const response = await UserService.getUserStats()
    const statsData = response.data?.data || response.data || {}
    stats.value = {
      totalUsers: statsData.total_users || statsData.totalUsers || 0,
      students: statsData.student_users || statsData.students || 0,
      instructors: statsData.instructor_users || statsData.instructors || 0,
      admins: statsData.admin_users || statsData.admins || 0
    }
  } catch (err) {
    console.error('Failed to load stats:', err)
    // استخدام بيانات افتراضية آمنة
    const safeUsers = users.value || []
    stats.value = {
      totalUsers: safeUsers.length,
      students: safeUsers.filter(u => u.role === 'student' || u.roles?.[0]?.name === 'student').length,
      instructors: safeUsers.filter(u => u.role === 'teacher' || u.roles?.[0]?.name === 'teacher').length,
      admins: safeUsers.filter(u => u.role === 'admin' || u.roles?.[0]?.name === 'admin').length
    }
  }
}

// 🔹 الفلترة مع debounce
const handleFilter = debounce(() => {
  console.log('Applying filters:', filters.value)
  loadUsers()
}, 500)

// 🔹 إضافة watcher للبحث
watch(() => filters.value.search, (newSearch) => {
  if (newSearch !== undefined) {
    handleFilter()
  }
})

// 🔹 إضافة watcher للدور
watch(() => filters.value.role, (newRole) => {
  if (newRole !== undefined) {
    handleFilter()
  }
})

// 🔹 الـ lifecycle hooks
onMounted(() => {
  console.log('Current user role:', authStore.currentRole)
  console.log('Current user:', authStore.user)
  console.log('Component mounted - loading users...')
  loadUsers()
  loadStats()
})

// 🔹 الـ watchers
watch(() => filters.value, () => {
  handleFilter()
}, { deep: true })
</script>