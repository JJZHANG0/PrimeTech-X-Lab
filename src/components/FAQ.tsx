import { Plus } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  ['是否所有学生都必须参加技能营地？', '不是。技能营地是根据目标课题与学生当前基础选择的前置支持。具备相应能力的学生可以直接进入课题研发。'],
  ['没有编程基础可以参加课题研发吗？', '可以。不同课题对编程的要求不同，团队也包含多种角色。建议先完成能力自查，再判断是否需要前置准备。'],
  ['能力自查结果会影响报名吗？', '不会。自查用于了解起点、匹配学习支持和团队角色，不是选拔考试，也不评价个人潜力。'],
  ['每个课题组有多少人？', '每个课题组最多5人，实际人数与角色配置会根据课题难度和学生基础确认。'],
  ['学生如何确定自己在团队中的角色？', '系统会根据能力优势和个人偏好提供初步建议，最终角色由学生、导师和团队结合项目任务共同确认。'],
  ['课题一定会形成实物原型吗？', '不一定。成果可能是工程原型、系统 Demo、实验装置或研究报告，取决于课题属性与技术路线。'],
  ['是否必须参加竞赛？', '不必须。成果验证是可选延展，课题研发本身始终是整条路径的核心。'],
  ['为什么竞赛被定义为成果验证？', '竞赛或展示平台的价值在于让成熟成果接受外部标准、专家或用户的反馈，而不是倒推课题方向。'],
  ['竞赛辅导是否承诺晋级或获奖？', '不承诺。平台评审具有不确定性，辅导聚焦于成果整理、验证、表达与提交质量。'],
  ['课题方向后续可以调整吗？', '可以。正式研发内容会根据团队基础、技术可行性与导师评估进一步调整。'],
  ['AP、IB和A-Level学生都适合参加吗？', '适合。不同课程中的编程、物理、统计、设计与商业知识都可以在工程项目中形成真实连接。'],
  ['网站生成的路径是否等同于最终教学方案？', '网站结果是一份初步路径建议。正式课题、技能营地、团队角色与时间安排仍需结合学生基础、导师评估及项目实际情况进一步确认。'],
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return <section className="section faq-section" id="faq"><div className="section-heading"><p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2>关于项目路径，<br />你可能还想了解。</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={open === index ? 'faq-item is-open' : 'faq-item'} key={question}><button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}><span>{String(index + 1).padStart(2, '0')}</span><b>{question}</b><Plus /></button><div><p>{answer}</p></div></div>)}</div></section>
}
