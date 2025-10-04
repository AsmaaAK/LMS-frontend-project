<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📊 تقدم الطالب</h1>
    
    <ul>
      <li v-for="course in courses" :key="course.id" class="mb-2">
        {{ course.name }} - {{ course.progress }}%
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "StudentProgress",
  data() {
    return {
      courses: [
        { id: 1, name: "JavaScript Basics", progress: 70 },
        { id: 2, name: "Vue.js Advanced", progress: 45 },
        { id: 3, name: "Database Design", progress: 90 }
      ]
    }
  }
}
</script>
