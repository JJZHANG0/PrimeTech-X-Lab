import { ArrowRight, Braces, FlaskConical, ScanSearch } from 'lucide-react'

export function PathwayOverview() {
  return <section className="section pathway-overview" id="system">
    <div className="section-heading split-heading">
      <div><p className="eyebrow">THE PRIME PATHWAY</p><h2>不是三个彼此独立的项目，<br />而是一条围绕课题展开的成长路径。</h2></div>
      <p>能力准备为进入真实研发建立工具基础；课题研发是整条路径的核心；成果验证让成熟作品接受真实世界的反馈。</p>
    </div>
    <div className="module-flow">
      <article className="module-card module-card--side"><span className="module-index">B / PREPARATION</span><Braces /><h3>创客技能营地</h3><p>根据目标课题与个人基础，补齐编程、算法、建模、嵌入式或原型开发能力。</p><ul><li>约50课时</li><li>圣诞或寒假开展</li><li>15,000元 / 人</li><li>非强制参加</li></ul></article>
      <ArrowRight className="flow-arrow" />
      <article className="module-card module-card--core"><span className="module-index">A / CORE MODULE</span><FlaskConical /><h3>课题孵化与研发</h3><p>围绕真实社会问题与未来专业方向，完成调研、设计、开发、测试和成果表达。</p><ul><li>约50课时</li><li>每组最多5人</li><li>25,000元 / 人</li><li>暑期集中研发</li></ul><b className="core-label">整个体系的核心</b></article>
      <ArrowRight className="flow-arrow" />
      <article className="module-card module-card--side"><span className="module-index">C / VALIDATION</span><ScanSearch /><h3>成果验证计划</h3><p>课题完成后匹配国际竞赛、发明展或专业评审平台，获得外部反馈与验证。</p><ul><li>匹配至多2项平台</li><li>约10—20课时</li><li>10,000元 / 人</li><li>非强制参加</li></ul></article>
    </div>
  </section>
}
