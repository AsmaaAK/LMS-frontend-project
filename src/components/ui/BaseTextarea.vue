<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rows="rows"
        :class="[
          'block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500',
          'dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        ]"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      
      <div v-if="error" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
      </div>
    </div>
    
    <p v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    <p v-else-if="helper" class="text-sm text-gray-500 dark:text-gray-400">{{ helper }}</p>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
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
  helper: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 3
  },
  id: {
    type: String,
    default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`
  }
})

defineEmits(['update:modelValue'])
</script>