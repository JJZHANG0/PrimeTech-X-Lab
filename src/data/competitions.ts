import type { Competition } from '../types'

export const competitions: Competition[] = [
  { id: 'icc', name: 'ICC', summary: '面向创新产品、工程设计、发明成果与综合项目的展示平台。', focus: ['技术创新认可', '发明成果展示', '英文路演表达'], tags: ['人工智能', '智能硬件', '工程设计', '社会创新'] },
  { id: 'iena', name: 'iENA 德国纽伦堡国际发明展', summary: '适合具有实体原型、专利潜力、工程创新或应用价值的发明项目。', focus: ['发明成果展示', '国际交流经历', '技术创新认可'], tags: ['机械工程', '电子工程', '医疗健康', '能源科技', '智能硬件'] },
  { id: 'conrad', name: 'Conrad Challenge', summary: '适合兼具技术创新、社会价值、商业逻辑和英文展示能力的跨学科项目。', focus: ['社会影响力', '英文路演表达', '技术创新认可'], tags: ['人工智能', '环境科技', '医疗健康', '可持续发展', '社会创新'] },
  { id: 'blueocean', name: 'Blue Ocean Entrepreneurship Competition', summary: '关注商业创新、用户洞察、市场机会与创业模式。', focus: ['商业模式验证', '英文路演表达', '社会影响力'], tags: ['商业创新', '社会创新', '可持续发展'] },
  { id: 'bpa', name: 'BPA', summary: '适合商业计划、市场分析、项目运营和英文商业表达较强的项目。', focus: ['商业模式验证', '英文路演表达', '国际交流经历'], tags: ['商业创新', '软件开发', '人工智能'] },
]

export const outcomeGoals = ['技术创新认可', '发明成果展示', '商业模式验证', '英文路演表达', '社会影响力', '国际交流经历', '暂时不确定']
