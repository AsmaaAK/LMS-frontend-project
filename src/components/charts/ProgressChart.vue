<template>
  <div class="chart-container">
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  height: {
    type: Number,
    default: 300
  }
})

const chartData = {
  labels: props.data.labels,
  datasets: props.data.datasets.map(dataset => ({
    ...dataset,
    borderRadius: 4,
    borderSkipped: false,
  }))
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      rtl: true,
      labels: {
        usePointStyle: true,
        padding: 15
      }
    },
    tooltip: {
      rtl: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y}%`
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        maxRotation: 45
      }
    },
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function(value) {
          return value + '%'
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: v-bind(height + 'px');
  direction: ltr; /* Chart.js requires LTR */
}
</style>