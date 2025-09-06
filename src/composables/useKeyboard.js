import { ref, computed } from 'vue'
import { KEYBOARD_LAYOUT, SHIFT_KEYBOARD_LAYOUT, DAKUTEN_MAP } from '../config/gameConfig.js'
import { GameUtils } from '../utils/gameUtils.js'

export function useKeyboard(currentTypingSequence, charIndex, dakutenIndex) {
    const activeKey = ref('')
    const isShiftPressed = ref(false)
    const showJapaneseLayout = ref(true)

    // Computed keyboard rows
    const currentLayout = computed(() => {
        return isShiftPressed.value ? SHIFT_KEYBOARD_LAYOUT : KEYBOARD_LAYOUT
    })

    const row1 = computed(() => currentLayout.value.row1)
    const row2 = computed(() => currentLayout.value.row2)
    const row3 = computed(() => currentLayout.value.row3)
    const row4 = computed(() => currentLayout.value.row4)

    // Next key highlighting
    const nextKey = computed(() => {
        if (!currentTypingSequence.value || charIndex.value >= currentTypingSequence.value.length) {
            if(currentTypingSequence.value) console.log(charIndex.value, currentTypingSequence.value.length)
            return null
        }
        
        const nextChar = GameUtils.isKatakana(currentTypingSequence.value[charIndex.value]) 
            ? GameUtils.katakanaToHiraganaMap[currentTypingSequence.value[charIndex.value]] 
            : currentTypingSequence.value[charIndex.value] 
        
        console.log('nextKey computed - nextChar:', nextChar)
        return GameUtils.findKeyForCharacter(nextChar, currentLayout.value)        
    })

    const toggleKeyboardLayout = () => {
        showJapaneseLayout.value = !showJapaneseLayout.value
    }

    return {
        // State
        activeKey,
        isShiftPressed,
        showJapaneseLayout,
        
        // Computed
        row1,
        row2,
        row3,
        row4,
        nextKey,
        
        // Methods
        toggleKeyboardLayout
    }
}