<template>
  <div class="filter-tabs">
    <button
      class="filter-tabs__btn"
      :class="{ 'filter-tabs__btn--active': modelValue === null }"
      @click="$emit('update:modelValue', null)"
    >
      Все
    </button>

    <button
      v-for="module in modules"
      :key="module.id"
      class="filter-tabs__btn"
      :class="{ 'filter-tabs__btn--active': modelValue === module.id }"
      @click="$emit('update:modelValue', module.id)"
    >
      {{ module.id }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | null
  modules: { id: string; name: string }[]
}>()

defineEmits<{
  'update:modelValue': [value: string | null]
}>()
</script>

<style scoped>
.filter-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.filter-tabs__btn {
  background: #1e2230;
  border: 1px solid #2a2f40;
  border-radius: 6px;
  color: #7a8299;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  transition: all 0.15s;
}

.filter-tabs__btn:hover {
  color: #e8ecf4;
  border-color: #3a4050;
}

.filter-tabs__btn--active {
  background: #ff5c35;
  border-color: #ff5c35;
  color: #fff;
}
</style>
