// أدوار المستخدمين
export const USER_ROLES = {
  STUDENT: 'student',
  // توحيد اسم دور المعلم إلى "instructor" مع الحفاظ على التوافق
  TEACHER: 'teacher',
  INSTRUCTOR: 'teacher',
  ADMIN: 'admin',
  MANAGER: 'manager'
}

// مستويات الكورسات
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
}

// حالات التسليم
export const SUBMISSION_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  OVERDUE: 'overdue'
}

// أنواع الإشعارات
export const NOTIFICATION_TYPES = {
  GRADE: 'grade',
  DEADLINE: 'deadline',
  MESSAGE: 'message',
  SYSTEM: 'system',
  COURSE: 'course'
}

// إعدادات التطبيق
export const APP_CONFIG = {
  ITEMS_PER_PAGE: 10,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.mp4', '.mov'],
  DEFAULT_LANGUAGE: 'ar',
  SUPPORTED_LANGUAGES: ['ar', 'en']
}