import { ArrowUpRight, BookOpen, FileCheck2, Layers3 } from 'lucide-react'

const values = [
  ['01', '从兴趣走向真实问题', '不是从一场比赛或一个奖项倒推项目，而是从学生真正关心的问题出发，形成值得持续研究的课题方向。'],
  ['02', '从知识学习走向工程成果', '学生不仅学习知识，还通过设计、开发、实验、测试与迭代，将想法转化为可以运行、验证和展示的成果。'],
  ['03', '从单一经历走向成长主线', '技能营地、课题研发与成果验证围绕同一方向连续展开，形成更连贯、更真实、更有个人辨识度的成长经历。'],
]

const curricula = [
  ['AP Computer Science', '编程、算法、系统开发'], ['AP Physics', '力学、电学、实验与工程验证'], ['AP Statistics', '数据分析、实验设计与结果解释'], ['IB Design Technology', '产品设计、原型制作与迭代'], ['IB Computer Science', '计算思维、软件与系统开发'], ['IB Business Management', '用户需求、商业模式与项目管理'], ['A-Level Computer Science', '编程、数据结构与计算系统'], ['A-Level Physics', '工程建模、物理原理与实验研究'], ['A-Level Design & Technology', '结构设计、制造与产品开发'],
]

const evidence = ['可运行的工程原型或系统 Demo', '研究报告、实验记录与测试数据', '产品设计图、系统架构或技术文档', '明确的团队职责与个人贡献记录', '项目展示、英文路演与答辩材料', '外部评审或真实用户反馈的迭代过程']

export function ContentSections() {
  return <>
    <section className="section value-section"><div className="section-heading"><p className="eyebrow">WHY REAL PROJECTS MATTER</p><h2>学习的终点，不是知道。<br />是把一个想法真正做出来。</h2></div><div className="value-grid">{values.map(([number, title, copy], index) => <article key={number}><span>{number}</span>{index === 0 ? <BookOpen /> : index === 1 ? <Layers3 /> : <FileCheck2 />}<h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="curriculum-section section"><div className="curriculum-copy"><p className="eyebrow">CURRICULUM CONNECTION</p><h2>让课堂知识，<br />在真实项目中发生连接。</h2><p>PrimeTech X Lab 不替代校内课程，而是为学生提供一个真实应用课堂知识的工程场景。</p></div><div className="curriculum-list">{curricula.map(([subject, link]) => <div key={subject}><b>{subject}</b><ArrowUpRight /><span>{link}</span></div>)}</div></section>
    <section className="section evidence-section" id="outcomes"><div className="section-heading split-heading"><div><p className="eyebrow">EVIDENCE OF GROWTH</p><h2>一项好的课题，<br />会留下可以被看见的证据。</h2></div><p>真正有价值的不是简单罗列活动名称，而是能够清楚说明：发现了什么问题、承担了什么任务、如何进行技术决策，以及最终做出了什么可以被验证的成果。</p></div><div className="evidence-grid">{evidence.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div><p className="evidence-note">适用于关注计算机科学、人工智能、机械工程、电子工程、生物医学工程、产品设计及跨学科方向的学生。</p></section>
  </>
}
