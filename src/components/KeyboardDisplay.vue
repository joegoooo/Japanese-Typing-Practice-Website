<template>
  <div class="keyboard">
      <div class="keyboard-row">
          <div 
            v-for="keyObj in row1" 
            :key="keyObj.key" 
            :class="['key', { 
                active: activeKey === keyObj.key,
                'next-key': nextKey === keyObj.key 
            }]"
          >
              <div class="key-main">{{ keyObj.kana }}</div>
              <div class="key-sub">{{ keyObj.key }}</div>
          </div>
      </div>
      <div class="keyboard-row">
          <div 
            v-for="keyObj in row2" 
            :key="keyObj.key" 
            :class="['key', { 
                active: activeKey === keyObj.key,
                'next-key': nextKey === keyObj.key 
            }]"
          >
              <div class="key-main">{{ keyObj.kana }}</div>
              <div class="key-sub">{{ keyObj.key }}</div>
          </div>
      </div>
      <div class="keyboard-row">
          <div 
            v-for="keyObj in row3" 
            :key="keyObj.key" 
            :class="['key', { 
                active: activeKey === keyObj.key,
                'next-key': nextKey === keyObj.key 
            }]"
          >
              <div class="key-main">{{ keyObj.kana }}</div>
              <div class="key-sub">{{ keyObj.key }}</div>
          </div>
      </div>
      <div class="keyboard-row">
          <div 
            v-for="keyObj in row4" 
            :key="keyObj.key" 
            :class="['key', { 
                active: activeKey === keyObj.key,
                'next-key': nextKey === keyObj.key 
            }]"
          >
              <div class="key-main">{{ keyObj.kana }}</div>
              <div class="key-sub">{{ keyObj.key }}</div>
          </div>
      </div>
      <div class="keyboard-row">
          <div :class="['key', 'space', { active: activeKey === 'space' }]">Space</div>
      </div>
  </div>
</template>

<script setup>
defineProps({
  activeKey: String,
  nextKey: String,
  row1: Array,
  row2: Array,
  row3: Array,
  row4: Array
})
</script>