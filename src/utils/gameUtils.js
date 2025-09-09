export const GameUtils = {
    /**
     * Get a random word from the word list
     * @param {Array} wordList - Array of words to choose from
     * @returns {string} Random word
     */
    getRandomWord(wordList, usedWords = []) {
        if (!wordList || wordList.length === 0) {
            return 'こんにちは' // fallback word
        }

        const availableWords = wordList.filter(word => !usedWords.includes(word))

        if (availableWords.length === 0) {
            // All words have been used, reset or handle as needed
            // For now, just return a random word from the original list
            const randomIndex = Math.floor(Math.random() * wordList.length)
            return wordList[randomIndex]
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length)
        return availableWords[randomIndex]
    },

    /**
     * Mapping of katakana characters to their hiragana equivalents
     */
    katakanaToHiraganaMap: {
        // Basic vowels
        'ア': 'あ', 'イ': 'い', 'ウ': 'う', 'エ': 'え', 'オ': 'お',
        
        // K sounds
        'カ': 'か', 'キ': 'き', 'ク': 'く', 'ケ': 'け', 'コ': 'こ',
        'ガ': 'が', 'ギ': 'ぎ', 'グ': 'ぐ', 'ゲ': 'げ', 'ゴ': 'ご',
        
        // S sounds
        'サ': 'さ', 'シ': 'し', 'ス': 'す', 'セ': 'せ', 'ソ': 'そ',
        'ザ': 'ざ', 'ジ': 'じ', 'ズ': 'ず', 'ゼ': 'ぜ', 'ゾ': 'ぞ',
        
        // T sounds
        'タ': 'た', 'チ': 'ち', 'ツ': 'つ', 'テ': 'て', 'ト': 'と',
        'ダ': 'だ', 'ヂ': 'ぢ', 'ヅ': 'づ', 'デ': 'で', 'ド': 'ど',
        
        // N sounds
        'ナ': 'な', 'ニ': 'に', 'ヌ': 'ぬ', 'ネ': 'ね', 'ノ': 'の',
        
        // H sounds
        'ハ': 'は', 'ヒ': 'ひ', 'フ': 'ふ', 'ヘ': 'へ', 'ホ': 'ほ',
        'バ': 'ば', 'ビ': 'び', 'ブ': 'ぶ', 'ベ': 'べ', 'ボ': 'ぼ',
        'パ': 'ぱ', 'ピ': 'ぴ', 'プ': 'ぷ', 'ペ': 'ぺ', 'ポ': 'ぽ',
        
        // M sounds
        'マ': 'ま', 'ミ': 'み', 'ム': 'む', 'メ': 'め', 'モ': 'も',
        
        // Y sounds
        'ヤ': 'や', 'ユ': 'ゆ', 'ヨ': 'よ',
        
        // R sounds
        'ラ': 'ら', 'リ': 'り', 'ル': 'る', 'レ': 'れ', 'ロ': 'ろ',
        
        // W sounds
        'ワ': 'わ', 'ヲ': 'を',
        
        // N
        'ン': 'ん',
        
        // Small characters
        'ッ': 'っ', 'ャ': 'ゃ', 'ュ': 'ゅ', 'ョ': 'ょ',
        'ァ': 'ぁ', 'ィ': 'ぃ', 'ゥ': 'ぅ', 'ェ': 'ぇ', 'ォ': 'ぉ',
        
        // Extended katakana
        'ヴ': 'ゔ', 'ヵ': 'ゕ', 'ヶ': 'ゖ',

        'ー': 'ー'
    },

    /**
     * Check if a character is katakana
     * @param {string} char - Character to check
     * @returns {boolean} True if the character is katakana
     */
    isKatakana(char) {
        const katakanaRange = /[\u30A0-\u30FF]/
        return katakanaRange.test(char)
    },

    /**
     * Find which keyboard key produces a given character
     * If the character is katakana, convert it to hiragana first
     * @param {string} character - The character to find
     * @param {object} keyboardLayout - The keyboard layout object
     * @returns {string|null} The key that produces this character
     */
    findKeyForCharacter(character, keyboardLayout) {
        // Convert katakana to hiragana if needed
        let targetChar = character
        if (this.isKatakana(character)) {
            targetChar = this.katakanaToHiraganaMap[character]
        }
        if(targetChar === 'shift') {
            return 'shift'
        }
        const allKeys = [
            ...keyboardLayout.row1, 
            ...keyboardLayout.row2, 
            ...keyboardLayout.row3, 
            ...keyboardLayout.row4
        ]
        const keyMapping = allKeys.find(keyObj => keyObj.kana === targetChar)
        return keyMapping ? keyMapping.key : null
    }
}