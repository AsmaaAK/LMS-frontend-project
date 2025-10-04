import { COURSE_LEVELS } from './constants'

// تنسيق التاريخ
export const formatDate = (dateString, locale = 'ar-SA') => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// تنسيق الوقت
export const formatTime = (dateString, locale = 'ar-SA') => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// تنسيق العملة
export const formatCurrency = (amount, currency = 'SAR') => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// تقصير النص
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  
  return text.substring(0, maxLength) + '...'
}

// الحصول على اسم المستوى
export const getLevelName = (level) => {
  const levels = {
    [COURSE_LEVELS.BEGINNER]: 'مبتدئ',
    [COURSE_LEVELS.INTERMEDIATE]: 'متوسط',
    [COURSE_LEVELS.ADVANCED]: 'متقدم'
  }
  
  return levels[level] || level
}

// التحقق من صحة البريد الإلكتروني
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// تحميل ملف
export const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

// تنزيل ملف
export const downloadFile = (url, filename) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// تأخير التنفيذ
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// إنشاء ID فريد
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}