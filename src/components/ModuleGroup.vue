<template>
  <section class="module-group">
    <div class="module-group__label">
      <span class="module-group__tag">{{ module.id }}</span>
      <span class="module-group__name">{{ module.name }}</span>
      <span class="module-group__count">{{ module.questions.length }} вопр.</span>
    </div>

    <QuestionCard
      v-for="question in module.questions"
      :key="`${module.id}-${question.num}`"
      :question="question"
      :is-open="openCards.has(`${module.id}-${question.num}`)"
      :highlight-text="highlightText"
      @toggle="$emit('toggle', module.id, question.num)"
    />
  </section>
</template>

<script setup lang="ts">
import QuestionCard from './QuestionCard.vue'
import type { QuizModule } from '@/types/quiz'

defineProps<{
  module: QuizModule
  openCards: Set<string>
  highlightText: (text: string) => string
}>()

defineEmits<{
  toggle: [moduleId: string, questionNum: number]
}>()
</script>

<style scoped>
.module-group {
  margin-bottom: 36px;
}

.module-group__label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.module-group__tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #ff5c35;
  background: rgba(255, 92, 53, 0.12);
  border: 1px solid rgba(255, 92, 53, 0.25);
  border-radius: 5px;
  padding: 3px 8px;
}

.module-group__name {
  font-size: 13px;
  font-weight: 600;
  color: #7a8299;
}

.module-group__count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #7a8299;
  margin-left: auto;
}
</style>
