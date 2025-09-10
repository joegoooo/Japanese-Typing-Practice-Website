import { ref, computed } from 'vue'
import { JAPANESE_WORDS } from '../data/dictionary.js'
import { GAME_CONFIG, DAKUTEN_MAP, YOUON_MAP } from '../config/gameConfig.js'
import { GameUtils } from '../utils/gameUtils.js'

export function useGameState() {
    // Reactive data
    const currentWord = ref('')
    const currentTypingSequence = ref([])
    const charIndex = ref(0)
    const wordsCompleted = ref(0)
    const totalChars = ref(0)
    const correctChars = ref(0)
    const gameEnded = ref(false)
    const dakutenIndex = ref(0)
    const startTime = ref(null)
    const usedWords = ref([]) // Track words used in current round
    const currentCharIndex = ref(0)

    // Computed properties
    const getCharacterClass = (index) => {
        if(index === currentCharIndex.value) {
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
        charIndex.value = 0
        dakutenIndex.value = 0
        currentCharIndex.value = 0

        currentTypingSequence.value = []
        for(let i = 0; i < currentWord.value.length; i++) {
            let kana = currentWord.value[i];
            if(GameUtils.isKatakana(kana)) {
                kana = GameUtils.katakanaToHiraganaMap[kana]
            }
            if(DAKUTEN_MAP[kana]) {
                currentTypingSequence.value.push(DAKUTEN_MAP[kana][0])
                currentTypingSequence.value.push(DAKUTEN_MAP[kana][1])
            }
            else if(YOUON_MAP[kana]) {
                console.log(YOUON_MAP[kana])
                for(let j = 0; j < YOUON_MAP[kana].length; j++) {
                    currentTypingSequence.value.push(YOUON_MAP[kana][j])
                }
            }
            else {
                currentTypingSequence.value.push(kana)
            }
        }
        
        console.log('New word set:', currentWord.value)
        console.log(currentTypingSequence.value)
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
        currentWord,
        currentTypingSequence,
        charIndex,
        wordsCompleted,
        totalChars,
        correctChars,
        gameEnded,
        dakutenIndex,
        startTime,
        currentCharIndex,
        getCharacterClass,
        nextWord,
        startNewRound
    }
}