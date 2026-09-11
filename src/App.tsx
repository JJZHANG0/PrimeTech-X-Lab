import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  Info,
  LockKeyhole,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
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

type Screen = 'welcome' | 'intro-project' | 'project' | 'quiz' | 'intro-camp' | 'camp' | 'intro-competition' | 'competition' | 'result'
type Poster = { url: string; blob: Blob }

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
  {
    title: '你能把一个想法拆成每周任务吗？',
    options: [
      { label: '目前做不到', score: 0 },
      { label: '有人带着可以', score: 1 },
      { label: '大部分时候可以', score: 2 },
      { label: '可以独立规划并复盘', score: 3 },
    ],
  },
  {
    title: '你对参加创新竞赛的熟悉程度是？',
    options: [
      { label: '完全不了解', score: 0 },
      { label: '听说过，但没参加过', score: 1 },
      { label: '参加过一次', score: 2 },
      { label: '能独立准备完整材料', score: 3 },
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

function DetailSheet({ label, title, children, action, onClose }: {
  label: string
  title: string
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
        <h2 id="detail-title">{title}</h2>
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
  if (score <= 4) return { title: '刚刚起步', note: '建议搭配一个适配营地，先补齐方法与动手基础。', tone: 'starter' }
  if (score <= 8) return { title: '已有基础', note: '建议用营地快速强化关键技能，再进入项目验证。', tone: 'growing' }
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

async function makePoster(project: Project, camp: Camp | null, competitionNames: string[], assessment: ReturnType<typeof getAssessment>): Promise<Poster> {
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
  context.font = '600 28px Noto Sans SC, sans-serif'
  context.fillStyle = '#b9b3c3'
  context.fillText('自主规划路线', margin, 176)
  context.font = '700 64px Noto Sans SC, sans-serif'
  context.fillStyle = '#fff'
  context.fillText('我的创新成长方案', margin, 285)
  context.font = '500 24px Manrope, sans-serif'
  context.fillStyle = '#aaa3b4'
  context.fillText('MY INNOVATION PATHWAY', margin, 342)

  const card = (top: number, index: string, label: string, title: string, tags?: string[]) => {
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
    context.font = '700 38px Noto Sans SC, sans-serif'
    const afterTitle = wrapText(context, title, margin + 40, top + 126, canvas.width - margin * 2 - 80, 54, 3)
    if (tags?.length) {
      context.font = '500 21px Noto Sans SC, sans-serif'
      context.fillStyle = '#6c3be7'
      context.fillText(tags.join('  ·  '), margin + 40, Math.min(top + 258, afterTitle + 30))
    }
  }

  card(472, '01', '研究课题', project.title, project.majors.slice(0, 3))
  card(806, '02', '技能营地', camp?.name ?? '已跳过营地', [camp?.output ?? '已有经验 · 直接推进课题'])
  card(1140, '03', '竞赛方向', competitionNames.length ? competitionNames.join('  ×  ') : '已跳过竞赛', competitionNames.length ? undefined : ['可稍后补充竞赛方向'])

  context.fillStyle = '#ece5fb'
  context.beginPath()
  context.roundRect(margin, 1480, canvas.width - margin * 2, 168, 30)
  context.fill()
  context.fillStyle = '#6c3be7'
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
  const [major, setMajor] = useState('全部专业')
  const [query, setQuery] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedCampId, setSelectedCampId] = useState<string | null>(null)
  const [selectedCompetitionIds, setSelectedCompetitionIds] = useState<string[]>([])
  const [detailProject, setDetailProject] = useState<Project | null>(null)
  const [detailCamp, setDetailCamp] = useState<Camp | null>(null)
  const [detailCompetition, setDetailCompetition] = useState<Competition | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizReturn, setQuizReturn] = useState<'camp' | 'result'>('camp')
  const [poster, setPoster] = useState<Poster | null>(null)
  const [posterBusy, setPosterBusy] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setSplash(false), 2800)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => { if (poster) URL.revokeObjectURL(poster.url) }, [poster])

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null
  const selectedCamp = camps.find((camp) => camp.id === selectedCampId) ?? null
  const compatibleCompetitions = selectedProject ? compatibleCompetitionIds(selectedProject) : []
  const quizScore = quizAnswers.length === quizQuestions.length ? quizAnswers.reduce((total, score) => total + score, 0) : null
  const assessment = getAssessment(quizScore)

  const visibleProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return projects.filter((project) => {
      const majorMatch = major === '全部专业' || project.majors.includes(major)
      const queryMatch = !normalized || `${project.title}${project.majors.join('')}`.toLowerCase().includes(normalized)
      return majorMatch && queryMatch
    })
  }, [major, query])

  const reset = () => {
    setScreen('welcome')
    setMajor('全部专业')
    setQuery('')
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
      const names = selectedCompetitionIds.map((id) => competitions.find((item) => item.id === id)?.shortName ?? id)
      setPoster(await makePoster(selectedProject, selectedCamp, names, assessment))
    } finally {
      setPosterBusy(false)
    }
  }

  const downloadPoster = () => {
    if (!poster) return
    const link = document.createElement('a')
    link.href = poster.url
    link.download = 'PrimeTech-X-Lab-规划方案.png'
    link.click()
  }

  const sharePoster = async () => {
    if (!poster) return
    const file = new File([poster.blob], 'PrimeTech-X-Lab-规划方案.png', { type: 'image/png' })
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: 'PrimeTech X Lab 自主规划路线', files: [file] })
      } else {
        downloadPoster()
        setNotice('当前浏览器不支持直接分享，已为你下载图片。')
      }
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') setNotice('分享未完成，可以长按图片保存。')
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
              <button className="primary-button" onClick={() => setScreen('intro-project')}>开始规划<ArrowRight /></button>
            </motion.section>
          )}

          {screen === 'intro-project' && <StepIntro eyebrow="第一步 · 研究方向" title={<>先找到一个<br />真正想做的课题</>} copy="按专业快速筛选，点击标题了解内容，再选出一个你愿意持续投入的方向。" action="开始选择课题" onContinue={() => setScreen('project')} onBack={() => setScreen('welcome')} />}

          {screen === 'project' && (
            <motion.section key="project" className="planner" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <StepHeader step={1} onReset={reset} />
              <PageHeading eyebrow="第一步 · 选择课题" title="你想研究什么？" copy="按专业筛选，也可以直接浏览全部课题。点标题查看介绍。" />
              <div className="filters">
                <label className="select-field">
                  <span>适配专业</span>
                  <select value={major} onChange={(event) => setMajor(event.target.value)}>
                    <option>全部专业</option>
                    {majors.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="search-box"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索课题" aria-label="搜索课题" /></label>
              </div>
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

          {screen === 'intro-camp' && <StepIntro eyebrow="第二步 · 技能准备" title={<>要不要先补齐<br />关键技能？</>} copy="营地是可选项。需要带领时，选择与课题匹配的营地；已有经验，也可以直接跳过。" action="查看适配营地" onContinue={() => setScreen('camp')} onBack={() => setScreen('project')} />}

          {screen === 'camp' && selectedProject && (
            <motion.section key="camp" className="planner" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <StepHeader step={2} onReset={reset} />
              <PageHeading eyebrow="第二步 · 选择营地" title="补齐关键技能" copy="只可勾选与当前课题适配的营地。点营地名称查看详细介绍。" />
              {assessment && <div className={`assessment-tip ${assessment.tone}`}><Sparkles /><div><b>{assessment.title}</b><span>{assessment.note}</span></div></div>}
              {!assessment && <button className="assessment-invite" onClick={() => { setQuizReturn('camp'); setQuizIndex(0); setQuizAnswers([]); setScreen('quiz') }}><Sparkles /><div><b>还不确定自己的起点？</b><span>用 1 分钟做个可选自测</span></div><ChevronRight /></button>}
              <div className="camp-skip-note"><Check /><div><b>已有经验，可以不选营地</b><span>不影响继续选择竞赛，也可以稍后返回补选。</span></div></div>
              <div className="choice-list">
                {camps.map((camp) => {
                  const compatible = selectedProject.campIds.includes(camp.id)
                  const selected = selectedCampId === camp.id
                  return (
                    <article key={camp.id} className={`choice-row${selected ? ' is-selected' : ''}${compatible ? '' : ' is-disabled'}`}>
                      <button className="choice-info" onClick={() => setDetailCamp(camp)}><span>{camp.name}</span><small>{camp.subtitle}</small></button>
                      <button className="choice-toggle" disabled={!compatible} onClick={() => setSelectedCampId(selected ? null : camp.id)} aria-label={compatible ? `选择${camp.name}` : `${camp.name}不适配`}>
                        {selected ? <Check /> : compatible ? <ChevronRight /> : <LockKeyhole />}
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
              <div className="selection-count"><b>{selectedCompetitionIds.length}</b><span>/ 2 已选择 · 可跳过</span></div>
              <div className="competition-list">
                {competitions.map((competition) => {
                  const compatible = compatibleCompetitions.includes(competition.id)
                  const selected = selectedCompetitionIds.includes(competition.id)
                  const atLimit = selectedCompetitionIds.length === 2 && !selected
                  return (
                    <article key={competition.id} className={`competition-row${selected ? ' is-selected' : ''}${compatible ? '' : ' is-disabled'}`}>
                      <button className="competition-info" onClick={() => setDetailCompetition(competition)} aria-label={`查看${competition.name}介绍与时间线`}>
                        <span className="competition-logo"><img src={`${import.meta.env.BASE_URL}competition-logos/${competition.logo}`} alt={`${competition.shortName} Logo`} /></span>
                        <span className="competition-copy"><b>{competition.name}</b><small>{competition.description}</small></span>
                      </button>
                      <button className="competition-toggle" disabled={!compatible || atLimit} onClick={() => toggleCompetition(competition.id)} aria-label={!compatible ? `${competition.name}暂不适配` : selected ? `取消选择${competition.name}` : `选择${competition.name}`}>
                        {selected ? <Check /> : compatible ? <span /> : <LockKeyhole />}
                      </button>
                    </article>
                  )
                })}
              </div>
              <BottomAction><button className="back-link" onClick={() => setScreen('camp')}><ArrowLeft />上一步</button><button className="primary-button" onClick={() => setScreen('result')}>{selectedCompetitionIds.length ? '生成方案' : '跳过竞赛'}<ArrowRight /></button></BottomAction>
            </motion.section>
          )}

          {screen === 'result' && selectedProject && (
            <motion.section key="result" className="result-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <header className="result-top"><Logo compact /><button className="round-button" onClick={reset} aria-label="重新开始"><RotateCcw /></button></header>
              <div className="result-heading"><p className="kicker">规划完成</p><h1>你的创新<br />成长方案</h1><p>你的选择已经整理成一条清晰路线，跳过的模块也可以稍后补充。</p></div>
              <div className="route-card">
                <div><i>01</i><span>研究课题</span><b>{selectedProject.title}</b></div>
                <div><i>02</i><span>技能营地</span><b>{selectedCamp?.name ?? '已跳过 · 直接推进课题'}</b></div>
                <div><i>03</i><span>竞赛方向</span><b>{selectedCompetitionIds.length ? selectedCompetitionIds.map((id) => competitions.find((item) => item.id === id)?.name).join(' ＋ ') : '已跳过 · 稍后再决定'}</b></div>
              </div>
              {assessment ? <div className={`assessment-result ${assessment.tone}`}><Sparkles /><div><span>自我认知</span><b>{assessment.title}</b><small>{assessment.note}</small></div></div> : <button className="assessment-invite result-invite" onClick={() => { setQuizReturn('result'); setQuizIndex(0); setQuizAnswers([]); setScreen('quiz') }}><Sparkles /><div><b>还没做自我认知</b><span>可选 · 用 1 分钟补充起点判断</span></div><ChevronRight /></button>}
              <div className="export-block"><h2>带走你的方案</h2><p>生成手机海报后，可长按保存或调用系统分享。</p><button className="primary-button purple-button" onClick={createPoster} disabled={posterBusy}>{posterBusy ? '正在排版…' : <><Download />生成规划海报</>}</button></div>
              <button className="edit-route" onClick={() => setScreen('project')}><ArrowLeft />返回修改选择</button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {detailProject && <DetailSheet label="课题介绍" title={detailProject.title} onClose={() => setDetailProject(null)} action={<button className={`primary-button${selectedProjectId === detailProject.id ? ' is-selected' : ''}`} onClick={() => selectProject(detailProject)}>{selectedProjectId === detailProject.id ? <><Check />已选中这个课题</> : <>选择这个课题<ArrowRight /></>}</button>}><div className="tags">{detailProject.majors.map((item) => <span key={item}>{item}</span>)}</div><p className="sheet-description">{detailProject.description}</p></DetailSheet>}
        {detailCamp && <DetailSheet label="营地介绍" title={detailCamp.name} onClose={() => setDetailCamp(null)} action={selectedProject?.campIds.includes(detailCamp.id) ? <button className={`primary-button${selectedCampId === detailCamp.id ? ' is-selected' : ''}`} onClick={() => { setSelectedCampId(detailCamp.id); setDetailCamp(null) }}>{selectedCampId === detailCamp.id ? <><Check />已选中这个营地</> : <>选择这个营地<ArrowRight /></>}</button> : <div className="disabled-note"><LockKeyhole />这个营地与当前课题暂不适配</div>}><p className="sheet-description">{detailCamp.description}</p><div className="camp-detail"><span>学习重点</span><ul>{detailCamp.focus.map((item) => <li key={item}>{item}</li>)}</ul><span>预期产出</span><b>{detailCamp.output}</b></div></DetailSheet>}
        {detailCompetition && <DetailSheet label="竞赛介绍与时间线" title={detailCompetition.name} onClose={() => setDetailCompetition(null)} action={selectedProject && compatibleCompetitions.includes(detailCompetition.id) ? <button className={`primary-button${selectedCompetitionIds.includes(detailCompetition.id) ? ' is-selected' : ''}`} disabled={selectedCompetitionIds.length === 2 && !selectedCompetitionIds.includes(detailCompetition.id)} onClick={() => { toggleCompetition(detailCompetition.id); setDetailCompetition(null) }}>{selectedCompetitionIds.includes(detailCompetition.id) ? <><Check />取消选择这项竞赛</> : selectedCompetitionIds.length === 2 ? '已选满 2 项竞赛' : <>选择这项竞赛<ArrowRight /></>}</button> : <div className="disabled-note"><LockKeyhole />这项竞赛与当前课题暂不适配</div>}>
          <div className="competition-sheet-logo"><img src={`${import.meta.env.BASE_URL}competition-logos/${detailCompetition.logo}`} alt={`${detailCompetition.shortName} Logo`} /></div>
          <p className="sheet-description competition-description">{detailCompetition.detail}</p>
          <div className="timeline-heading"><CalendarDays /><div><b>关键时间线</b><span>{detailCompetition.timelineNote}</span></div></div>
          <ol className="competition-timeline">{detailCompetition.timeline.map((item) => <li key={`${item.date}-${item.label}`}><i /><div><time>{item.date}</time><b>{item.label}</b>{item.note && <span>{item.note}</span>}</div></li>)}</ol>
          {detailCompetition.sourceUrl && <a className="official-link" href={detailCompetition.sourceUrl} target="_blank" rel="noreferrer">查看赛事官方信息<ExternalLink /></a>}
        </DetailSheet>}
        {poster && <motion.div className="poster-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="poster-view"><header><div><b>规划海报已生成</b><span>长按图片也可以直接保存</span></div><button className="round-button" onClick={() => setPoster(null)} aria-label="关闭"><X /></button></header><img src={poster.url} alt="PrimeTech X Lab 自主规划路线海报" /><div className="poster-actions"><button onClick={downloadPoster}><Download />保存图片</button><button onClick={sharePoster}><Share2 />系统分享</button></div>{notice && <p className="notice"><Info />{notice}</p>}</div></motion.div>}
      </AnimatePresence>
    </>
  )
}
