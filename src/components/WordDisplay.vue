<template>
  <div class="word-display">
      <span 
        v-for="(char, index) in currentWord" 
        :key="index" 
        :class="getCharacterClass(index)"
        class="word-character"
      >
          {{ char }}
      </span>
  </div>
</template>

<script setup>
defineProps({
  currentWord: {
    type: String,
    required: true
  },
  getCharacterClass: {
    type: Function,
    required: true
  }
})
</script>