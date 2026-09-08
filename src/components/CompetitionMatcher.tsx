import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react'
import { outcomeGoals } from '../data/competitions'
import { rankCompetitions } from '../lib/matching'
import type { Project } from '../types'
import { useMemo, useState } from 'react'
import { Modal } from './Modal'

export function CompetitionMatcher({ project, goal, selectedIds, included, onGoal, onToggle, onIncluded, onNext, onBack }: { project: Project; goal: string; selectedIds: string[]; included: boolean; onGoal: (goal: string) => void; onToggle: (id: string) => void; onIncluded: (value: boolean) => void; onNext: () => void; onBack: () => void }) {
  const [showBasis, setShowBasis] = useState(false)
  const [limitMessage, setLimitMessage] = useState(false)
  const ranked = useMemo(() => rankCompetitions(project, goal), [project, goal])
  const toggle = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length >= 2) { setLimitMessage(true); window.setTimeout(() => setLimitMessage(false), 2500); return }
    onToggle(id)
  }
  return <div>
    <div className="builder-title"><p className="eyebrow">STEP 05 / EXTERNAL VALIDATION</p><h2>课题完成后，<br />你希望让成果走向哪里？</h2><p>竞赛和国际展示不是课题的起点，而是成熟成果的外部验证场。你可以暂不选择。</p></div>
    <div className="goal-picker"><h3>你更关注什么？</h3><div className="filter-row">{outcomeGoals.map((item) => <button key={item} className={goal === item ? 'filter-chip is-active' : 'filter-chip'} onClick={() => onGoal(item)}>{item}</button>)}</div></div>
    <div className="match-heading"><span>根据课题属性与目标排序</span><b>至多选择 2 项</b></div>
    {limitMessage && <div className="inline-alert"><Info /> 已选择两项平台。如需替换，请先取消一项。</div>}
    <div className="competition-list">{ranked.map((competition, index) => { const selected = selectedIds.includes(competition.id); return <button key={competition.id} className={selected ? 'competition-card is-selected' : 'competition-card'} onClick={() => toggle(competition.id)}><span className="match-rank">0{index + 1}</span><div><p>{index < 2 ? '系统优先推荐' : '可选平台'}</p><h3>{competition.name}</h3><span>{competition.summary}</span><div className="tag-row">{competition.focus.slice(0, 3).map((tag) => <i className="tag" key={tag}>{tag}</i>)}</div></div><span className="selection-box">{selected && <Check />}</span></button> })}</div>
    <div className="validation-choice"><div><b>成果验证计划</b><span>包含最多2项匹配平台的成果转化与辅导 · 10,000元 / 人</span>{included && selectedIds.length === 1 && <small>当前仅选择1项，价格仍按10,000元显示；正式方案可由顾问进一步确认。</small>}</div><button className={included ? 'toggle is-on' : 'toggle'} onClick={() => onIncluded(!included)} aria-pressed={included}><i /></button></div>
    <div className="choice-actions"><button className="button button--ghost" onClick={() => onIncluded(true)} disabled={!selectedIds.length}>加入成果验证计划</button><button className="button button--ghost" onClick={() => onIncluded(false)}>暂不选择</button><button className="button button--quiet" onClick={() => setShowBasis(true)}><Info /> 查看匹配依据</button></div>
    <div className="step-actions step-actions--spread"><button className="button button--ghost" onClick={onBack}><ArrowLeft /> 返回</button><button className="button button--dark button--large" onClick={onNext}>生成项目路径 <ArrowRight /></button></div>
    {showBasis && <Modal label="平台匹配依据" onClose={() => setShowBasis(false)}><p className="eyebrow">MATCHING LOGIC</p><h2>平台是如何匹配的？</h2><p className="modal-lede">系统综合目标课题的领域标签、成果形态，以及你关注的验证方向进行排序。匹配结果是一份初步建议，不代表参赛资格或结果承诺。</p><div className="basis-list"><div><span>01</span><b>课题属性</b><p>{project.tags.join('、')}</p></div><div><span>02</span><b>成果形态</b><p>{project.output}</p></div><div><span>03</span><b>个人关注</b><p>{goal || '尚未选择'}</p></div></div></Modal>}
  </div>
}
