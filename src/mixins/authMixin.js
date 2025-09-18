export default {
  methods: {
    hasRole(role) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.roles && user.roles.some(r => r.name === role);
    },
    
    hasAnyRole(roles) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.roles && user.roles.some(r => roles.includes(r.name));
    },
    
    hasPermission(permission) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      // يمكنك تحسين هذا المنطق بناءً على هيكل الصلاحيات
      return user.roles && user.roles.some(role => 
        role.permissions && role.permissions.some(p => p.name === permission)
      );
    }
  }
};