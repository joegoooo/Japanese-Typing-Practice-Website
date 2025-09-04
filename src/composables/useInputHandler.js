import { ref } from 'vue'
import { GAME_CONFIG, DAKUTEN_MAP } from '../config/gameConfig.js'

export function useInputHandler() {
    const isComposing = ref(false)

    const codeToKey = (code) => {
        const codeMap = {
            'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
            'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0',
            'Minus': '-', 'Equal': '=', 'Backquote': '`',
            'KeyQ': 'q', 'KeyW': 'w', 'KeyE': 'e', 'KeyR': 'r', 'KeyT': 't',
            'KeyY': 'y', 'KeyU': 'u', 'KeyI': 'i', 'KeyO': 'o', 'KeyP': 'p',
            'BracketLeft': '[', 'BracketRight': ']', 'Backslash': '\\',
            'KeyA': 'a', 'KeyS': 's', 'KeyD': 'd', 'KeyF': 'f', 'KeyG': 'g',
            'KeyH': 'h', 'KeyJ': 'j', 'KeyK': 'k', 'KeyL': 'l',
            'Semicolon': ';', 'Quote': "'",
            'KeyZ': 'z', 'KeyX': 'x', 'KeyC': 'c', 'KeyV': 'v', 'KeyB': 'b',
            'KeyN': 'n', 'KeyM': 'm', 'Comma': ',', 'Period': '.', 'Slash': '/',
            'Space': 'space', 'Enter': 'enter', 'Backspace': 'backspace',
            'Tab': 'tab', 'ShiftLeft': 'shift', 'ShiftRight': 'shift'
        }
        
        return codeMap[code] || code.toLowerCase()
    }

    const processInput = ({ 
        inputField, 
        inputValue, 
        userInput, 
        currentWord, 
        isWordComplete, 
        correctChars, 
        totalChars, 
        charIndex, 
        nextWord 
    }) => {
        console.log('processInput →', { 
            inputValue, 
            userInput: userInput.value, 
            expected: currentWord.value 
        })

        if (isWordComplete.value) {
            inputField.value = ''
            return
        }

        const expected = currentWord.value
        const correctSoFar = userInput.value

        // Handle deletion (backspace)
        if (inputValue.length < correctSoFar.length) {
            userInput.value = inputValue
            charIndex.value--
            console.log(charIndex.value)
            return
        }

        // Handle new input
        if (expected.startsWith(inputValue) && inputValue.length > correctSoFar.length) {
            const added = inputValue.length - correctSoFar.length
            userInput.value = inputValue
            charIndex.value = inputValue.length
            correctChars.value += added
            totalChars.value += added

            // Word completion
            if (userInput.value === expected) {
                isWordComplete.value = true
                inputField.value = ''
                setTimeout(() => {
                    nextWord()
                }, GAME_CONFIG.WORD_COMPLETION_DELAY || 300)
            }
        } else if (inputValue.length > correctSoFar.length) {
            totalChars.value++
            inputField.value = correctSoFar
        }
    }

    const handleKeyDown = ({ 
        event, 
        isShiftPressed, 
        activeKey, 
        nextKey, 
        charIndex,
        dakutenIndex,
        currentWord 
    }) => {
        console.log('handleKeyDown →', event.code)
        
        // Handle Shift key for layout switching
        if (event.key === 'Shift') {
            isShiftPressed.value = true
        }

        // Handle special keys
        if (event.code === 'Enter' || event.code === 'Backspace') {
            event.preventDefault()
        }

        // Set active key for visual feedback
        activeKey.value = codeToKey(event.code)
        
        // Handle dakuten progression
        if (nextKey.value === activeKey.value) {
            const currentChar = currentWord.value[charIndex.value]
            
            if (DAKUTEN_MAP[currentChar]) {
                const typingSequence = DAKUTEN_MAP[currentChar]
                console.log('Dakuten key pressed:', { 
                    currentChar, 
                    typingSequence, 
                    dakutenIndex: dakutenIndex.value,
                    expectedKey: typingSequence[dakutenIndex.value]
                })
                
                dakutenIndex.value++
                
                if (dakutenIndex.value >= typingSequence.length) {
                    charIndex.value++
                    dakutenIndex.value = 0
                    console.log('Dakuten sequence completed, moving to next character')
                }
            } else {
                charIndex.value++
                dakutenIndex.value = 0
            }
        }
    }

    const handleKeyUp = ({ event, isShiftPressed, activeKey }) => {
        // Handle Shift key release
        if (event.key === 'Shift') {
            isShiftPressed.value = false
        }

        // Clear active key visual feedback
        activeKey.value = ''
    }

    const handleCompositionStart = () => {
        isComposing.value = true
        console.log('IME composition started')
    }

    const handleCompositionEnd = (event, processInputCallback) => {
        isComposing.value = false
        console.log('IME composition ended:', event.data)
        
        if (event.target && processInputCallback) {
            processInputCallback()
        }
    }

    return {
        isComposing,
        processInput,
        handleKeyDown,
        handleKeyUp,
        handleCompositionStart,
        handleCompositionEnd
    }
}