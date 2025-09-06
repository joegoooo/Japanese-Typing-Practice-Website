

// Japanese JIS Keyboard Layout
export const KEYBOARD_LAYOUT = {
    row1: [
        { key: '`', kana: 'ろ'},
        { key: '1', kana: 'ぬ' }, { key: '2', kana: 'ふ' }, { key: '3', kana: 'あ' }, 
        { key: '4', kana: 'う' }, { key: '5', kana: 'え' }, { key: '6', kana: 'お' }, 
        { key: '7', kana: 'や' }, { key: '8', kana: 'ゆ' }, { key: '9', kana: 'よ' }, 
        { key: '0', kana: 'わ' }, { key: '-', kana: 'ほ' }, { key: '=', kana: 'へ' },
        { key: 'backspace', kana: 'backspace'}
    ],
    row2: [
        { key: 'q', kana: 'た' }, { key: 'w', kana: 'て' }, { key: 'e', kana: 'い' }, 
        { key: 'r', kana: 'す' }, { key: 't', kana: 'か' }, { key: 'y', kana: 'ん' }, 
        { key: 'u', kana: 'な' }, { key: 'i', kana: 'に' }, { key: 'o', kana: 'ら' }, 
        { key: 'p', kana: 'せ' }, { key: '[', kana: '゛' }, { key: ']', kana: '゜' },
        { key: '\\', kana: 'む'}
    ],
    row3: [
        { key: 'a', kana: 'ち' }, { key: 's', kana: 'と' }, { key: 'd', kana: 'し' }, 
        { key: 'f', kana: 'は' }, { key: 'g', kana: 'き' }, { key: 'h', kana: 'く' }, 
        { key: 'j', kana: 'ま' }, { key: 'k', kana: 'の' }, { key: 'l', kana: 'り' }, 
        { key: ';', kana: 'れ' }, { key: "'", kana: 'け' }
    ],
    row4: [
        { key: 'shift', kana: 'shift'},
        { key: 'z', kana: 'つ' }, { key: 'x', kana: 'さ' }, { key: 'c', kana: 'そ' }, 
        { key: 'v', kana: 'ひ' }, { key: 'b', kana: 'こ' }, { key: 'n', kana: 'み' }, 
        { key: 'm', kana: 'も' }, { key: ',', kana: 'ね' }, { key: '.', kana: 'る' }, 
        { key: '/', kana: 'め' },
        { key: 'shift', kana: 'shift'}
    ]
}

export const SHIFT_KEYBOARD_LAYOUT = {
    row1: [
        { key: '~', kana: 'ろ'},
        { key: '!', kana: 'ぬ' }, { key: '@', kana: 'ふ' }, { key: '#', kana: 'ぁ' }, 
        { key: '$', kana: 'ぅ' }, { key: '%', kana: 'ぇ' }, { key: '^', kana: 'ぉ' }, 
        { key: '&', kana: 'ゃ' }, { key: '*', kana: 'ゅ' }, { key: '(', kana: 'ょ' }, 
        { key: ')', kana: 'を' }, { key: '_', kana: 'ー' }, { key: '+', kana: 'へ' },
        { key: 'backspace', kana: 'backspace'}
    ],
    row2: [
        { key: 'Q', kana: 'た' }, { key: 'W', kana: 'て' }, { key: 'E', kana: 'ぃ' }, 
        { key: 'R', kana: 'す' }, { key: 'T', kana: 'か' }, { key: 'Y', kana: 'ん' }, 
        { key: 'U', kana: 'な' }, { key: 'I', kana: 'に' }, { key: 'O', kana: 'ら' }, 
        { key: 'P', kana: 'せ' }, { key: '{', kana: '「' }, { key: '}', kana: '」' },
        { key: '|', kana: 'む'}
    ],
    row3: [
        { key: 'A', kana: 'ち' }, { key: 'S', kana: 'と' }, { key: 'D', kana: 'し' }, 
        { key: 'F', kana: 'は' }, { key: 'G', kana: 'き' }, { key: 'H', kana: 'く' }, 
        { key: 'J', kana: 'ま' }, { key: 'K', kana: 'の' }, { key: 'L', kana: 'り' }, 
        { key: ':', kana: 'れ' }, { key: '"', kana: 'け' }
    ],
    row4: [
        { key: 'shift', kana: 'shift'},
        { key: 'Z', kana: 'っ' }, { key: 'X', kana: 'さ' }, { key: 'C', kana: 'そ' }, 
        { key: 'V', kana: 'ひ' }, { key: 'B', kana: 'こ' }, { key: 'N', kana: 'み' }, 
        { key: 'M', kana: 'も' }, { key: '<', kana: '、' }, { key: '>', kana: '。' }, 
        { key: '?', kana: '・' },
        { key: 'shift', kana: 'shift'}
    ]
}

// Dakuten and Handakuten typing sequences
export const DAKUTEN_MAP = {
    'が': ['か', '゛'], 'ぎ': ['き', '゛'], 'ぐ': ['く', '゛'], 'げ': ['け', '゛'], 'ご': ['こ', '゛'],
    'ざ': ['さ', '゛'], 'じ': ['し', '゛'], 'ず': ['す', '゛'], 'ぜ': ['せ', '゛'], 'ぞ': ['そ', '゛'],
    'だ': ['た', '゛'], 'ぢ': ['ち', '゛'], 'づ': ['つ', '゛'], 'で': ['て', '゛'], 'ど': ['と', '゛'],
    'ば': ['は', '゛'], 'び': ['ひ', '゛'], 'ぶ': ['ふ', '゛'], 'べ': ['へ', '゛'], 'ぼ': ['ほ', '゛'],
    'ヴ': ['う', '゛'],
    'ぱ': ['は', '゜'], 'ぴ': ['ひ', '゜'], 'ぷ': ['ふ', '゜'], 'ぺ': ['へ', '゜'], 'ぽ': ['ほ', '゜']
}

export const YOUON_MAP = {
    'ゃ': ['shift', 'ゃ'], 'ゅ': ['shift', 'ゅ'], 'ょ': ['shift', 'ょ']
}

export const GAME_CONFIG = {
    WORDS_PER_ROUND: 170,
    WORD_COMPLETION_DELAY: 300,
    CHARS_PER_WORD: 5,
    AUTO_RESTART: true,
    RESTART_DELAY: 2000,
    SHOW_RESTART_BUTTON: true
}