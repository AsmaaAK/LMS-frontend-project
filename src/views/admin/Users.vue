<template>
  <div class="admin-users">
    <h1>إدارة المستخدمين</h1>
    <!-- سيحتوي على مكون UserManagement من components -->
    <UserManagement />
  </div>
</template>

<script>
import UserManagement from '@/components/admin/UserManagement.vue'

export default {
  name: 'AdminUsers',
  components: {
    UserManagement
  }
}
</script>