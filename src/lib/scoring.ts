import { assessmentGroups, dimensions } from '../data/assessment'
import type { AssessmentAnswers, AssessmentResult, Project, SkillKey } from '../types'

const levelCopy = {
  '探索起步': ['你已经找到了感兴趣的方向，但目前与课题所需的基础能力之间仍存在一定距离。建议先熟悉核心工具与工程流程，再进入正式研发。', '强烈建议选择技能营地。'],
  '技术入门': ['你已经接触过部分相关工具，也能够在指导下完成基础任务。前置能力准备能减少正式研发阶段用于熟悉工具的时间。', '建议选择技能营地。'],
  '项目进阶': ['你已具备参与该课题的主要基础能力，可以直接进入课题研发。如希望承担技术核心角色，可针对薄弱维度进行强化。', '技能营地为可选强化项。'],
  '独立实践': ['你在目标课题所需的多个关键能力上已具备独立实践经验，可以直接进入课题研发，并有机会承担更核心的角色。', '通常不需要技能营地。'],
} as const

const roleBySkill: Record<SkillKey, string> = {
  software: '算法与软件开发', algorithm: '算法、数据与研究验证', modeling: '机械结构与产品设计', embedded: '嵌入式与电路控制', engineering: '工程测试与项目推进',
}

export function calculateAssessment(answers: AssessmentAnswers, project: Project, preferredRole = ''): AssessmentResult {
  const scores = Object.fromEntries(dimensions.map(({ key }) => {
    const values = assessmentGroups[key].map((item) => answers[key]?.[item] ?? 0)
    return [key, values.reduce((sum, value) => sum + value, 0) / values.length]
  })) as Record<SkillKey, number>

  const weightedReadiness = dimensions.reduce((sum, { key }) => {
    const requirement = Math.max(project.requirements[key], 1)
    const ratio = Math.min(scores[key] / requirement, 1.25)
    return sum + ratio * project.weights[key]
  }, 0)

  const level = weightedReadiness < 42 ? '探索起步' : weightedReadiness < 68 ? '技术入门' : weightedReadiness < 93 ? '项目进阶' : '独立实践'
  const ranked = dimensions
    .map(({ key }) => ({ key, score: scores[key], gap: project.requirements[key] - scores[key], weight: project.weights[key] }))
    .filter((item) => item.weight > 0)
  const strength = [...ranked].sort((a, b) => b.score - a.score)[0].key
  const gaps = [...ranked].sort((a, b) => (b.gap * b.weight) - (a.gap * a.weight)).slice(0, 2).map((item) => item.key)
  const role = preferredRole && preferredRole !== '还不确定' ? preferredRole : roleBySkill[strength]

  return { level, scores, weightedReadiness, strength, gaps, role, description: levelCopy[level][0], campAdvice: levelCopy[level][1] }
}
