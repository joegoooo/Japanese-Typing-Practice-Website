import { ref, computed } from 'vue'
import { JAPANESE_WORDS } from '../data/dictionary.js'
import { GAME_CONFIG } from '../config/gameConfig.js'
import { GameUtils } from '../utils/gameUtils.js'

export function useGameState() {
    // Reactive data
    const currentWord = ref('')
    const userInput = ref('')
    const charIndex = ref(0)
    const wordsCompleted = ref(0)
    const totalChars = ref(0)
    const correctChars = ref(0)
    const isWordComplete = ref(false)
    const gameEnded = ref(false)
    const dakutenIndex = ref(0)
    const startTime = ref(null)
    const usedWords = ref([]) // Track words used in current round

    // Computed properties
    const getCharacterClass = (index) => {
        if (index < userInput.value.length) {
            return userInput.value[index] === currentWord.value[index] ? 'correct' : 'incorrect'
        } else if (index === userInput.value.length) {
            return 'current'
        }
        return ''
    }

    // Methods
    const nextWord = () => {
        console.log('nextWord called')
        
        if (wordsCompleted.value >= GAME_CONFIG.WORDS_PER_ROUND) {
            gameEnded.value = true
            return
        }

        // Add current word to used words list before getting next word
        if (currentWord.value && !usedWords.value.includes(currentWord.value)) {
            usedWords.value.push(currentWord.value)
        }

        if (currentWord.value) {
            wordsCompleted.value++
        }

        // Get a random word from the JAPANESE_WORDS array, avoiding used words
        currentWord.value = GameUtils.getRandomWord(JAPANESE_WORDS, usedWords.value)
        userInput.value = ''
        charIndex.value = 0
        dakutenIndex.value = 0
        isWordComplete.value = false

        console.log('New word set:', currentWord.value)
        console.log('Used words:', usedWords.value.length, 'of', JAPANESE_WORDS.length)
    }

    const startNewRound = () => {
        console.log('Starting new round')
        wordsCompleted.value = 0
        totalChars.value = 0
        correctChars.value = 0
        gameEnded.value = false
        usedWords.value = [] // Reset used words for new round
        startTime.value = Date.now()
        nextWord()
    }

    return {
        // State
        currentWord,
        userInput,
        charIndex,
        wordsCompleted,
        totalChars,
        correctChars,
        gameEnded,
        isWordComplete,
        dakutenIndex,
        startTime,
        usedWords,
        
        // Methods
        getCharacterClass,
        nextWord,
        startNewRound
    }
}