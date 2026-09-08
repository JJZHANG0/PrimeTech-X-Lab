import { ArrowUpRight, Check, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projects, projectFilters } from '../data/projects'
import type { Project } from '../types'
import { Modal } from './Modal'

function ProjectDetail({ project, onSelect, onClose }: { project: Project; onSelect: () => void; onClose: () => void }) {
  return <Modal label={`${project.name}课题详情`} onClose={onClose} wide>
    <div className="detail-head"><p className="eyebrow">PROJECT FRAMEWORK / {project.difficulty}</p><h2>{project.name}</h2><p>{project.englishName}</p><div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
    <div className="detail-grid">
      <div><h4>课题背景</h4><p>{project.background}</p></div><div><h4>真实用户与场景</h4><p>{project.scenario}</p></div>
      <div className="detail-wide"><h4>核心研究问题</h4><p className="detail-question">{project.question}</p></div>
      <div><h4>初步技术路线</h4><ol>{project.route.map((item) => <li key={item}>{item}</li>)}</ol></div>
      <div><h4>推荐团队角色</h4><ul>{project.roles.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div><h4>前置技能</h4><div className="tag-row">{project.skills.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
      <div><h4>预期成果</h4><p>{project.output}</p></div>
    </div>
    <p className="notice">以上为方向性课题框架，正式研发内容将根据团队基础、技术可行性与导师评估进一步调整。</p>
    <div className="modal-actions"><button className="button button--ghost" onClick={onClose}>继续浏览</button><button className="button button--dark" onClick={onSelect}>选择这个课题 <ArrowUpRight /></button></div>
  </Modal>
}

export function ProjectExplorer({ selectedId, onSelect }: { selectedId?: string; onSelect: (project: Project) => void }) {
  const [filter, setFilter] = useState('全部')
  const [query, setQuery] = useState('')
  const [detail, setDetail] = useState<Project | null>(null)
  const visible = useMemo(() => projects.filter((project) => {
    const matchesFilter = filter === '全部' || project.tags.includes(filter)
    const haystack = [project.name, project.englishName, project.summary, ...project.tags, ...project.skills].join(' ').toLowerCase()
    return matchesFilter && haystack.includes(query.trim().toLowerCase())
  }), [filter, query])

  return <div className="project-explorer">
    <div className="builder-title"><p className="eyebrow">STEP 01 / DEFINE THE QUESTION</p><h2>你想把什么问题，<br />做成一项真正的课题？</h2><p>先从感兴趣的真实问题出发。你的选择将决定后续需要准备的技能，以及适合的成果验证方向。</p></div>
    <label className="search-field"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索课题名称、技术方向或应用场景" /><span><SlidersHorizontal /> {visible.length} 个方向</span></label>
    <div className="filter-row">{projectFilters.map((item) => <button className={filter === item ? 'filter-chip is-active' : 'filter-chip'} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <div className="project-grid">{visible.map((project, index) => <article className={selectedId === project.id ? 'project-card is-selected' : 'project-card'} key={project.id}>
      <div className="card-number">0{index + 1}</div><div className="card-top"><div><span className="difficulty">{project.difficulty}</span><h3>{project.name}</h3><small>{project.englishName}</small></div>{selectedId === project.id && <span className="selected-mark"><Check /></span>}</div>
      <p>{project.summary}</p><div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="project-spec"><span>核心技能</span><b>{project.skills.slice(0, 3).join(' · ')}</b><span>成果形式</span><b>{project.output}</b></div>
      <div className="card-actions"><button className="button button--ghost" onClick={() => setDetail(project)}>查看课题详情</button><button className="button button--dark" onClick={() => onSelect(project)}>{selectedId === project.id ? '已选择' : '选择这个课题'}</button></div>
    </article>)}</div>
    {!visible.length && <div className="empty-state">没有找到对应课题，试试其他关键词或筛选方向。</div>}
    {detail && <ProjectDetail project={detail} onClose={() => setDetail(null)} onSelect={() => { onSelect(detail); setDetail(null) }} />}
  </div>
}
