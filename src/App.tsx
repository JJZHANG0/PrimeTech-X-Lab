import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  ExternalLink,
  ImageIcon,
  LockKeyhole,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import {
  camps,
  competitions,
  compatibleCompetitionIds,
  majors,
  projects,
  type Camp,
  type Competition,
  type Project,
} from './data/catalog'

type Screen = 'welcome' | 'profile' | 'intro-project' | 'project' | 'quiz' | 'intro-camp' | 'camp' | 'intro-competition' | 'competition' | 'result'
type Poster = { url: string; blob: Blob }

const gradeOptions = ['八年级', '九年级', '十年级', '十一年级', '十二年级']

const quizQuestions = [
  {
    title: '你独立完成过一个项目吗？',
    options: [
      { label: '还没有，这是第一次', score: 0 },
      { label: '参与过一小部分', score: 1 },
      { label: '完成过课程或社团项目', score: 2 },
      { label: '做过完整原型并展示过', score: 3 },
    ],
  },
  {
    title: '面对编程、硬件或实验，你现在的状态是？',
    options: [
      { label: '需要从基础开始', score: 0 },
      { label: '了解概念，但不太会动手', score: 1 },
      { label: '可以跟着资料完成', score: 2 },
      { label: '能够自己拆解和解决问题', score: 3 },
    ],
  },
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo${compact ? ' logo--compact' : ''}`} aria-label="PrimeTech X Lab">
      <span>PrimeTech</span><b>X</b><span>Lab</span>
    </div>
  )
}

function StepHeader({ step, onReset }: { step: number; onReset: () => void }) {
  return (
    <header className="topbar">
      <Logo compact />
      <div className="step-indicator" aria-label={`第 ${step} 步，共 3 步`}>
        {[1, 2, 3].map((item) => <i key={item} className={item <= step ? 'is-active' : ''} />)}
        <span>{step} / 3</span>
      </div>
      <button className="round-button" aria-label="重新开始" onClick={onReset}><RotateCcw /></button>
    </header>
  )
}

function DetailSheet({ label, title, titleAside, children, action, onClose }: {
  label: string
  title: string
  titleAside?: React.ReactNode
  children: React.ReactNode
  action?: React.ReactNode
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose])

  return (
    <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.section className="sheet" role="dialog" aria-modal="true" aria-labelledby="detail-title" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }} onMouseDown={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <button className="round-button sheet-close" onClick={onClose} aria-label="关闭"><X /></button>
        <p className="kicker">{label}</p>
        <div className="sheet-title-row"><h2 id="detail-title">{title}</h2>{titleAside}</div>
        {children}
        {action}
      </motion.section>
    </motion.div>
  )
}

function PageHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="page-heading">
      <p className="kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </div>
  )
}

function BottomAction({ children }: { children: React.ReactNode }) {
  return <div className="bottom-action">{children}</div>
}

function StepIntro({ eyebrow, title, copy, action, onContinue, onBack }: {
  eyebrow: string
  title: React.ReactNode
  copy: string
  action: string
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <motion.section key={eyebrow} className="step-intro" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
      <header><button className="round-button" onClick={onBack} aria-label="返回"><ArrowLeft /></button><Logo compact /><span /></header>
      <div className="step-intro-copy"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>
      <button className="primary-button" onClick={onContinue}>{action}<ArrowRight /></button>
    </motion.section>
  )
}

function getAssessment(score: number | null) {
  if (score === null) return null
  if (score <= 1) return { title: '刚刚起步', note: '适合在导师陪伴下建立方法、动手完成第一次完整项目闭环。', tone: 'starter' }
  if (score <= 3) return { title: '已有基础', note: '适合通过密集实践强化工程能力，把零散经验变成完整证据链。', tone: 'growing' }
  return { title: '可以直接推进', note: '你已经具备较好的项目基础，营地可作为专项强化。', tone: 'ready' }
}

function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 20) {
  const characters = Array.from(text)
  let line = ''
  let currentY = y
  let lines = 0
  for (const character of characters) {
    const test = line + character
    if (context.measureText(test).width > maxWidth && line) {
      context.fillText(line, x, currentY)
      line = character
      currentY += lineHeight
      lines += 1
      if (lines >= maxLines - 1) break
    } else {
      line = test
    }
  }
  if (line && lines < maxLines) {
    context.fillText(line, x, currentY)
    currentY += lineHeight
  }
  return currentY
}

async function makePoster(project: Project, camp: Camp | null, selectedCompetitions: Competition[], assessment: ReturnType<typeof getAssessment>, nickname: string, grade: string): Promise<Poster> {
  await document.fonts?.ready
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const context = canvas.getContext('2d')!
  const margin = 82

  context.fillStyle = '#f5f1fb'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#6c3be7'
  context.fillRect(0, 0, 18, canvas.height)
  context.fillStyle = '#17151b'
  context.fillRect(0, 0, canvas.width, 420)
  context.fillStyle = '#6c3be7'
  context.beginPath()
  context.arc(910, 66, 210, 0, Math.PI * 2)
  context.fill()
  context.globalAlpha = .24
  context.strokeStyle = '#fff'
  context.lineWidth = 2
  context.beginPath()
  context.arc(860, 74, 310, 0, Math.PI * 2)
  context.stroke()
  context.globalAlpha = 1

  context.fillStyle = '#fff'
  context.font = '700 43px Manrope, Noto Sans SC, sans-serif'
  context.fillText('PrimeTech', margin, 92)
  context.fillStyle = '#a985ff'
  context.fillText('X', 306, 92)
  context.fillStyle = '#fff'
  context.fillText('Lab', 347, 92)
  context.font = '600 25px Noto Sans SC, sans-serif'
  context.fillStyle = '#b9b3c3'
  context.fillText('为你定制的自主规划路线', margin, 166)
  context.font = '700 61px Noto Sans SC, sans-serif'
  context.fillStyle = '#fff'
  wrapText(context, `${nickname} 的创新成长方案`, margin, 254, 780, 72, 2)
  context.fillStyle = '#cdbdff'
  context.font = '700 25px Noto Sans SC, sans-serif'
  context.textAlign = 'right'
  context.fillText(grade, canvas.width - margin, 342)
  context.textAlign = 'left'
  context.font = '500 24px Manrope, sans-serif'
  context.fillStyle = '#aaa3b4'
  context.fillText('MY INNOVATION PATHWAY', margin, 370)

  const card = (top: number, index: string, label: string, title: string, summary: string) => {
    context.fillStyle = '#fff'
    context.beginPath()
    context.roundRect(margin, top, canvas.width - margin * 2, 304, 34)
    context.fill()
    context.fillStyle = '#6c3be7'
    context.font = '700 25px Manrope, sans-serif'
    context.fillText(index, margin + 40, top + 54)
    context.fillStyle = '#817b87'
    context.font = '600 23px Noto Sans SC, sans-serif'
    context.fillText(label, margin + 92, top + 54)
    context.fillStyle = '#17151b'
    context.font = '700 34px Noto Sans SC, sans-serif'
    const afterTitle = wrapText(context, title, margin + 40, top + 118, canvas.width - margin * 2 - 80, 46, 2)
    context.font = '500 20px Noto Sans SC, sans-serif'
    context.fillStyle = '#706a76'
    wrapText(context, summary, margin + 40, Math.max(top + 210, afterTitle + 24), canvas.width - margin * 2 - 80, 30, 2)
  }

  card(472, '01', '研究课题', project.title, project.description)
  card(806, '02', '七天项目营地', camp?.name ?? '已跳过营地', camp?.description ?? '保留自主推进节奏；需要集中训练时，仍可回来补选适配营地。')
  card(1140, '03', '竞赛方向', selectedCompetitions.length ? selectedCompetitions.map((item) => item.shortName).join('  ×  ') : '已跳过竞赛', selectedCompetitions.length ? selectedCompetitions.map((item) => item.description).join('；') : '先把课题做扎实，未来可根据成果形态补充更合适的展示舞台。')

  context.fillStyle = '#fff0d9'
  context.beginPath()
  context.roundRect(margin, 1480, canvas.width - margin * 2, 168, 30)
  context.fill()
  context.fillStyle = '#c16b16'
  context.font = '700 22px Noto Sans SC, sans-serif'
  context.fillText('自我认知', margin + 38, 1532)
  context.fillStyle = '#17151b'
  context.font = '700 34px Noto Sans SC, sans-serif'
  context.fillText(assessment?.title ?? '待完成 · 可选', margin + 38, 1586)
  context.font = '500 20px Noto Sans SC, sans-serif'
  context.fillStyle = '#756d80'
  wrapText(context, assessment?.note ?? '随时可以回来，用 1 分钟了解自己的项目起点。', margin + 38, 1624, canvas.width - margin * 2 - 76, 30, 2)

  context.fillStyle = '#17151b'
  context.font = '700 24px Manrope, sans-serif'
  context.fillText('PRIMETECH X LAB', margin, 1780)
  context.fillStyle = '#817b87'
  context.font = '500 20px Noto Sans SC, sans-serif'
  context.fillText('从兴趣出发，把想法做成真实成果', margin, 1824)
  context.textAlign = 'right'
  context.fillText(new Date().toLocaleDateString('zh-CN'), canvas.width - margin, 1824)
  context.textAlign = 'left'

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error('海报生成失败')), 'image/png'))
  return { blob, url: URL.createObjectURL(blob) }
}

export default function App() {
  const [splash, setSplash] = useState(true)
  const [screen, setScreen] = useState<Screen>('welcome')
  const [nickname, setNickname] = useState('')
  const [grade, setGrade] = useState('')
  const [selectedMajors, setSelectedMajors] = useState<string[]>([])
  const [majorFilterOpen, setMajorFilterOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [customProjectTitle, setCustomProjectTitle] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedCampId, setSelectedCampId] = useState<string | null>(null)
  const [selectedCompetitionIds, setSelectedCompetitionIds] = useState<string[]>([])
  const [detailProject, setDetailProject] = useState<Project | null>(null)
  const [detailCamp, setDetailCamp] = useState<Camp | null>(null)
  const [detailCompetition, setDetailCompetition] = useState<Competition | null>(null)
  const [previewProject, setPreviewProject] = useState<Project | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizReturn, setQuizReturn] = useState<'camp' | 'result'>('camp')
  const [poster, setPoster] = useState<Poster | null>(null)
  const [posterBusy, setPosterBusy] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setSplash(false), 2800)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => { if (poster) URL.revokeObjectURL(poster.url) }, [poster])

  const customProject: Project | null = customProjectTitle.trim() ? { id: 'custom', title: customProjectTitle.trim(), majors: selectedMajors.length ? selectedMajors : ['自主命题'], description: '这是由学生自主提出的研究方向。后续可以继续补充研究问题、目标用户、技术路径、验证方式与预期成果，逐步把想法发展成可执行的项目方案。', campIds: [] } : null
  const selectedProject = selectedProjectId === 'custom' ? customProject : projects.find((project) => project.id === selectedProjectId) ?? null
  const selectedCamp = camps.find((camp) => camp.id === selectedCampId) ?? null
  const selectedCompetitions = selectedCompetitionIds.map((id) => competitions.find((item) => item.id === id)).filter((item): item is Competition => Boolean(item))
  const compatibleCompetitions = selectedProject ? compatibleCompetitionIds(selectedProject) : []
  const rankedCamps = useMemo(() => selectedProject ? [...camps].sort((a, b) => Number(selectedProject.campIds.includes(b.id)) - Number(selectedProject.campIds.includes(a.id))) : camps, [selectedProject])
  const quizScore = quizAnswers.length === quizQuestions.length ? quizAnswers.reduce((total, score) => total + score, 0) : null
  const assessment = getAssessment(quizScore)

  const visibleProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return projects.filter((project) => {
      const majorMatch = selectedMajors.length === 0 || selectedMajors.some((item) => project.majors.includes(item))
      const queryMatch = !normalized || `${project.title}${project.majors.join('')}`.toLowerCase().includes(normalized)
      return majorMatch && queryMatch
    })
  }, [selectedMajors, query])

  const reset = () => {
    setScreen('welcome')
    setNickname('')
    setGrade('')
    setSelectedMajors([])
    setQuery('')
    setCustomProjectTitle('')
    setSelectedProjectId(null)
    setSelectedCampId(null)
    setSelectedCompetitionIds([])
    setQuizIndex(0)
    setQuizAnswers([])
    setPoster(null)
  }

  const selectProject = (project: Project) => {
    if (project.id !== selectedProjectId) {
      setSelectedCampId(null)
      setSelectedCompetitionIds([])
    }
    setSelectedProjectId(project.id)
    setDetailProject(null)
  }

  const selectCustomProject = () => {
    if (!customProject) return
    if (selectedProjectId !== 'custom') {
      setSelectedCampId(null)
      setSelectedCompetitionIds([])
    }
    setSelectedProjectId('custom')
  }

  const answerQuiz = (score: number) => {
    const next = [...quizAnswers.slice(0, quizIndex), score]
    setQuizAnswers(next)
    if (quizIndex === quizQuestions.length - 1) {
      setScreen(quizReturn === 'camp' ? 'intro-camp' : 'result')
      setQuizIndex(0)
    } else {
      setQuizIndex((current) => current + 1)
    }
  }

  const toggleCompetition = (id: string) => {
    if (!compatibleCompetitions.includes(id)) return
    setSelectedCompetitionIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 2 ? [...current, id] : current)
  }

  const createPoster = async () => {
    if (!selectedProject) return
    setPosterBusy(true)
    try {
      if (poster) URL.revokeObjectURL(poster.url)
      setPoster(await makePoster(selectedProject, selectedCamp, selectedCompetitions, assessment, nickname, grade))
    } finally {
      setPosterBusy(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {splash && (
          <motion.div className="splash" exit={{ opacity: 0 }} transition={{ duration: .45 }}>
            <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.94, 1, 1, 1.03] }} transition={{ duration: 2.55, times: [0, .22, .78, 1] }}>
              <Logo />
              <span className="splash-line" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="app-shell">
        <AnimatePresence mode="wait">
          {screen === 'welcome' && (
            <motion.section key="welcome" className="welcome" initial={{ opacity: 0 }} animate={{ opacity: splash ? 0 : 1 }} exit={{ opacity: 0, x: -12 }}>
              <header><Logo compact /></header>
              <div className="welcome-copy">
                <p className="kicker">PrimeTech X Lab</p>
                <h1>请开始你的<br />自主规划路线</h1>
                <p>选择一个感兴趣的课题，我们会继续匹配营地与竞赛。</p>
              </div>
              <button className="primary-button" onClick={() => setScreen('profile')}>开始规划<ArrowRight /></button>
            </motion.section>
          )}

          {screen === 'profile' && (
            <motion.section key="profile" className="profile-page" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <header><button className="round-button" onClick={() => setScreen('welcome')} aria-label="返回"><ArrowLeft /></button><Logo compact /><span /></header>
              <div className="profile-copy"><p className="kicker">开始前 · 学生信息</p><h1>先认识一下你</h1><p>填写昵称与当前年级，我们会把它写进最后的专属规划方案。</p></div>
              <div className="profile-form">
                <label className="text-field"><span>你的昵称</span><div><UserRound /><input value={nickname} onChange={(event) => setNickname(event.target.value.slice(0, 16))} placeholder="例如：Alex" autoComplete="nickname" /></div></label>
                <fieldset><legend>当前年级</legend><div className="grade-options">{gradeOptions.map((item) => <button key={item} type="button" className={grade === item ? 'is-selected' : ''} onClick={() => setGrade(item)}>{grade === item && <Check />}{item}</button>)}</div></fieldset>
              </div>
              <button className="primary-button" disabled={!nickname.trim() || !grade} onClick={() => setScreen('intro-project')}>进入第一步<ArrowRight /></button>
            </motion.section>
          )}

          {screen === 'intro-project' && <StepIntro eyebrow="第一步 · 研究方向" title={<>先找到一个<br />真正想做的课题</>} copy="按专业快速筛选，点击标题了解内容，再选出一个你愿意持续投入的方向。" action="开始选择课题" onContinue={() => setScreen('project')} onBack={() => setScreen('welcome')} />}

          {screen === 'project' && (
            <motion.section key="project" className="planner" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <StepHeader step={1} onReset={reset} />
              <PageHeading eyebrow="第一步 · 选择课题" title="你想研究什么？" copy="按专业筛选，也可以直接浏览全部课题。点标题查看介绍。" />
              <div className="filters">
                <button className={`filter-trigger${selectedMajors.length ? ' has-value' : ''}`} onClick={() => setMajorFilterOpen(true)}><SlidersHorizontal /><span><small>适配专业 · 可多选</small><b>{selectedMajors.length ? `已选 ${selectedMajors.length} 项` : '全部专业'}</b></span><ChevronRight /></button>
                <label className="search-box"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索课题" aria-label="搜索课题" /></label>
              </div>
              {selectedMajors.length > 0 && <div className="active-filters">{selectedMajors.map((item) => <button key={item} onClick={() => setSelectedMajors((current) => current.filter((majorItem) => majorItem !== item))}>{item}<X /></button>)}<button className="clear-filter" onClick={() => setSelectedMajors([])}>清空</button></div>}
              <p className="result-count">{visibleProjects.length} 个课题</p>
              <div className="project-list">
                {visibleProjects.map((project) => {
                  const selected = selectedProjectId === project.id
                  return (
                    <article key={project.id} className={`project-row${selected ? ' is-selected' : ''}`}>
                      <button className="project-info" onClick={() => setDetailProject(project)}>
                        <span className="project-title">{project.title}</span>
                        <span className="tags">{project.majors.slice(0, 3).map((item) => <i key={item}>{item}</i>)}</span>
                      </button>
                      <button className="select-circle" onClick={() => selectProject(project)} aria-label={`选择${project.title}`}>{selected ? <Check /> : <ChevronRight />}</button>
                    </article>
                  )
                })}
              </div>
              <section className={`custom-project${selectedProjectId === 'custom' ? ' is-selected' : ''}`}>
                <div className="custom-project-heading"><span><Plus /></span><div><b>没有找到合适的？我有自己的课题想法</b><small>DIY 自主命题，不受列表限制</small></div></div>
                <textarea value={customProjectTitle} onChange={(event) => setCustomProjectTitle(event.target.value.slice(0, 80))} placeholder="用一句话写下你想研究或解决的问题…" rows={3} />
                <button disabled={!customProjectTitle.trim()} onClick={selectCustomProject}>{selectedProjectId === 'custom' ? <><Check />已使用这个自主课题</> : <>使用我的课题<ArrowRight /></>}</button>
              </section>
              <BottomAction><button className="primary-button" disabled={!selectedProject} onClick={() => { setQuizReturn('camp'); setScreen('quiz') }}>下一步<ArrowRight /></button></BottomAction>
            </motion.section>
          )}

          {screen === 'quiz' && (
            <motion.section key="quiz" className="planner quiz-page" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <header className="simple-topbar"><button className="round-button" onClick={() => setScreen(quizReturn === 'result' ? 'result' : 'project')} aria-label="返回"><ArrowLeft /></button><Logo compact /><span /></header>
              <div className="quiz-progress"><i style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} /></div>
              <div className="quiz-body">
                <p className="kicker">可选 · 自我认知 {quizIndex + 1} / {quizQuestions.length}</p>
                <h1>{quizQuestions[quizIndex].title}</h1>
                <div className="answer-list">
                  {quizQuestions[quizIndex].options.map((option, index) => <button key={option.label} onClick={() => answerQuiz(option.score)}><i>{String.fromCharCode(65 + index)}</i><span>{option.label}</span><ChevronRight /></button>)}
                </div>
              </div>
              <button className="skip-button" onClick={() => setScreen(quizReturn === 'camp' ? 'intro-camp' : 'result')}>{quizReturn === 'result' ? '暂不重测，返回方案' : '暂时跳过，继续规划'}</button>
            </motion.section>
          )}

          {screen === 'intro-camp' && <StepIntro eyebrow="第二步 · 能力加速" title={<>需要一段集中<br />训练吗？</>} copy="营地是可选项。需要支持时，选择与你课题高度适配的能力加速器；已有经验，也可以直接跳过。" action="查看适配营地" onContinue={() => setScreen('camp')} onBack={() => setScreen('project')} />}

          {screen === 'camp' && selectedProject && (
            <motion.section key="camp" className="planner" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <StepHeader step={2} onReset={reset} />
              <PageHeading eyebrow="第二步 · 选择营地" title="选择适配营地" copy="高度适配的方向优先展示，其他营地也可自由选择。点名称查看完整介绍。" />
              <div className="camp-value-card">
                <span>{assessment?.title ?? '七天项目制营地'}</span>
                <h2>七天，把想法推进成一件经得起追问的作品</h2>
                <p>你得到的不只是一次技术体验：导师会陪你把问题拆成工程任务，在真实设备、数据和失败中完成验证；最终留下可演示的原型、可复现的证据链，也留下能够讲清“我为什么做、怎样做、学到了什么”的个人故事。</p>
                <div><i>真实原型</i><i>完整证据链</i><i>个人成长叙事</i></div>
              </div>
              {!assessment && <button className="assessment-invite" onClick={() => { setQuizReturn('camp'); setQuizIndex(0); setQuizAnswers([]); setScreen('quiz') }}><Sparkles /><div><b>还不确定自己的起点？</b><span>用 1 分钟做个可选自测</span></div><ChevronRight /></button>}
              <div className="camp-skip-note"><Check /><div><b>已有经验，可以不选营地</b><span>不影响继续选择竞赛，也可以稍后返回补选。</span></div></div>
              <div className="choice-list">
                {rankedCamps.map((camp) => {
                  const compatible = selectedProject.campIds.includes(camp.id)
                  const selected = selectedCampId === camp.id
                  return (
                    <article key={camp.id} className={`choice-row${selected ? ' is-selected' : ''}${compatible ? ' is-recommended' : ''}`}>
                      <button className="choice-info" onClick={() => setDetailCamp(camp)}><span>{camp.name}{compatible && <em>高度适配</em>}</span><small>{camp.subtitle}</small></button>
                      <button className="choice-toggle" onClick={() => setSelectedCampId(selected ? null : camp.id)} aria-label={selected ? `取消选择${camp.name}` : `选择${camp.name}`}>
                        {selected ? <Check /> : <ChevronRight />}
                      </button>
                    </article>
                  )
                })}
              </div>
              <BottomAction><button className="back-link" onClick={() => setScreen('project')}><ArrowLeft />上一步</button><button className="primary-button" onClick={() => setScreen('intro-competition')}>{selectedCamp ? '下一步' : '跳过营地'}<ArrowRight /></button></BottomAction>
            </motion.section>
          )}

          {screen === 'intro-competition' && <StepIntro eyebrow="第三步 · 成果舞台" title={<>最后，为成果<br />看看适合的舞台</>} copy="竞赛同样是可选项。你可以查看赛程、最多选择两个，也可以先跳过，专注把课题做好。" action="查看适配竞赛" onContinue={() => setScreen('competition')} onBack={() => setScreen('camp')} />}

          {screen === 'competition' && selectedProject && (
            <motion.section key="competition" className="planner" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <StepHeader step={3} onReset={reset} />
              <PageHeading eyebrow="第三步 · 竞赛方向" title="最多选择 2 项" copy="点赛事名称查看介绍与时间线。竞赛不是必选项，也可以直接跳过。" />
              <div className="competition-value-card">
                <span>为什么值得参赛</span>
                <h2>让作品走出房间，被真正看见</h2>
                <p>竞赛的价值不只是一张证书。它把你的项目放进真实规则、公开表达与同龄人比较中，逼着你补齐证据、迭代原型、回答“为什么值得做”。当兴趣最终成为可检验的成果、清晰的路演和被第三方认可的记录，它才会成为未来申请与长期成长中可被相信的个人故事。</p>
                <div><i>第三方验证</i><i>高压迭代</i><i>可见成果</i></div>
              </div>
              <div className="selection-count"><b>{selectedCompetitionIds.length}</b><span>/ 2 已选择 · 可跳过</span></div>
              <div className="competition-list">
                {competitions.map((competition) => {
                  const compatible = compatibleCompetitions.includes(competition.id)
                  const selected = selectedCompetitionIds.includes(competition.id)
                  const atLimit = selectedCompetitionIds.length === 2 && !selected
                  return (
                    <article key={competition.id} className={`competition-row${selected ? ' is-selected' : ''}${compatible ? '' : ' is-disabled'}`}>
                      <button className="competition-info" onClick={() => setDetailCompetition(competition)} aria-label={`查看${competition.name}介绍与时间线`}>
                      <span className="competition-logo">{competition.logo ? <img src={`${import.meta.env.BASE_URL}competition-logos/${competition.logo}`} alt={`${competition.shortName} Logo`} /> : <span className="bpc-wordmark"><b>BPC</b><small>BUSINESS PIONEER</small></span>}</span>
                        <span className="competition-copy"><b>{competition.name}</b><small>{competition.description}</small><span className="competition-tags">{competition.tags.map((tag) => <em key={tag}>{tag}</em>)}</span></span>
                      </button>
                      <button className="competition-toggle" disabled={!compatible || atLimit} onClick={() => toggleCompetition(competition.id)} aria-label={!compatible ? `${competition.name}暂不适配` : selected ? `取消选择${competition.name}` : `选择${competition.name}`}>
                        {selected ? <Check /> : compatible ? <span /> : <LockKeyhole />}
                      </button>
                    </article>
                  )
                })}
              </div>
              <button className="competition-skip" onClick={() => { setSelectedCompetitionIds([]); setScreen('result') }}><span><b>暂不参加竞赛</b><small>{selectedCompetitionIds.length ? '清空当前选择，先完成课题规划' : '竞赛是可选项，可以稍后再决定'}</small></span><span>跳过<ChevronRight /></span></button>
              <BottomAction><button className="back-link" onClick={() => setScreen('camp')}><ArrowLeft />上一步</button><button className="primary-button" onClick={() => setScreen('result')}>{selectedCompetitionIds.length ? '生成方案' : '跳过竞赛'}<ArrowRight /></button></BottomAction>
            </motion.section>
          )}

          {screen === 'result' && selectedProject && (
            <motion.section key="result" className="result-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <header className="result-top"><Logo compact /><button className="round-button" onClick={reset} aria-label="重新开始"><RotateCcw /></button></header>
              <div className="result-heading"><p className="kicker">为 {grade} 的 {nickname} 定制</p><h1>{nickname}，<br />这是你的路线</h1><p>你的选择已经整理成一条清晰路线，跳过的模块也可以稍后补充。</p></div>
              <div className="student-summary"><div><span>PRIMETECH X LAB PATHWAY</span><b>{nickname}</b></div><strong>{grade}</strong></div>
              <div className="route-card">
                <div><i>01</i><span>研究课题</span><b>{selectedProject.title}</b><p>{selectedProject.description}</p></div>
                <div><i>02</i><span>七天项目营地</span><b>{selectedCamp?.name ?? '已跳过 · 直接推进课题'}</b><p>{selectedCamp?.description ?? '保留自主推进节奏；需要集中训练时，仍可回来补选适配营地。'}</p></div>
                <div><i>03</i><span>竞赛方向</span><b>{selectedCompetitions.length ? selectedCompetitions.map((item) => item.name).join(' ＋ ') : '已跳过 · 稍后再决定'}</b><p>{selectedCompetitions.length ? selectedCompetitions.map((item) => item.description).join('；') : '先把课题做扎实，未来可根据成果形态补充更合适的展示舞台。'}</p></div>
              </div>
              {assessment ? <div className={`assessment-result ${assessment.tone}`}><Sparkles /><div><span>自我认知</span><b>{assessment.title}</b><small>{assessment.note}</small></div></div> : <button className="assessment-invite result-invite" onClick={() => { setQuizReturn('result'); setQuizIndex(0); setQuizAnswers([]); setScreen('quiz') }}><Sparkles /><div><b>还没做自我认知</b><span>可选 · 用 1 分钟补充起点判断</span></div><ChevronRight /></button>}
              <div className="export-block"><h2>带走你的方案</h2><p>生成手机海报后，长按图片即可分享或保存。</p><button className="primary-button purple-button" onClick={createPoster} disabled={posterBusy}>{posterBusy ? '正在排版…' : <><ImageIcon />生成规划海报</>}</button></div>
              <button className="edit-route" onClick={() => setScreen('project')}><ArrowLeft />返回修改选择</button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {majorFilterOpen && <DetailSheet label="多选筛选" title="选择适配专业" onClose={() => setMajorFilterOpen(false)} action={<div className="filter-sheet-actions"><button onClick={() => setSelectedMajors([])}>清空选择</button><button className="primary-button" onClick={() => setMajorFilterOpen(false)}>完成 · {selectedMajors.length || '全部'}</button></div>}><p className="sheet-description filter-sheet-copy">可同时选择多个专业，课题匹配其中任意一个专业就会显示。</p><div className="major-options">{majors.map((item) => { const selected = selectedMajors.includes(item); return <button key={item} className={selected ? 'is-selected' : ''} onClick={() => setSelectedMajors((current) => selected ? current.filter((majorItem) => majorItem !== item) : [...current, item])}>{selected && <Check />}{item}</button> })}</div></DetailSheet>}
        {detailProject && <DetailSheet label="课题介绍" title={detailProject.title} onClose={() => setDetailProject(null)} action={<div className="sheet-actions"><button className="preview-button" onClick={() => { setPreviewProject(detailProject); setDetailProject(null) }}><ImageIcon />预览课题海报</button><button className={`primary-button${selectedProjectId === detailProject.id ? ' is-selected' : ''}`} onClick={() => selectProject(detailProject)}>{selectedProjectId === detailProject.id ? <><Check />已选中这个课题</> : <>选择这个课题<ArrowRight /></>}</button></div>}><div className="tags">{detailProject.majors.map((item) => <span key={item}>{item}</span>)}</div><p className="sheet-description">{detailProject.description}</p></DetailSheet>}
        {detailCamp && <DetailSheet label="营地完整介绍 · 7 DAYS" title={detailCamp.name} titleAside={<div className="camp-title-qr"><img src={`${import.meta.env.BASE_URL}camp-qr-placeholder.png`} alt="营地详情二维码占位图" /><span>扫码详情</span></div>} onClose={() => setDetailCamp(null)} action={<button className={`primary-button${selectedCampId === detailCamp.id ? ' is-selected' : ''}`} onClick={() => { setSelectedCampId(selectedCampId === detailCamp.id ? null : detailCamp.id); setDetailCamp(null) }}>{selectedCampId === detailCamp.id ? <><Check />取消选择这个营地</> : <>选择这个营地<ArrowRight /></>}</button>}>
          {selectedProject?.campIds.includes(detailCamp.id) && <div className="detail-fit-badge"><Sparkles />与你的课题高度适配</div>}
          <div className="camp-theme"><span>主题诠释</span><p>{detailCamp.theme}</p></div>
          <div className="major-share"><div className="section-label"><span>申请专业占比</span><small>规划参考</small></div>{detailCamp.majorShare.map((item) => <div key={item.name} className="share-row"><div><b>{item.name}</b><span>{item.value}%</span></div><i><span style={{ width: `${item.value}%` }} /></i></div>)}</div>
          <div className="camp-outputs"><div className="section-label"><span>项目产出</span></div><ul>{detailCamp.outputs.map((item) => <li key={item}><Check />{item}</li>)}</ul></div>
        </DetailSheet>}
        {detailCompetition && <DetailSheet label="竞赛介绍与时间线" title={detailCompetition.name} onClose={() => setDetailCompetition(null)} action={selectedProject && compatibleCompetitions.includes(detailCompetition.id) ? <button className={`primary-button${selectedCompetitionIds.includes(detailCompetition.id) ? ' is-selected' : ''}`} disabled={selectedCompetitionIds.length === 2 && !selectedCompetitionIds.includes(detailCompetition.id)} onClick={() => { toggleCompetition(detailCompetition.id); setDetailCompetition(null) }}>{selectedCompetitionIds.includes(detailCompetition.id) ? <><Check />取消选择这项竞赛</> : selectedCompetitionIds.length === 2 ? '已选满 2 项竞赛' : <>选择这项竞赛<ArrowRight /></>}</button> : <div className="disabled-note"><LockKeyhole />这项竞赛与当前课题暂不适配</div>}>
          <div className="competition-sheet-logo">{detailCompetition.logo ? <img src={`${import.meta.env.BASE_URL}competition-logos/${detailCompetition.logo}`} alt={`${detailCompetition.shortName} Logo`} /> : <span className="bpc-wordmark bpc-wordmark--large"><b>BPC</b><small>BUSINESS PIONEER<br />CASE CHALLENGE</small></span>}</div>
          <p className="sheet-description competition-description">{detailCompetition.detail}</p>
          <div className="timeline-heading"><CalendarDays /><div><b>关键时间线</b><span>{detailCompetition.timelineNote}</span></div></div>
          <ol className="competition-timeline">{detailCompetition.timeline.map((item) => <li key={`${item.date}-${item.label}`}><i /><div><time>{item.date}</time><b>{item.label}</b>{item.note && <span>{item.note}</span>}</div></li>)}</ol>
          {detailCompetition.sourceUrl && <a className="official-link" href={detailCompetition.sourceUrl} target="_blank" rel="noreferrer">查看赛事官方信息<ExternalLink /></a>}
        </DetailSheet>}
        {previewProject && <motion.div className="project-preview-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><section className="project-preview-page"><header><Logo compact /><button className="round-button" onClick={() => setPreviewProject(null)} aria-label="关闭课题海报"><X /></button></header><div className="project-poster-card"><img src={`${import.meta.env.BASE_URL}project-preview-placeholder.jpg`} alt="学生进行工程原型实验的课题海报占位图片" /><div className="project-poster-shade" /><div className="project-poster-content"><p>PRIMETECH X LAB · PROJECT</p><h2>{previewProject.title}</h2><div>{previewProject.majors.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div><small>课题视觉图暂为占位素材 · 待正式海报替换</small></div></div><button className="preview-back" onClick={() => { setDetailProject(previewProject); setPreviewProject(null) }}><ArrowLeft />返回课题介绍</button></section></motion.div>}
        {poster && <motion.div className="poster-backdrop poster-guide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="poster-close" onClick={() => setPoster(null)} aria-label="关闭海报"><X /></button>
          <div className="poster-guide-stage">
            <img src={poster.url} alt="PrimeTech X Lab 自主规划路线海报" />
            <div className="share-coach" aria-hidden="true"><span className="ripple-target"><i /><i /><b /></span><div className="share-bubble"><b>长按可直接分享</b><span>按住海报图片，选择分享或保存</span></div></div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}
