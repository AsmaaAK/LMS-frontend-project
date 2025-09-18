<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        إدارة المستخدمين
      </h1>
      <button 
        @click="showCreateModal = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        إضافة مستخدم
      </button>
    </div>

    <!-- إحصائيات المستخدمين -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 class="text-lg font-semibold">إجمالي المستخدمين</h3>
        <p class="text-2xl">{{ statistics.total_users || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 class="text-lg font-semibold">المشرفين</h3>
        <p class="text-2xl">{{ statistics.admin_users || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 class="text-lg font-semibold">المدربين</h3>
        <p class="text-2xl">{{ statistics.instructor_users || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 class="text-lg font-semibold">الطلاب</h3>
        <p class="text-2xl">{{ statistics.student_users || 0 }}</p>
      </div>
    </div>

    <!-- جدول المستخدمين -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              الاسم
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              البريد الإلكتروني
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              الأدوار
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              الإجراءات
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-for="role in user.roles" :key="role.id" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-1">
                {{ role.name }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-3">تعديل</button>
              <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- نموذج إضافة/تعديل مستخدم -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <h3 class="text-lg font-medium mb-4">
          {{ showCreateModal ? 'إضافة مستخدم جديد' : 'تعديل المستخدم' }}
        </h3>
        
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">الاسم</label>
            <input v-model="form.name" type="text" required class="w-full px-3 py-2 border rounded">
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <input v-model="form.email" type="email" required class="w-full px-3 py-2 border rounded">
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">كلمة المرور</label>
            <input v-model="form.password" type="password" :required="showCreateModal" class="w-full px-3 py-2 border rounded">
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">تأكيد كلمة المرور</label>
            <input v-model="form.password_confirmation" type="password" :required="showCreateModal" class="w-full px-3 py-2 border rounded">
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">الدور</label>
            <select v-model="form.role_id" required class="w-full px-3 py-2 border rounded">
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">
              {{ showCreateModal ? 'إضافة' : 'تحديث' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import services from '@/services';

export default {
  name: 'UserManagement',
  setup() {
    const users = ref([]);
    const roles = ref([]);
    const statistics = ref({});
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const form = ref({
      id: null,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role_id: ''
    });

    const loadUsers = async () => {
      try {
        const response = await services.AuthService.get('/users');
        users.value = response.data.data;
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    const loadRoles = async () => {
      try {
        const response = await services.AuthService.get('/roles');
        roles.value = response.data;
      } catch (error) {
        console.error('Failed to load roles:', error);
      }
    };

    const loadStatistics = async () => {
      try {
        const response = await services.AuthService.get('/users/statistics');
        statistics.value = response.data.data;
      } catch (error) {
        console.error('Failed to load statistics:', error);
      }
    };

    const submitForm = async () => {
      try {
        if (showCreateModal.value) {
          await services.AuthService.post('/users', form.value);
        } else {
          await services.AuthService.put(`/users/${form.value.id}`, form.value);
        }
        
        closeModal();
        loadUsers();
        loadStatistics();
      } catch (error) {
        console.error('Failed to save user:', error);
      }
    };

    const editUser = (user) => {
      form.value = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role_id: user.roles[0]?.id
      };
      showEditModal.value = true;
    };

    const deleteUser = async (user) => {
      if (confirm(`هل أنت متأكد من حذف المستخدم ${user.name}؟`)) {
        try {
          await services.AuthService.delete(`/users/${user.id}`);
          loadUsers();
          loadStatistics();
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      }
    };

    const closeModal = () => {
      showCreateModal.value = false;
      showEditModal.value = false;
      form.value = {
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: ''
      };
    };

    onMounted(() => {
      loadUsers();
      loadRoles();
      loadStatistics();
    });

    return {
      users,
      roles,
      statistics,
      showCreateModal,
      showEditModal,
      form,
      submitForm,
      editUser,
      deleteUser,
      closeModal
    };
  }
};
</script>