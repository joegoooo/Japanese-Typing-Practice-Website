# JPtyping-vue

A minimalist Japanese typing practice app built with Vue 3 and Vite. It visualizes a Japanese JIS keyboard, highlights the next key to press, and supports kana-input rules including dakuten/handakuten and youon (small ゃ/ゅ/ょ) via Shift.

## Quick start

```bash
# Node >= 14.18.0
npm install
npm run dev
# open the printed local URL
```

Build and preview:

```bash
npm run build
npm run preview
```

## How to play

- The current word is shown at the top. Type it using Japanese kana input rules.
- The on-screen keyboard will:
  - highlight the key you just pressed (active)
  - highlight the key you should press next (next-key)
- Dakuten/handakuten are typed by first entering the base kana, then pressing the dakuten (゛) or handakuten (゜) keys.
- Youon (e.g., きゃ/しゃ/ちゃ) use small ゃ/ゅ/ょ, produced with Shift on や/ゆ/よ in kana input.
- Finish a word to automatically advance.

## Features

- Kana-input focused (not romaji):
  - Dakuten/handakuten sequences via DAKUTEN_MAP
  - Youon small-kana (ゃ/ゅ/ょ) via Shift
- Visual JIS keyboard with normal and Shift layouts
- Next-key guidance for faster learning
- Round completion and simple results

## Project structure

```
src/
  components/
    KeyboardDisplay.vue   # On-screen JIS keyboard (active/next-key highlights)
    PracticeScreen.vue    # Main gameplay screen
    WordDisplay.vue       # Current word with per-char state
    ResultsScreen.vue     # Round summary
    InputArea.vue         # (Optional) input helper
  composables/
    useGameState.js       # Game state, flow, metrics
    useKeyboard.js        # Layouts, nextKey, Shift state
    useInputHandler.js    # Event handling, code→key mapping
  config/
    gameConfig.js         # Layouts, DAKUTEN_MAP, YOUON_MAP, GAME_CONFIG
  data/
    dictionary.js         # Word list
  styles/                 # Base and component styles
  utils/
    gameUtils.js          # Kana helpers and lookups
```

## Key layouts and input rules

Defined in `src/config/gameConfig.js`:

- KEYBOARD_LAYOUT: base JIS mapping (lowercase, digits, symbols)
- SHIFT_KEYBOARD_LAYOUT: shifted JIS mapping (uppercase, !@#$, small kana, etc.)
- DAKUTEN_MAP: sequences like が → [か, ゛], ぱ → [は, ゜]
- YOUON_MAP (kana input): small ゃ/ゅ/ょ sequences using Shift (e.g., き + Shift+や)
- GAME_CONFIG: knobs such as words per round and delays

Highlight logic:

- `useInputHandler` maps physical `KeyboardEvent.code` to display keys, considering Shift, so `activeKey` matches the visible layout.
- `useKeyboard` computes `nextKey` by finding the required kana (including multi-step sequences) in the current layout.

## Customization

- Add/remove words in `src/data/dictionary.js`.
- Tweak round size and delays in `GAME_CONFIG` in `src/config/gameConfig.js`.
- Extend `DAKUTEN_MAP`/`YOUON_MAP` for additional combinations.
- Update styles under `src/styles/`.

## Troubleshooting

- Active key not highlighting with Shift: ensure `codeToKey(event.code, isShiftPressed)` is used (already implemented in `useInputHandler.js`).
- Wrong next-key for dakuten/youon: verify target kana exists in the current layout and the maps cover that sequence.

## Tech stack

- Vue 3 + `<script setup>`
- Vite

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview built app

## License

MIT
