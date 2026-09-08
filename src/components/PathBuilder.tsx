import { Check, Compass, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { emptyAnswers } from '../data/assessment'
import { getCamp } from '../data/camps'
import { competitions } from '../data/competitions'
import { getProject } from '../data/projects'
import { calculateAssessment } from '../lib/scoring'
import { rankCompetitions } from '../lib/matching'
import type { PathSelection, Project } from '../types'
import { CampRecommendation } from './CampRecommendation'
import { CompetitionMatcher } from './CompetitionMatcher'
import { LivePathSummary } from './LivePathSummary'
import { PathResultCard } from './PathResultCard'
import { ProjectExplorer } from './ProjectExplorer'
import { SkillAssessment } from './SkillAssessment'
import { SkillRequirementMap } from './SkillRequirementMap'

const STORAGE_KEY = 'primetech-x-lab-path-v1'
const initialState: PathSelection = { step: 1, answers: emptyAnswers(), assessmentComplete: false, assessmentSkipped: false, weeklyTime: '', preferredRole: '', includeCamp: false, outcomeGoal: '', competitionIds: [], includeValidation: false, studentName: '' }
const steps = ['选择课题方向', '查看课题要求', '能力自查（可选）', '确认技能准备', '选择成果验证', '生成项目路径']

function loadState(): PathSelection {
  try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? { ...initialState, ...JSON.parse(saved) } : initialState } catch { return initialState }
}

export function PathBuilder() {
  const [selection, setSelection] = useState<PathSelection>(loadState)
  const project = getProject(selection.projectId)
  const camp = getCamp(project?.campId)
  const result = useMemo(() => project && selection.assessmentComplete ? calculateAssessment(selection.answers, project, selection.preferredRole) : undefined, [project, selection.answers, selection.assessmentComplete, selection.preferredRole])
  const selectedCompetitions = competitions.filter((item) => selection.competitionIds.includes(item.id))

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(selection)) }, [selection])
  useEffect(() => {
    if (selection.step === 5 && project && !selection.competitionIds.length) {
      setSelection((current) => ({ ...current, competitionIds: rankCompetitions(project, current.outcomeGoal).slice(0, 2).map((item) => item.id) }))
    }
  }, [selection.step, selection.competitionIds.length, project])

  const update = (partial: Partial<PathSelection>) => setSelection((current) => ({ ...current, ...partial }))
  const goStep = (step: number) => { update({ step }); window.setTimeout(() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20) }
  const chooseProject = (next: Project) => {
    update({ ...initialState, projectId: next.id, step: 2, answers: emptyAnswers() })
    window.setTimeout(() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20)
  }
  const reset = () => { localStorage.removeItem(STORAGE_KEY); setSelection({ ...initialState, answers: emptyAnswers() }); goStep(1) }
  const toggleCompetition = (id: string) => update({ competitionIds: selection.competitionIds.includes(id) ? selection.competitionIds.filter((item) => item !== id) : [...selection.competitionIds, id] })

  return <section className="builder-section" id="builder">
    <div className="builder-intro"><p className="eyebrow">PATHWAY BUILDER / INTERACTIVE TOOL</p><h2>构建一条真正适合你的<br />工程科研成长路径。</h2><p>从课题兴趣出发，了解能力距离，选择必要的准备与成果延展。全程约 3—5 分钟，能力自查可以跳过。</p></div>
    <div className="builder-shell">
      <aside className="step-sidebar"><div className="step-title"><Compass /><span>PATH BUILDER</span></div>{steps.map((label, index) => { const number = index + 1; const enabled = number === 1 || Boolean(project) && (number <= selection.step || number <= 2); return <button key={label} disabled={!enabled} className={selection.step === number ? 'is-active' : number < selection.step ? 'is-complete' : ''} onClick={() => enabled && goStep(number)}><i>{number < selection.step ? <Check /> : String(number).padStart(2, '0')}</i><span>{label}</span></button> })}<button className="reset-link" onClick={reset}><RotateCcw /> 重新选择</button></aside>
      <div className="mobile-progress"><span>步骤 {selection.step} / 6</span><b>{steps[selection.step - 1]}</b><div><i style={{ width: `${selection.step / 6 * 100}%` }} /></div></div>
      <main className="builder-main">
        {selection.step === 1 && <ProjectExplorer selectedId={selection.projectId} onSelect={chooseProject} />}
        {selection.step === 2 && project && <SkillRequirementMap project={project} result={result} onAssess={() => goStep(3)} onSkip={() => { update({ assessmentSkipped: true, assessmentComplete: false, includeCamp: false }); goStep(4) }} />}
        {selection.step === 3 && project && <SkillAssessment answers={selection.answers} weeklyTime={selection.weeklyTime} preferredRole={selection.preferredRole} onAnswers={(answers) => update({ answers })} onMeta={(weeklyTime, preferredRole) => update({ weeklyTime, preferredRole })} onComplete={() => { const nextResult = calculateAssessment(selection.answers, project, selection.preferredRole); update({ assessmentComplete: true, assessmentSkipped: false, includeCamp: nextResult.level === '探索起步' || nextResult.level === '技术入门' }); goStep(4) }} onSkip={() => { update({ assessmentSkipped: true, assessmentComplete: false, includeCamp: false }); goStep(4) }} />}
        {selection.step === 4 && project && camp && <CampRecommendation project={project} camp={camp} result={result} skipped={selection.assessmentSkipped} included={selection.includeCamp} onChoose={(includeCamp) => update({ includeCamp })} onReassess={() => goStep(3)} onNext={() => goStep(5)} onBack={() => goStep(2)} />}
        {selection.step === 5 && project && <CompetitionMatcher project={project} goal={selection.outcomeGoal} selectedIds={selection.competitionIds} included={selection.includeValidation} onGoal={(outcomeGoal) => update({ outcomeGoal, competitionIds: rankCompetitions(project, outcomeGoal).slice(0, 2).map((item) => item.id) })} onToggle={toggleCompetition} onIncluded={(includeValidation) => update({ includeValidation: includeValidation && selection.competitionIds.length > 0 })} onNext={() => goStep(6)} onBack={() => goStep(4)} />}
        {selection.step === 6 && project && <PathResultCard project={project} camp={camp} competitions={selectedCompetitions} result={result} skipped={selection.assessmentSkipped} includeCamp={selection.includeCamp} includeValidation={selection.includeValidation} studentName={selection.studentName} onName={(studentName) => update({ studentName })} onReset={reset} />}
      </main>
      {selection.step < 6 && <LivePathSummary project={project} camp={camp} competitions={selectedCompetitions} includeCamp={selection.includeCamp} includeValidation={selection.includeValidation} />}
    </div>
  </section>
}
