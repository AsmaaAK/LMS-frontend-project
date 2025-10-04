import { isValidEmail } from './helpers'

export const validationRules = {
  required: (value) => ({
    valid: !!value && value.toString().trim().length > 0,
    message: 'هذا الحقل مطلوب'
  }),

  email: (value) => ({
    valid: isValidEmail(value),
    message: 'البريد الإلكتروني غير صحيح'
  }),

  minLength: (value, length) => ({
    valid: value && value.length >= length,
    message: `يجب أن يكون طول الحقل ${length} أحرف على الأقل`
  }),

  maxLength: (value, length) => ({
    valid: !value || value.length <= length,
    message: `يجب أن يكون طول الحقل ${length} أحرف كحد أقصى`
  }),

  password: (value) => ({
    valid: value && value.length >= 8,
    message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
  }),

  confirmPassword: (password, confirmPassword) => ({
    valid: password === confirmPassword,
    message: 'كلمات المرور غير متطابقة'
  }),

  number: (value) => ({
    valid: !isNaN(value) && !isNaN(parseFloat(value)),
    message: 'يجب أن يكون رقماً'
  }),

  minValue: (value, min) => ({
    valid: parseFloat(value) >= min,
    message: `يجب أن تكون القيمة ${min} على الأقل`
  }),

  maxValue: (value, max) => ({
    valid: parseFloat(value) <= max,
    message: `يجب أن تكون القيمة ${max} كحد أقصى`
  })
}

export const validateField = (value, rules) => {
  for (const rule of rules) {
    const result = rule(value)
    if (!result.valid) {
      return result.message
    }
  }
  return null
}

export const validateForm = (formData, validationSchema) => {
  const errors = {}
  
  for (const [field, rules] of Object.entries(validationSchema)) {
    const error = validateField(formData[field], rules)
    if (error) {
      errors[field] = error
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}