import { Check, Copy, MessageSquare, Printer, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { generateAdvice, generateCopyText } from '../lib/summaryGenerator'
import { calculatePath, formatCurrency } from '../lib/pricingCalculator'
import type { AssessmentResult, Camp, Competition, Project } from '../types'
import { BrandMark } from './BrandMark'
import { Modal } from './Modal'

type Props = { project: Project; camp?: Camp; competitions: Competition[]; result?: AssessmentResult; skipped: boolean; includeCamp: boolean; includeValidation: boolean; studentName: string; onName: (value: string) => void; onReset: () => void }

export function PathResultCard(props: Props) {
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)
  const totals = calculatePath(props.includeCamp, props.includeValidation)
  const hours = `${totals.hoursMin}${totals.hoursMax !== totals.hoursMin ? `—${totals.hoursMax}` : ''} 课时`
  const summaryInput = useMemo(() => ({ ...props, price: totals.price, hours }), [props, totals.price, hours])
  const advice = generateAdvice(summaryInput)
  const copy = async () => { await navigator.clipboard.writeText(generateCopyText(summaryInput)); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
  const title = props.includeCamp ? '从技能准备，到完成一项真实课题。' : props.includeValidation ? '让课题从实验室出发，接受更真实的外部验证。' : '你已建立以真实课题为核心的研发路径。'

  return <div className="result-page">
    <div className="builder-title result-title"><p className="eyebrow">STEP 06 / YOUR PRIME PATH</p><h2>你的项目路径已经生成：<br />{title}</h2><p>这是一份基于当前选择生成的初步路径建议，可保存后与家长、老师或项目顾问一起讨论。</p></div>
    <article className="path-result-card" id="printable-path">
      <header><BrandMark /><div><span>PERSONAL PROJECT PATHWAY</span><b>NO. {props.project.id.toUpperCase()} / 2026</b></div></header>
      <div className="result-identity"><label>学生姓名（选填）<input value={props.studentName} onChange={(event) => props.onName(event.target.value)} placeholder="填写姓名" /></label><div><span>当前能力阶段</span><b>{props.result?.level ?? '尚未自查'}</b></div><div><span>推荐团队角色</span><b>{props.result?.role ?? '待导师评估'}</b></div></div>
      <section className="result-project"><span>A / CORE RESEARCH</span><h2>{props.project.name}</h2><p>{props.project.englishName}</p><div className="tag-row">{props.project.tags.map((tag) => <i className="tag" key={tag}>{tag}</i>)}</div><strong>预期成果 · {props.project.output}</strong></section>
      <section className="result-timeline">
        {props.includeCamp && props.camp && <div><span className="timeline-season">寒假</span><i>B</i><div><small>能力准备 · 约50课时</small><b>{props.camp.name}</b><p>{props.camp.output}</p></div></div>}
        <div><span className="timeline-season">暑假</span><i>A</i><div><small>核心研发 · 约50课时</small><b>课题孵化与研发</b><p>调研、设计、开发、测试与成果表达</p></div></div>
        {props.includeValidation && <div><span className="timeline-season">赛事周期</span><i>C</i><div><small>成果验证 · 约10—20课时</small><b>成果验证计划</b><p>{props.competitions.map((item) => item.name).join(' · ')}</p></div></div>}
      </section>
      <section className="result-advice"><span>PERSONALISED NOTE</span><h3>个性化路径建议</h3><p>{advice}</p></section>
      <footer><div><span>完整学习投入</span><b>{hours}</b></div><div><span>项目投入</span><b>{formatCurrency(totals.price)} <small>/ 人</small></b></div></footer>
      <p className="result-disclaimer">具体时间、团队安排与课题内容以正式评估结果为准。本路径不构成竞赛结果、升学录取或项目成果承诺。</p>
    </article>
    <div className="result-actions"><button className="button button--dark" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? '已复制' : '复制路径摘要'}</button><button className="button button--ghost" onClick={() => window.print()}><Printer /> 保存为PDF</button><button className="button button--ghost" onClick={props.onReset}><RotateCcw /> 重新构建</button><button className="button button--ghost" onClick={() => setContact(true)}><MessageSquare /> 与项目顾问进一步讨论</button></div>
    {contact && <Modal label="与项目顾问进一步讨论" onClose={() => setContact(false)}><p className="eyebrow">NEXT CONVERSATION</p><h2>带着路径，继续讨论。</h2><p className="modal-lede">你可以将这份项目路径保存或发送给项目顾问，以进一步确认课题内容、时间安排与团队匹配。</p><div className="contact-panel"><div className="qr-placeholder"><span>企业微信</span><i /><small>二维码占位</small></div><div><span>联系方式</span><b>请联系 PrimeTech X Lab 项目顾问</b><p>正式联系方式与企业微信将在发布前配置。</p><button className="button button--dark" onClick={copy}><Copy /> 复制路径信息</button></div></div></Modal>}
  </div>
}
