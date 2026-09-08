import { dimensions } from '../data/assessment'
import type { AssessmentResult, Camp, Competition, Project } from '../types'

type SummaryInput = {
  project: Project
  camp?: Camp
  competitions: Competition[]
  result?: AssessmentResult
  skipped: boolean
  includeCamp: boolean
  includeValidation: boolean
  studentName?: string
  price: number
  hours: string
}

export function generateAdvice(input: SummaryInput) {
  const { project, camp, competitions: platforms, result, skipped, includeCamp, includeValidation } = input
  if (skipped || !result) {
    return `你选择的“${project.name}”将围绕${project.skills.join('、')}展开。你尚未完成能力自查，当前路径根据课题的常规技能要求生成，建议在正式进入项目前与导师进一步确认个人基础及团队角色。${includeCamp && camp ? `当前已加入“${camp.name}”作为前置能力准备。` : ''}`
  }
  const gaps = result.gaps.map((key) => dimensions.find((item) => item.key === key)?.label).join('与')
  return `你选择的“${project.name}”主要涉及${project.skills.join('、')}。本次自查显示你的当前阶段为“${result.level}”，优势集中在${dimensions.find((item) => item.key === result.strength)?.label}，${gaps ? `建议关注${gaps}的能力准备。` : ''}${includeCamp && camp ? `路径已加入“${camp.name}”，帮助你在正式研发前建立关键工具与工程方法。` : '你将直接进入课题研发。'}${includeValidation && platforms.length ? `课题完成后，可通过${platforms.map((item) => item.name).join('与')}接受外部反馈与验证。` : ''}`
}

export function generateCopyText(input: SummaryInput) {
  const platforms = input.includeValidation ? input.competitions.map((item) => item.name).join('、') : '暂不选择'
  return [
    'PrimeTech X Lab｜项目路径摘要',
    input.studentName ? `学生姓名：${input.studentName}` : '',
    `目标课题：${input.project.name}`,
    `当前能力阶段：${input.result?.level ?? '尚未自查'}`,
    `推荐团队角色：${input.result?.role ?? '待导师评估'}`,
    `能力准备：${input.includeCamp && input.camp ? input.camp.name : '暂不选择'}`,
    '核心研发：课题孵化与研发（约50课时）',
    `成果验证：${platforms}`,
    `总课时：${input.hours}`,
    `项目投入：¥${input.price.toLocaleString('zh-CN')} / 人`,
    '', input.result ? generateAdvice(input) : generateAdvice(input),
    '', '说明：具体时间、团队安排与课题内容以正式评估结果为准。',
  ].filter(Boolean).join('\n')
}
