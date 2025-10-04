<template>
  <div class="chart-container">
    <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chartData = {
  labels: props.data.labels,
  datasets: [{
    data: props.data.datasets[0].data,
    backgroundColor: props.data.datasets[0].backgroundColor,
    borderWidth: 2,
    borderColor: '#fff'
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom',
      rtl: true,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: 'inherit'
        }
      }
    },
    tooltip: {
      rtl: true,
      callbacks: {
        label: function(context) {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${percentage}% (${value})`
        }
      }
    }
  }
}
</script>