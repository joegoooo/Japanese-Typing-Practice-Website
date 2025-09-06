<template>
  <div 
    class="practice-screen"
    tabindex="0"
    @input="onInput"
    @keydown.prevent="onKeyDown"
    @keyup="onKeyUp"
  >
    <div class="practice-container">
      <!-- Header -->
      <div class="practice-header">
          <div class="app-title">日本語タイピング</div>
          <div class="word-counter">{{ wordsCompleted }}/{{ JAPANESE_WORDS.length }}</div>
      </div>

      <!-- Main typing area -->
      <div class="typing-section">
          <WordDisplay 
            :current-word="currentWord"
            :get-character-class="getCharacterClass"
          />

          <!-- <InputArea
            ref="inputAreaRef"
            @input="onInput"
            @keydown="onKeyDown"
            @keyup="onKeyUp"
            @compositionstart="onCompositionStart"
            @compositionend="onCompositionEnd"
          /> -->
      </div>

      <!-- Keyboard -->
      <KeyboardDisplay
        v-if="showJapaneseLayout"
        :active-key="activeKey"
        :next-key="nextKey"
        :row1="row1"
        :row2="row2"
        :row3="row3"
        :row4="row4"
      />

      <!-- Toggle button -->
      <div class="keyboard-toggle">
          <button @click="toggleKeyboardLayout" class="btn-secondary">
              {{ showJapaneseLayout ? 'Hide' : 'Show' }} Keyboard
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch } from 'vue'
import WordDisplay from './WordDisplay.vue'
import InputArea from './InputArea.vue'
import KeyboardDisplay from './KeyboardDisplay.vue'
import { useGameState } from '../composables/useGameState.js'
import { useKeyboard } from '../composables/useKeyboard.js'
import { useInputHandler } from '../composables/useInputHandler.js'
import { JAPANESE_WORDS } from '../data/dictionary.js'

const emit = defineEmits(['game-completed'])

// Composables
const {
    currentWord,
    currentTypingSequence,
    userInput,
    charIndex,
    wordsCompleted,
    totalChars,
    correctChars,
    gameEnded,
    isWordComplete,
    dakutenIndex,
    startTime,
    getCharacterClass,
    nextWord,
    startNewRound
} = useGameState()

const {
    activeKey,
    isShiftPressed,
    showJapaneseLayout,
    row1,
    row2,
    row3,
    row4,
    nextKey,
    toggleKeyboardLayout
} = useKeyboard(currentTypingSequence, charIndex, dakutenIndex)

const {
    isComposing,
    processInput,
    handleKeyDown,
    handleKeyUp,
} = useInputHandler()

// Refs
const inputAreaRef = ref(null)

// Event handlers
const onInput = (event) => {
    if (isComposing.value) return
    
    processInput({
        currentTypingSequence,
        charIndex, 
        nextWord 
    })
}

const onKeyDown = (event) => {
    handleKeyDown({
        event, 
        isShiftPressed, 
        activeKey, 
        nextKey, 
        charIndex,
        dakutenIndex,
        currentTypingSequence, 
        nextWord
    })
}

const onKeyUp = (event) => {
    handleKeyUp({
        event,
        isShiftPressed,
        activeKey
    })
}

// const onCompositionStart = () => {
//     handleCompositionStart()
// }

// const onCompositionEnd = (event) => {
//     handleCompositionEnd(event, () => {
//         if (inputAreaRef.value) {
//             onInput({ target: inputAreaRef.value.getInputElement() })
//         }
//     })
// }

// Watch for game completion
watch(gameEnded, (newValue) => {
  if (newValue) {
    emit('game-completed', {
      correctChars: correctChars.value,
      totalChars: totalChars.value,
      startTime: startTime.value
    })
  }
})

// Lifecycle
onMounted(() => {
    console.log('App mounted, starting game')
    startNewRound()
    nextTick(() => {
        const appEl = document.querySelector('.practice-screen')
        if (appEl) appEl.focus()
    })
})
</script>