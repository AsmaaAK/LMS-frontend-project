<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import services from '@/services';

export default {
  name: 'Dashboard',
  setup() {
    const user = ref({ name: '', roles: [] });
    const router = useRouter();

    // حساب أسماء الأدوار بشكل آمن
    const roleNames = computed(() => {
      if (!user.value.roles || !Array.isArray(user.value.roles)) {
        return '';
      }
      return user.value.roles.map(role => role.name).join(', ');
    });

    // التحقق من الأدوار بشكل آمن
    const hasRole = (roleName) => {
      if (!user.value.roles || !Array.isArray(user.value.roles)) {
        return false;
      }
      return user.value.roles.some(role => role.name === roleName);
    };

    const hasAnyRole = (roleNames) => {
      if (!user.value.roles || !Array.isArray(user.value.roles)) {
        return false;
      }
      return user.value.roles.some(role => roleNames.includes(role.name));
    };

    // دالة آمنة لقراءة بيانات المستخدم من localStorage
    const getSafeUserData = () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData || userData === 'undefined') return { name: '', roles: [] };
        
        const parsed = JSON.parse(userData);
        return {
          name: parsed.name || '',
          roles: Array.isArray(parsed.roles) ? parsed.roles : []
        };
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return { name: '', roles: [] };
      }
    };

    onMounted(async () => {
      // تعيين بيانات أولية من localStorage
      user.value = getSafeUserData();
      
      console.log('User data from localStorage:', user.value);
      
      try {
        const response = await services.AuthService.getUser();
        user.value = response.data;
        
        console.log('User data from API:', response.data);
        
        // تخزين بيانات المستخدم في localStorage بشكل آمن
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      }
    });

    const manageUsers = () => {
      router.push('/admin/users');
    };

    const manageCourses = () => {
      router.push('/instructor/courses');
    };

    const viewCourses = () => {
      router.push('/student/courses');
    };

    const handleLogout = async () => {
      try {
        await services.AuthService.logout();
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        // حتى إذا فشل logout، توجيه إلى login
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    };

    return {
      user,
      roleNames,
      hasRole,
      hasAnyRole,
      manageUsers,
      manageCourses,
      viewCourses,
      handleLogout
    };
  }
};
</script>