export interface Answer {
  text: string
  correct?: boolean
}

export interface Question {
  num: number
  text: string
  answers: Answer[]
  hint?: string
}

export interface QuizModule {
  id: string
  name: string
  questions: Question[]
}
