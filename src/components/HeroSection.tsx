import { ArrowDownRight, ArrowRight, Boxes, CircleDot, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'

function SystemVisual() {
  return <div className="system-visual" aria-label="技能、课题与成果之间的工程系统示意图">
    <div className="visual-coordinates">X.114 / Y.072<br />PATH SYSTEM · 01</div>
    <div className="visual-grid" />
    <motion.div className="visual-orbit" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} />
    <div className="visual-node visual-node--left"><span>B / PREP</span><Code2 /><small>能力准备</small></div>
    <div className="visual-node visual-node--center"><span>A / CORE</span><Boxes /><strong>课题研发</strong><small>RESEARCH & BUILD</small></div>
    <div className="visual-node visual-node--right"><span>C / PROOF</span><CircleDot /><small>成果验证</small></div>
    <div className="visual-line visual-line--a" /><div className="visual-line visual-line--b" />
    <span className="purple-dot dot-1" /><span className="purple-dot dot-2" /><span className="purple-dot dot-3" />
    <div className="visual-footer"><span>INPUT: CURIOSITY</span><span>OUTPUT: EVIDENCE</span></div>
  </div>
}

export function HeroSection({ onStart }: { onStart: () => void }) {
  return <section className="hero section" id="top">
    <div className="hero-copy">
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>FROM CURIOSITY TO ENGINEERED OUTCOMES</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}>从一个真实问题开始，<br />完成一项真正属于你的<span>工程课题。</span></motion.h1>
      <motion.p className="hero-lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .18 }}>PrimeTech X Lab 以课题研发为核心，根据学生现有能力、专业兴趣与发展目标，匹配前置技能训练与成果验证平台，构建由浅入深、彼此衔接的科研成长路径。</motion.p>
      <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>
        <button className="button button--dark button--large" onClick={onStart}>开始构建我的路径 <ArrowRight /></button>
        <button className="button button--ghost button--large" onClick={() => document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })}>先了解项目体系 <ArrowDownRight /></button>
      </motion.div>
    </div>
    <motion.div className="hero-visual-wrap" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }}><SystemVisual /></motion.div>
    <div className="hero-metrics">
      {['真实课题驱动', '跨学科工程实践', '可运行成果验证'].map((item, index) => <div key={item}><span>0{index + 1}</span>{item}</div>)}
    </div>
  </section>
}
