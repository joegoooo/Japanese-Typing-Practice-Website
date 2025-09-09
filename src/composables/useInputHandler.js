import { ref } from 'vue'
import { GAME_CONFIG, DAKUTEN_MAP } from '../config/gameConfig.js'

export function useInputHandler() {
    const isComposing = ref(false)

    const codeToKey = (code, isShiftPressed = false) => {
        const codeMap = {
            'Digit1': isShiftPressed ? '!' : '1',
            'Digit2': isShiftPressed ? '@' : '2',
            'Digit3': isShiftPressed ? '#' : '3',
            'Digit4': isShiftPressed ? '$' : '4',
            'Digit5': isShiftPressed ? '%' : '5',
            'Digit6': isShiftPressed ? '^' : '6',
            'Digit7': isShiftPressed ? '&' : '7',
            'Digit8': isShiftPressed ? '*' : '8',
            'Digit9': isShiftPressed ? '(' : '9',
            'Digit0': isShiftPressed ? ')' : '0',
            'Minus': isShiftPressed ? '_' : '-',
            'Equal': isShiftPressed ? '+' : '=',
            'Backquote': isShiftPressed ? '~' : '`',
            'KeyQ': isShiftPressed ? 'Q' : 'q',
            'KeyW': isShiftPressed ? 'W' : 'w',
            'KeyE': isShiftPressed ? 'E' : 'e',
            'KeyR': isShiftPressed ? 'R' : 'r',
            'KeyT': isShiftPressed ? 'T' : 't',
            'KeyY': isShiftPressed ? 'Y' : 'y',
            'KeyU': isShiftPressed ? 'U' : 'u',
            'KeyI': isShiftPressed ? 'I' : 'i',
            'KeyO': isShiftPressed ? 'O' : 'o',
            'KeyP': isShiftPressed ? 'P' : 'p',
            'BracketLeft': isShiftPressed ? '{' : '[',
            'BracketRight': isShiftPressed ? '}' : ']',
            'Backslash': isShiftPressed ? '|' : '\\',
            'KeyA': isShiftPressed ? 'A' : 'a',
            'KeyS': isShiftPressed ? 'S' : 's',
            'KeyD': isShiftPressed ? 'D' : 'd',
            'KeyF': isShiftPressed ? 'F' : 'f',
            'KeyG': isShiftPressed ? 'G' : 'g',
            'KeyH': isShiftPressed ? 'H' : 'h',
            'KeyJ': isShiftPressed ? 'J' : 'j',
            'KeyK': isShiftPressed ? 'K' : 'k',
            'KeyL': isShiftPressed ? 'L' : 'l',
            'Semicolon': isShiftPressed ? ':' : ';',
            'Quote': isShiftPressed ? '"' : "'",
            'KeyZ': isShiftPressed ? 'Z' : 'z',
            'KeyX': isShiftPressed ? 'X' : 'x',
            'KeyC': isShiftPressed ? 'C' : 'c',
            'KeyV': isShiftPressed ? 'V' : 'v',
            'KeyB': isShiftPressed ? 'B' : 'b',
            'KeyN': isShiftPressed ? 'N' : 'n',
            'KeyM': isShiftPressed ? 'M' : 'm',
            'Comma': isShiftPressed ? '<' : ',',
            'Period': isShiftPressed ? '>' : '.',
            'Slash': isShiftPressed ? '?' : '/',
            'Space': 'space',
            'Enter': 'enter',
            'Backspace': 'backspace',
            'Tab': 'tab',
            'ShiftLeft': 'shift',
            'ShiftRight': 'shift'
        }
        
        return codeMap[code] || code.toLowerCase()
    }

    function processInput( 
        currentTypingSequence,
        activeKey,
        nextKey,
        charIndex, 
        nextWord 
    ) {
 
        

        console.log(charIndex.value, activeKey.value, nextKey.value)
        if(activeKey.value === nextKey.value) {
            charIndex.value++
        }
        // if(nextToType === 'shift' && !isShiftPressed) {
        //     charIndex.value--
        // }

        if(charIndex.value === currentTypingSequence.value.length) {
            setTimeout(() => {
                nextWord()
            }), GAME_CONFIG.WORD_COMPLETION_DELAY || 300
        }

    }

    const handleKeyDown = ({ 
        event, 
        isShiftPressed, 
        activeKey, 
        nextKey,
        charIndex,
        dakutenIndex,
        currentTypingSequence, 
        nextWord
    }) => {
        console.log('handleKeyDown →', event.code)
        
        // Handle Shift key for layout switching
        if (event.key === 'Shift') {
            isShiftPressed.value = true
        }


        // Set active key for visual feedback
        activeKey.value = codeToKey(event.code, isShiftPressed.value)

        processInput(
            currentTypingSequence,
            activeKey,
            nextKey,
            charIndex,
            nextWord
        )
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
        handleKeyUp
        // handleCompositionStart,
        // handleCompositionEnd
    }
}