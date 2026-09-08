import { ChevronUp, FlaskConical } from 'lucide-react'
import { useState } from 'react'
import { calculatePath, formatCurrency } from '../lib/pricingCalculator'
import type { Camp, Competition, Project } from '../types'

export function LivePathSummary({ project, camp, competitions, includeCamp, includeValidation }: { project?: Project; camp?: Camp; competitions: Competition[]; includeCamp: boolean; includeValidation: boolean }) {
  const [open, setOpen] = useState(false)
  const totals = calculatePath(includeCamp, includeValidation)
  return <aside className={open ? 'live-summary is-open' : 'live-summary'}>
    <button className="summary-mobile-head" onClick={() => setOpen(!open)}><span><FlaskConical /> 当前项目路径</span><b>{project ? formatCurrency(totals.price) : '尚未选择'}</b><ChevronUp /></button>
    <div className="summary-body"><div className="summary-head"><p className="eyebrow">MY PRIME PATH</p><h3>当前项目路径</h3><span>选择变化会实时更新</span></div>
      <div className="summary-stack">
        <div className="summary-item is-core"><i>A</i><div><span>目标课题 · 核心</span><b>{project?.name ?? '等待选择课题'}</b>{project && <small>{project.tags.join(' · ')}</small>}</div></div>
        <div className={includeCamp ? 'summary-item' : 'summary-item is-muted'}><i>B</i><div><span>推荐技能准备</span><b>{project ? includeCamp ? camp?.name : '暂不加入' : '选择课题后生成'}</b></div></div>
        <div className={includeValidation ? 'summary-item' : 'summary-item is-muted'}><i>C</i><div><span>成果验证平台</span><b>{includeValidation && competitions.length ? competitions.map((item) => item.name).join(' · ') : '暂不加入'}</b></div></div>
      </div>
      <div className="summary-totals"><div><span>预计学习阶段</span><b>{1 + Number(includeCamp) + Number(includeValidation)} 个阶段</b></div><div><span>总课时</span><b>{project ? `${totals.hoursMin}${totals.hoursMax !== totals.hoursMin ? `—${totals.hoursMax}` : ''} 课时` : '—'}</b></div><div className="price-row"><span>项目投入</span><b>{project ? formatCurrency(totals.price) : '—'} <small>/ 人</small></b></div></div>
      <p className="summary-note">具体时间、团队安排与课题内容以正式评估结果为准。</p>
    </div>
  </aside>
}
