import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { dimensions } from '../data/assessment'
import type { AssessmentResult, Camp, Project } from '../types'

export function AssessmentResultBlock({ result, project }: { result: AssessmentResult; project: Project }) {
  return <div className="assessment-result">
    <div className="result-copy"><p className="eyebrow">YOUR STARTING POINT</p><h3>{result.level}</h3><p>{result.description}</p><div className="result-facts"><div><span>能力优势</span><b>{dimensions.find((item) => item.key === result.strength)?.label}</b></div><div><span>优先关注</span><b>{result.gaps.map((key) => dimensions.find((item) => item.key === key)?.label).join(' · ')}</b></div><div><span>推荐角色</span><b>{result.role}</b></div></div></div>
    <div className="ability-bars">{dimensions.map(({ key, label }) => <div key={key}><span>{label}</span><div><i style={{ width: `${(project.requirements[key] / 4) * 100}%` }} /><em style={{ width: `${(result.scores[key] / 4) * 100}%` }} /></div><b>{result.scores[key].toFixed(1)}</b></div>)}<p><span><i className="legend-black" />课题要求</span><span><i className="legend-purple" />你的当前能力</span></p></div>
  </div>
}

export function CampRecommendation({ project, camp, result, skipped, included, onChoose, onReassess, onNext, onBack }: { project: Project; camp: Camp; result?: AssessmentResult; skipped: boolean; included: boolean; onChoose: (value: boolean) => void; onReassess: () => void; onNext: () => void; onBack: () => void }) {
  const guidance = skipped ? '你尚未完成能力自查，可根据课题常规要求选择能力准备。' : result?.level === '探索起步' || result?.level === '技术入门' ? '根据你的目标课题与当前基础，我们建议先进行能力准备。' : result?.level === '项目进阶' ? '你可以直接进入课题，也可以通过营地强化技术角色。' : '你已具备直接进入课题研发的主要基础，技能营地不是必要选项。'
  return <div>
    <div className="builder-title"><p className="eyebrow">STEP 04 / PREPARATION</p><h2>是否需要先完成<br />能力准备？</h2><p>{guidance}</p></div>
    {result && <AssessmentResultBlock result={result} project={project} />}
    <article className={included ? 'camp-card is-selected' : 'camp-card'}>
      <div className="camp-main"><div className="camp-match"><span>与目标课题匹配</span><strong>{result?.level === '独立实践' ? '可选强化' : '高度匹配'}</strong></div><p className="eyebrow">RECOMMENDED CAMP</p><h3>{camp.name}</h3><small>{camp.englishName}</small><p>{camp.summary}</p><div className="tag-row">{camp.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></div>
      <div className="camp-meta"><div><span>预计产出</span><b>{camp.output}</b></div><div><span>学习安排</span><b>{camp.season} · 约{camp.hours}课时</b></div><div><span>项目投入</span><b>¥{camp.price.toLocaleString('zh-CN')} / 人</b></div></div>
    </article>
    <div className="choice-actions"><button className={included ? 'button button--dark' : 'button button--ghost'} onClick={() => onChoose(true)}>{included && <Check />} 加入我的成长路径</button><button className={!included ? 'button button--dark' : 'button button--ghost'} onClick={() => onChoose(false)}>暂不选择，直接进入课题</button><button className="button button--quiet" onClick={onReassess}><RotateCcw /> 重新进行能力自查</button></div>
    <div className="step-actions step-actions--spread"><button className="button button--ghost" onClick={onBack}><ArrowLeft /> 返回</button><button className="button button--dark button--large" onClick={onNext}>继续选择成果验证 <ArrowRight /></button></div>
  </div>
}
