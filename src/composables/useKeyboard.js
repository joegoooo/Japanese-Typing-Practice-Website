import { ref, computed } from 'vue'
import { KEYBOARD_LAYOUT, SHIFT_KEYBOARD_LAYOUT, DAKUTEN_MAP } from '../config/gameConfig.js'
import { GameUtils } from '../utils/gameUtils.js'

export function useKeyboard(currentWord, charIndex, dakutenIndex) {
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
        if (!currentWord.value || charIndex.value >= currentWord.value.length) {
            return null
        }
        
        const nextChar = GameUtils.isKatakana(currentWord.value[charIndex.value]) 
            ? GameUtils.katakanaToHiraganaMap[currentWord.value[charIndex.value]] 
            : currentWord.value[charIndex.value] 
        
        console.log('nextKey computed - nextChar:', nextChar, 'dakutenIndex:', dakutenIndex.value)
        
        // Check if it's a dakuten character
        if (DAKUTEN_MAP[nextChar]) {
            const typingSequence = DAKUTEN_MAP[nextChar]
            const targetChar = typingSequence[dakutenIndex.value] || typingSequence[0]
            console.log('Dakuten character detected:', { nextChar, typingSequence, targetChar, dakutenIndex: dakutenIndex.value })
            
            return GameUtils.findKeyForCharacter(targetChar, currentLayout.value)
        } else {
            // Regular character
            return GameUtils.findKeyForCharacter(nextChar, currentLayout.value)
        }
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