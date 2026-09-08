import { ArrowRight, ClipboardCheck } from 'lucide-react'
import { dimensions } from '../data/assessment'
import type { AssessmentResult, Project } from '../types'

export function SkillRequirementMap({ project, result, onAssess, onSkip }: { project: Project; result?: AssessmentResult; onAssess: () => void; onSkip: () => void }) {
  return <div>
    <div className="builder-title"><p className="eyebrow">STEP 02 / REQUIREMENT MAP</p><h2>完成这个课题，<br />可能需要哪些能力？</h2><p>这不是门槛清单，而是一张协作地图。不同能力可以由团队成员共同承担。</p></div>
    <div className="requirement-map">{dimensions.map(({ key, label }) => {
      const required = project.requirements[key]
      const current = result?.scores[key]
      const gap = current == null ? null : Math.max(required - current, 0)
      return <div className="requirement-row" key={key}>
        <div><b>{label}</b><span>课题权重 {project.weights[key]}%</span></div>
        <div className="level-track">{[0,1,2,3,4].map((level) => <i key={level} className={level <= required ? 'is-required' : ''} />)}{current != null && <em style={{ left: `${current * 25}%` }} />}</div>
        <div className="requirement-values"><span>要求 {required}/4</span><span>{current == null ? '尚未进行能力自查' : `当前 ${current.toFixed(1)}/4`}</span><b>{gap == null ? '待了解' : gap > .4 ? `建议补齐 ${gap.toFixed(1)}` : '基本匹配'}</b></div>
      </div>
    })}</div>
    <div className="map-legend"><span><i className="legend-black" />课题要求</span><span><i className="legend-purple" />当前能力</span></div>
    <div className="step-actions"><button className="button button--dark button--large" onClick={onAssess}><ClipboardCheck /> 进行3分钟能力自查</button><button className="button button--ghost button--large" onClick={onSkip}>暂时跳过，直接查看建议 <ArrowRight /></button></div>
  </div>
}
