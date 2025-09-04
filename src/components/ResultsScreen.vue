<template>
  <div class="results-screen">
    <div class="results-container">
      <h1 class="results-title">練習完了!</h1>
      
      <div class="results-stats">
        <div class="result-item">
          <div class="result-value">{{ wpm }}</div>
          <div class="result-label">WPM</div>
        </div>
        <div class="result-item">
          <div class="result-value">{{ accuracy }}%</div>
          <div class="result-label">Accuracy</div>
        </div>
      </div>
      
      <div class="results-actions">
        <button @click="$emit('restart')" class="btn-primary">
          もう一度
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  correctChars: {
    type: Number,
    default: 0
  },
  totalChars: {
    type: Number,
    default: 0
  },
  timeElapsed: {
    type: Number,
    default: 60
  }
})

defineEmits(['restart'])

const wpm = computed(() => {
  if (props.timeElapsed === 0) return 0
  return Math.round((props.correctChars / 5) / (props.timeElapsed / 60))
})

const accuracy = computed(() => {
  if (props.totalChars === 0) return 100
  return Math.round((props.correctChars / props.totalChars) * 100)
})
</script>