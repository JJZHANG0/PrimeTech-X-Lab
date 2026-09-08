export type SkillKey = 'software' | 'algorithm' | 'modeling' | 'embedded' | 'engineering'

export type SkillDimension = {
  key: SkillKey
  label: string
}

export type Project = {
  id: string
  name: string
  englishName: string
  summary: string
  tags: string[]
  skills: string[]
  campId: string
  output: string
  difficulty: string
  background: string
  scenario: string
  question: string
  route: string[]
  roles: string[]
  weights: Record<SkillKey, number>
  requirements: Record<SkillKey, number>
  competitionIds: string[]
}

export type Camp = {
  id: string
  name: string
  englishName: string
  summary: string
  skills: string[]
  suitableProjects: string[]
  hours: number
  season: string
  price: number
  output: string
  tags: string[]
}

export type Competition = {
  id: string
  name: string
  summary: string
  focus: string[]
  tags: string[]
}

export type AssessmentAnswers = Record<SkillKey, Record<string, number>>

export type AssessmentLevel = '探索起步' | '技术入门' | '项目进阶' | '独立实践'

export type AssessmentResult = {
  level: AssessmentLevel
  scores: Record<SkillKey, number>
  weightedReadiness: number
  strength: SkillKey
  gaps: SkillKey[]
  role: string
  campAdvice: string
  description: string
}

export type PathSelection = {
  step: number
  projectId?: string
  answers: AssessmentAnswers
  assessmentComplete: boolean
  assessmentSkipped: boolean
  weeklyTime: string
  preferredRole: string
  includeCamp: boolean
  outcomeGoal: string
  competitionIds: string[]
  includeValidation: boolean
  studentName: string
}
