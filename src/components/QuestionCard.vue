<template>
  <div class="question-card" :class="{ 'question-card--open': isOpen }">
    <div class="question-card__head" @click="$emit('toggle')">
      <span class="question-card__num">{{ question.num }}.</span>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="question-card__text" v-html="highlightText(question.text)" />
      <svg
        class="question-card__chevron"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>

    <Transition name="answers">
      <div v-if="isOpen" class="question-card__answers">
        <div
          v-for="(answer, index) in question.answers"
          :key="index"
          class="answer"
          :class="{ 'answer--correct': answer.correct }"
        >
          <span class="answer__dot" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="answer__text" v-html="highlightText(answer.text)" />
          <span v-if="answer.correct" class="answer__badge">✓ верно</span>
        </div>

        <p v-if="question.hint" class="question-card__hint">
          {{ question.hint }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '@/types/quiz'

defineProps<{
  question: Question
  isOpen: boolean
  highlightText: (text: string) => string
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
.question-card {
  background: #161920;
  border: 1px solid #2a2f40;
  border-radius: 10px;
  margin-bottom: 8px;
  overflow: hidden;
  transition: border-color 0.15s;
}

.question-card:hover {
  border-color: #3a4250;
}

/* Head */
.question-card__head {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  cursor: pointer;
  user-select: none;
}

.question-card__num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #ff5c35;
  font-weight: 700;
  flex-shrink: 0;
  padding-top: 1px;
  min-width: 22px;
}

.question-card__text {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  flex: 1;
  color: #e8ecf4;
}

.question-card__text :deep(mark) {
  background: rgba(255, 154, 32, 0.3);
  color: #ff9a20;
  border-radius: 2px;
  padding: 0 1px;
}

.question-card__chevron {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: #7a8299;
  transition: transform 0.2s;
  margin-top: 2px;
}

.question-card--open .question-card__chevron {
  transform: rotate(180deg);
}

/* Answers */
.question-card__answers {
  border-top: 1px solid #2a2f40;
  padding: 12px 16px 12px 46px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.answer {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid transparent;
}

.answer--correct {
  background: rgba(39, 201, 122, 0.08);
  border-color: rgba(39, 201, 122, 0.2);
}

.answer__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2a2f40;
  flex-shrink: 0;
  margin-top: 5px;
}

.answer--correct .answer__dot {
  background: #27c97a;
}

.answer__text {
  flex: 1;
  color: #e8ecf4;
}

.answer--correct .answer__text {
  color: #27c97a;
  font-weight: 600;
}

.answer__text :deep(mark) {
  background: rgba(255, 154, 32, 0.3);
  color: #ff9a20;
  border-radius: 2px;
  padding: 0 1px;
}

.answer__badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #27c97a;
  background: rgba(39, 201, 122, 0.12);
  border: 1px solid rgba(39, 201, 122, 0.25);
  border-radius: 4px;
  padding: 2px 6px;
  flex-shrink: 0;
  white-space: nowrap;
  align-self: center;
}

/* Hint */
.question-card__hint {
  margin-top: 4px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 2px solid #2a2f40;
  border-radius: 0 6px 6px 0;
  font-size: 12px;
  color: #7a8299;
  line-height: 1.6;
}

/* Transition */
.answers-enter-active,
.answers-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.answers-enter-from,
.answers-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
