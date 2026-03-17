<template>
  <div class="search-bar">
    <svg class="search-bar__icon" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>

    <input
      class="search-bar__input"
      type="text"
      placeholder="Поиск по вопросам и ответам..."
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown.escape="$emit('update:modelValue', '')"
    />

    <button
      v-if="modelValue"
      class="search-bar__clear"
      @click="$emit('update:modelValue', '')"
    >
      ✕ очистить
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.search-bar {
  position: relative;
}

.search-bar__icon {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: #7a8299;
  pointer-events: none;
}

.search-bar__input {
  width: 100%;
  background: #1e2230;
  border: 1px solid #2a2f40;
  border-radius: 10px;
  color: #e8ecf4;
  font-family: inherit;
  font-size: 14px;
  padding: 9px 14px 9px 38px;
  outline: none;
  transition: border-color 0.15s;
}

.search-bar__input::placeholder {
  color: #7a8299;
}

.search-bar__input:focus {
  border-color: #ff5c35;
}

.search-bar__clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #2a2f40;
  border: none;
  border-radius: 4px;
  color: #7a8299;
  cursor: pointer;
  padding: 2px 7px;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  transition: color 0.15s;
}

.search-bar__clear:hover {
  color: #e8ecf4;
}
</style>
