import type { Camp } from '../types'

const makeCamp = (camp: Omit<Camp, 'hours' | 'season' | 'price'>): Camp => ({
  ...camp,
  hours: 50,
  season: '圣诞或寒假',
  price: 15000,
})

export const camps: Camp[] = [
  makeCamp({ id: 'vision', name: 'AI算法与计算机视觉营地', englishName: 'AI & Computer Vision Camp', summary: '从 Python 数据处理到视觉模型部署，建立完整的视觉智能开发链路。', skills: ['Python', 'OpenCV', '机器学习', '目标检测'], suitableProjects: ['novasight'], output: '可运行的视觉识别模型与应用 Demo', tags: ['人工智能', '计算机视觉'] }),
  makeCamp({ id: 'security', name: 'AI全栈开发与数据安全营地', englishName: 'AI Full-stack & Data Security Camp', summary: '连接本地 AI、隐私处理与前端交互，形成可用的软件产品能力。', skills: ['Python', 'OCR', 'NLP', '前端开发'], suitableProjects: ['idia'], output: '本地化隐私处理工具原型', tags: ['人工智能', '数据安全'] }),
  makeCamp({ id: 'hardware', name: '智能硬件与嵌入式控制营地', englishName: 'Smart Hardware Camp', summary: '掌握传感器、微控制器与执行机构的集成和基础调试。', skills: ['ESP32', '传感器', '电机控制', '电路调试'], suitableProjects: ['aquarover'], output: '具备感知与控制能力的硬件原型', tags: ['智能硬件', '嵌入式'] }),
  makeCamp({ id: 'aiot', name: 'AIoT智能终端开发营地', englishName: 'AIoT Product Camp', summary: '把轻量 AI 能力部署到互联终端，完成数据采集、交互与提醒闭环。', skills: ['Python', 'ESP32', '图像识别', '前端'], suitableProjects: ['freshguard'], output: 'AIoT 智能终端与管理界面', tags: ['AIoT', '产品开发'] }),
  makeCamp({ id: 'robotics', name: '机器人结构与嵌入式控制营地', englishName: 'Robotics Engineering Camp', summary: '围绕结构、控制与测试，建立从数字模型到机电原型的能力。', skills: ['机械建模', '控制算法', '传感器', '数据可视化'], suitableProjects: ['fieldx'], output: '机器人子系统与工程测试记录', tags: ['机器人', '机械工程'] }),
  makeCamp({ id: 'modeling', name: '工程建模与实验验证营地', englishName: 'Engineering Modeling Camp', summary: '学习工程假设、结构建模、实验设计和数据验证的完整方法。', skills: ['结构建模', '材料测试', '实验设计', '数据分析'], suitableProjects: ['solvapor'], output: '功能模型与可复现的实验报告', tags: ['工程建模', '实验研究'] }),
  makeCamp({ id: 'interaction', name: '交互装置与数字音频营地', englishName: 'Interactive Media Camp', summary: '连接传感交互、数字音频与产品形态，完成可测试的交互装置。', skills: ['Arduino', '传感器', '数字音频', '产品建模'], suitableProjects: ['xun'], output: '电子交互装置与用户测试记录', tags: ['音乐科技', '交互设计'] }),
  makeCamp({ id: 'biowear', name: '生物传感与可穿戴设备营地', englishName: 'Bio-sensing & Wearables Camp', summary: '学习柔性传感、数据采集与可穿戴结构的设计和调试。', skills: ['ESP32', '柔性传感器', '数据采集', '3D建模'], suitableProjects: ['neuroglove'], output: '可穿戴传感原型与反馈界面', tags: ['医疗健康', '可穿戴'] }),
]

export const getCamp = (id?: string) => camps.find((camp) => camp.id === id)
