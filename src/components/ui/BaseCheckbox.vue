<template>
  <div class="flex items-center">
    <input
      :id="id"
      :checked="modelValue"
      :required="required"
      :disabled="disabled"
      type="checkbox"
      :class="[
        'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
        error ? 'border-red-500' : ''
      ]"
      v-bind="$attrs"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label v-if="label" :for="id" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      {{ label }}
    </label>
    
    <p v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`
  }
})

defineEmits(['update:modelValue'])
</script>