<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">إدارة الطلاب</h1>
    </div>

    <!-- إحصائيات سريعة -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <UserGroupIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
            <p class="text-2xl font-bold text-gray-900">{{ statistics.totalStudents }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <BookOpenIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">مسجلين في دوراتي</p>
            <p class="text-2xl font-bold text-gray-900">{{ statistics.enrolledStudents }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- البحث والتصفية -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ابحث عن طالب..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          v-model="selectedCourse"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">جميع الدورات</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">
            {{ course.title }}
          </option>
        </select>
      </div>
    </div>

    <!-- جدول الطلاب -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الطالب
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                البريد الإلكتروني
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الدورات المسجلة
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                آخر نشاط
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="student in filteredStudents" :key="student.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon class="w-5 h-5 text-gray-600" />
                  </div>
                  <div class="mr-4">
                    <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ student.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ student.enrolled_courses_count }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ formatDate(student.last_activity) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewStudentProgress(student)"
                  class="text-blue-600 hover:text-blue-900 ml-4"
                >
                  عرض التقدم
                </button>
                <button
                  @click="contactStudent(student)"
                  class="text-green-600 hover:text-green-900"
                >
                  مراسلة
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- لا توجد طلاب -->
      <div v-if="filteredStudents.length === 0" class="text-center py-12">
        <UserGroupIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">لا توجد طلاب</h3>
        <p class="mt-1 text-sm text-gray-500">لم يسجل أي طالب في دوراتك بعد.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  UserGroupIcon, 
  BookOpenIcon, 
  UserIcon 
} from '@heroicons/vue/24/outline'

// البيانات
const students = ref([])
const courses = ref([])
const searchQuery = ref('')
const selectedCourse = ref('')
const statistics = ref({
  totalStudents: 0,
  enrolledStudents: 0
})

// الطلاب المفلترين
const filteredStudents = computed(() => {
  let filtered = students.value

  if (searchQuery.value) {
    filtered = filtered.filter(student => 
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCourse.value) {
    filtered = filtered.filter(student => 
      student.courses.some(course => course.id === selectedCourse.value)
    )
  }

  return filtered
})

// التوابع
const loadStudents = async () => {
  try {
    // محاكاة بيانات - استبدل هذا ب API call
    students.value = [
      {
        id: 1,
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        enrolled_courses_count: 3,
        last_activity: new Date().toISOString(),
        courses: [{ id: 1, title: 'دورة Vue.js' }]
      },
      {
        id: 2,
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        enrolled_courses_count: 2,
        last_activity: new Date(Date.now() - 86400000).toISOString(),
        courses: [{ id: 2, title: 'دورة Laravel' }]
      }
    ]

    statistics.value.totalStudents = students.value.length
    statistics.value.enrolledStudents = students.value.reduce((total, student) => 
      total + student.enrolled_courses_count, 0
    )
  } catch (error) {
    console.error('Error loading students:', error)
  }
}

const loadCourses = async () => {
  try {
    // محاكاة بيانات - استبدل هذا ب API call
    courses.value = [
      { id: 1, title: 'دورة Vue.js' },
      { id: 2, title: 'دورة Laravel' },
      { id: 3, title: 'دورة React' }
    ]
  } catch (error) {
    console.error('Error loading courses:', error)
  }
}

const viewStudentProgress = (student) => {
  console.log('View progress for:', student.name)
  // التنقل لصفحة تقدم الطالب
}

const contactStudent = (student) => {
  console.log('Contact student:', student.email)
  // فتح نموذج المراسلة
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG')
}

// التحميل الأولي
onMounted(() => {
  loadStudents()
  loadCourses()
})
</script>