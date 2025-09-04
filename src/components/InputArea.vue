<template>
  <div class="input-area">
      <input
          ref="inputElement"
          class="typing-input"
          type="text"
          @input="$emit('input', $event)"
          @keydown="$emit('keydown', $event)"
          @keyup="$emit('keyup', $event)"
          @compositionstart="$emit('compositionstart', $event)"
          @compositionend="$emit('compositionend', $event)"
          placeholder="Type the word above..."
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
      />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['input', 'keydown', 'keyup', 'compositionstart', 'compositionend'])

const inputElement = ref(null)

const getInputElement = () => inputElement.value

defineExpose({
  getInputElement
})
</script>