import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import { assessmentGroups, dimensions, proficiencyLabels, roleOptions, weeklyTimeOptions } from '../data/assessment'
import type { AssessmentAnswers, SkillKey } from '../types'

type Props = {
  answers: AssessmentAnswers
  weeklyTime: string
  preferredRole: string
  onAnswers: (answers: AssessmentAnswers) => void
  onMeta: (weeklyTime: string, preferredRole: string) => void
  onComplete: () => void
  onSkip: () => void
}

export function SkillAssessment({ answers, weeklyTime, preferredRole, onAnswers, onMeta, onComplete, onSkip }: Props) {
  const [group, setGroup] = useState(0)
  const isMeta = group === dimensions.length
  const currentKey = dimensions[Math.min(group, dimensions.length - 1)]?.key as SkillKey
  const totalQuestions = Object.values(assessmentGroups).flat().length
  const answered = Object.values(answers).reduce((sum, values) => sum + Object.keys(values).length, 0)
  const progress = Math.round((answered / totalQuestions) * 100)
  const groupComplete = isMeta ? Boolean(weeklyTime && preferredRole) : assessmentGroups[currentKey].every((item) => answers[currentKey][item] != null)

  const setValue = (key: SkillKey, item: string, value: number) => onAnswers({ ...answers, [key]: { ...answers[key], [item]: value } })
  const title = isMeta ? '投入方式与团队角色' : dimensions[group].label
  const indexText = `${String(group + 1).padStart(2, '0')} / 06`
  const canFinish = useMemo(() => answered === totalQuestions && weeklyTime && preferredRole, [answered, totalQuestions, weeklyTime, preferredRole])

  return <div className="assessment">
    <div className="builder-title assessment-head"><p className="eyebrow">STEP 03 / STARTING POINT</p><h2>了解你的起点，<br />不是给能力贴标签。</h2><p>结果只用于判断你与目标课题之间的技能距离，不代表对个人潜力的评价。</p></div>
    <div className="assessment-progress"><span style={{ width: `${progress}%` }} /><b>{progress}%</b><small>已完成 {answered} / {totalQuestions} 项</small></div>
    <div className="assessment-panel">
      <aside>{dimensions.map((item, index) => <button key={item.key} className={group === index ? 'is-active' : ''} onClick={() => setGroup(index)}><span>{index < group || assessmentGroups[item.key].every((q) => answers[item.key][q] != null) ? <Check /> : `0${index + 1}`}</span>{item.label}</button>)}<button className={isMeta ? 'is-active' : ''} onClick={() => setGroup(5)}><span>06</span>投入与角色</button></aside>
      <div className="assessment-content"><div className="question-heading"><span>{indexText}</span><h3>{title}</h3>{!isMeta && <p>请选择你对每项工具或实践的当前熟悉程度。</p>}</div>
        {!isMeta ? <div className="question-list">{assessmentGroups[currentKey].map((item) => <div className="assessment-question" key={item}><div><b>{item}</b><span>{answers[currentKey][item] == null ? '请选择' : `${answers[currentKey][item]} · ${proficiencyLabels[answers[currentKey][item]]}`}</span></div><div className="scale-options">{proficiencyLabels.map((label, value) => <button key={label} title={`${value}｜${label}`} aria-label={`${item}：${value}，${label}`} className={answers[currentKey][item] === value ? 'is-selected' : ''} onClick={() => setValue(currentKey, item, value)}>{value}</button>)}</div></div>)}</div> : <div className="meta-questions"><fieldset><legend>你每周可以投入多少课外时间？</legend><div className="choice-grid">{weeklyTimeOptions.map((item) => <button className={weeklyTime === item ? 'choice-card is-selected' : 'choice-card'} key={item} onClick={() => onMeta(item, preferredRole)}>{item}{weeklyTime === item && <Check />}</button>)}</div></fieldset><fieldset><legend>你更希望在团队中承担什么角色？</legend><div className="choice-grid">{roleOptions.map((item) => <button className={preferredRole === item ? 'choice-card is-selected' : 'choice-card'} key={item} onClick={() => onMeta(weeklyTime, item)}>{item}{preferredRole === item && <Check />}</button>)}</div></fieldset></div>}
        <div className="assessment-nav"><button className="button button--ghost" disabled={group === 0} onClick={() => setGroup(group - 1)}><ArrowLeft /> 上一组</button>{group < 5 ? <button className="button button--dark" disabled={!groupComplete} onClick={() => setGroup(group + 1)}>下一组 <ArrowRight /></button> : <button className="button button--dark" disabled={!canFinish} onClick={onComplete}>生成能力建议 <ArrowRight /></button>}</div>
      </div>
    </div>
    <button className="text-button" onClick={onSkip}>暂时跳过能力自查</button>
  </div>
}
