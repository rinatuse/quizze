import { ref, computed } from 'vue'
import type { QuizModule } from '@/types/quiz'
import { QUIZ_MODULES } from '@/data/quizData'

export function useQuizSearch() {
  const search = ref<string>('')
  const activeModule = ref<string | null>(null)

  const modules = QUIZ_MODULES.map(({ id, name }) => ({ id, name }))

  const filteredModules = computed<QuizModule[]>(() => {
    const query = search.value.trim().toLowerCase()

    return QUIZ_MODULES
      .filter((m) => activeModule.value === null || m.id === activeModule.value)
      .map((m) => ({
        ...m,
        questions: m.questions.filter((q) => {
          if (!query) return true
          return (
            q.text.toLowerCase().includes(query) ||
            q.answers.some((a) => a.text.toLowerCase().includes(query)) ||
            (q.hint?.toLowerCase().includes(query) ?? false)
          )
        }),
      }))
      .filter((m) => m.questions.length > 0)
  })

  const totalVisible = computed<number>(() =>
    filteredModules.value.reduce((sum, m) => sum + m.questions.length, 0),
  )

  function highlightText(text: string): string {
    const query = search.value.trim()
    if (!query) return text
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return text.replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<mark>$1</mark>',
    )
  }

  function pluralize(n: number): string {
    if (n % 100 >= 11 && n % 100 <= 14) return 'ов'
    const r = n % 10
    if (r === 1) return ''
    if (r >= 2 && r <= 4) return 'а'
    return 'ов'
  }

  function clearSearch() {
    search.value = ''
  }

  function setModule(id: string | null) {
    activeModule.value = id
  }

  return {
    search,
    activeModule,
    modules,
    filteredModules,
    totalVisible,
    highlightText,
    pluralize,
    clearSearch,
    setModule,
  }
}
