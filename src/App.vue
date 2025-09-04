<template>
  <div id="app">
    <PracticeScreen 
      v-if="!gameCompleted" 
      @game-completed="handleGameCompleted"
    />
    <ResultsScreen 
      v-else 
      :correct-chars="correctChars"
      :total-chars="totalChars"
      :time-elapsed="timeElapsed"
      @restart="restartGame" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PracticeScreen from './components/PracticeScreen.vue'
import ResultsScreen from './components/ResultsScreen.vue'

const gameCompleted = ref(false)
const correctChars = ref(0)
const totalChars = ref(0)
const startTime = ref(null)
const endTime = ref(null)

const timeElapsed = computed(() => {
  if (!startTime.value || !endTime.value) return 60
  return Math.round((endTime.value - startTime.value) / 1000)
})

const handleGameCompleted = (stats) => {
  gameCompleted.value = true
  correctChars.value = stats.correctChars
  totalChars.value = stats.totalChars
  startTime.value = stats.startTime
  endTime.value = Date.now()
}

const restartGame = () => {
  gameCompleted.value = false
  correctChars.value = 0
  totalChars.value = 0
  startTime.value = null
  endTime.value = null
}
</script>