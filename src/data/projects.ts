import type { Project } from '../types'

const sharedRoles = ['算法与软件开发', '机械结构设计', '嵌入式与电路控制', '用户研究与测试', '项目管理与成果表达']

export const projects: Project[] = [
  {
    id: 'novasight', name: 'NovaSight 智能视觉辅助系统', englishName: 'NovaSight Assistive Vision System', difficulty: '进阶',
    summary: '运用计算机视觉、环境识别与多模态交互技术，为视障用户提供室内物体寻找、空间理解与行动辅助。',
    tags: ['人工智能', '计算机视觉', '无障碍科技'], skills: ['Python', 'OpenCV', '目标检测', '传感器基础'], campId: 'vision', output: 'AI识别 Demo＋智能硬件原型',
    background: '室内环境对视障用户并不总是友好，物品位置、空间边界与临时障碍都会带来额外的信息负担。', scenario: '居家、校园或公共室内空间中的物品寻找与环境理解。', question: '如何用低延迟、低打扰的方式，把视觉环境转译成可行动的信息？', route: ['梳理典型用户任务', '构建视觉识别模型', '设计多模态反馈', '在真实场景中测试迭代'], roles: sharedRoles, weights: { software: 25, algorithm: 40, modeling: 5, embedded: 15, engineering: 15 }, requirements: { software: 3, algorithm: 3, modeling: 1, embedded: 2, engineering: 2 }, competitionIds: ['conrad', 'icc', 'iena'],
  },
  {
    id: 'aquarover', name: 'AquaRover 水域清洁与监测机器人', englishName: 'AquaRover Water Robotics', difficulty: '进阶',
    summary: '开发可在鱼塘、景观水域或泳池中自主移动的水面机器人，实现漂浮物收集与多点水质监测。',
    tags: ['机械工程', '嵌入式控制', '环境科技'], skills: ['Fusion 360', 'Arduino 或 ESP32', '传感器', '机械结构'], campId: 'hardware', output: '可运行机器人原型＋水质监测数据',
    background: '小型水域的漂浮物清理和水质采样往往依赖人工，连续性、安全性与空间覆盖均有限。', scenario: '鱼塘、社区景观水域、泳池等相对封闭的小型水域。', question: '如何让紧凑型水面平台同时完成稳定移动、污染物收集与可信的数据采样？', route: ['定义水域任务与指标', '完成船体及收集结构', '集成传感与控制', '开展水面测试与数据校准'], roles: sharedRoles, weights: { software: 10, algorithm: 10, modeling: 30, embedded: 30, engineering: 20 }, requirements: { software: 2, algorithm: 2, modeling: 3, embedded: 3, engineering: 3 }, competitionIds: ['iena', 'conrad', 'icc'],
  },
  {
    id: 'idia', name: 'IDIA 本地化AI隐私保护系统', englishName: 'IDIA Local Privacy AI', difficulty: '进阶',
    summary: '开发能够在本地识别、遮挡和替换文本、图片及文档敏感信息的生成式AI数据隐私工具。',
    tags: ['网络安全', '人工智能', '软件开发'], skills: ['Python', '自然语言处理', 'OCR', '前端开发'], campId: 'security', output: '浏览器工具或桌面系统 Demo',
    background: '学习与工作中大量文档需要交给智能工具处理，但敏感字段在上传前常缺少稳定、易用的保护方式。', scenario: '研究资料、申请文件、企业文档等包含个人或机构敏感信息的内容。', question: '如何在本地准确识别多模态敏感信息，并在保留可读性的同时完成可逆或不可逆脱敏？', route: ['定义敏感信息规则', '搭建 OCR/NLP 管线', '设计本地处理界面', '以多类文档验证准确性'], roles: sharedRoles, weights: { software: 35, algorithm: 35, modeling: 0, embedded: 5, engineering: 25 }, requirements: { software: 3, algorithm: 3, modeling: 0, embedded: 1, engineering: 3 }, competitionIds: ['icc', 'conrad', 'bpa'],
  },
  {
    id: 'xun', name: 'XUN 无障碍电子埙', englishName: 'XUN Accessible Digital Instrument', difficulty: '入门至进阶',
    summary: '结合传统乐器、数字音频与无障碍交互，为视障人士、儿童及特殊需求用户设计低门槛电子乐器。',
    tags: ['音乐科技', '电子工程', '社会创新'], skills: ['Arduino', '传感器', '数字音频', '产品建模'], campId: 'interaction', output: '电子乐器原型＋交互测试',
    background: '传统乐器的指法、气息和视觉反馈形成学习门槛，也限制了部分特殊需求用户的音乐表达。', scenario: '融合教育课堂、家庭音乐启蒙和无障碍艺术工作坊。', question: '如何保留吹奏与触觉的身体体验，同时降低发声和学习门槛？', route: ['研究传统埙与目标用户', '设计传感映射', '开发声音与交互系统', '进行可用性测试'], roles: sharedRoles, weights: { software: 15, algorithm: 10, modeling: 20, embedded: 30, engineering: 25 }, requirements: { software: 2, algorithm: 1, modeling: 2, embedded: 3, engineering: 2 }, competitionIds: ['conrad', 'iena', 'icc'],
  },
  {
    id: 'neuroglove', name: 'NeuroGlove 智能康复训练手套', englishName: 'NeuroGlove Rehabilitation Wearable', difficulty: '进阶',
    summary: '运用柔性传感器、动作识别与游戏化反馈，帮助康复用户完成手部训练并记录动作数据。',
    tags: ['医疗健康', '嵌入式控制', '智能硬件'], skills: ['ESP32', '柔性传感器', '数据采集', '3D建模'], campId: 'biowear', output: '可穿戴原型＋训练反馈界面',
    background: '重复性康复动作常缺乏即时、可理解的反馈，也不易长期记录动作质量与完成情况。', scenario: '在专业人士指导下进行的居家辅助训练与康复互动。', question: '如何用轻量可穿戴传感稳定记录手部动作，并生成不过度医疗化的训练反馈？', route: ['研究动作与使用边界', '搭建柔性传感系统', '建立动作识别规则', '设计反馈并完成可用性测试'], roles: sharedRoles, weights: { software: 15, algorithm: 20, modeling: 15, embedded: 30, engineering: 20 }, requirements: { software: 2, algorithm: 2, modeling: 2, embedded: 3, engineering: 3 }, competitionIds: ['iena', 'conrad', 'icc'],
  },
  {
    id: 'freshguard', name: 'FreshGuard 智能食材管理终端', englishName: 'FreshGuard Food Management Hub', difficulty: '入门至进阶',
    summary: '通过语音输入、图像识别和临期提醒，帮助家庭管理冰箱库存并减少食物浪费。',
    tags: ['人工智能', '物联网', '可持续发展'], skills: ['Python', '图像识别', 'ESP32', '基础前端'], campId: 'aiot', output: '智能终端＋管理界面 Demo',
    background: '家庭食材经常因为记录成本高、库存不可见和临期提醒不及时而被浪费。', scenario: '多人家庭、共享公寓或小型社区厨房的日常食材管理。', question: '如何用自然、低摩擦的方式持续获得库存信息，并将提醒变成有效行动？', route: ['观察食材管理流程', '设计多模态录入', '构建库存与提醒逻辑', '以真实家庭任务测试'], roles: sharedRoles, weights: { software: 25, algorithm: 25, modeling: 5, embedded: 20, engineering: 25 }, requirements: { software: 2, algorithm: 2, modeling: 1, embedded: 2, engineering: 2 }, competitionIds: ['conrad', 'blueocean', 'icc'],
  },
  {
    id: 'fieldx', name: 'FIELD-X 农业精准喷洒系统', englishName: 'FIELD-X Precision Spraying', difficulty: '高阶',
    summary: '开发能够降低药液漂移、记录喷洒范围并辅助操作者进行精准作业的农业智能设备。',
    tags: ['机械工程', '农业科技', '嵌入式控制'], skills: ['机械建模', '传感器', '控制算法', '数据可视化'], campId: 'robotics', output: '喷洒装置原型＋测试报告',
    background: '传统喷洒受到风速、喷头距离和操作稳定性影响，容易出现覆盖不均与药液漂移。', scenario: '温室、实验农田及小型精准农业作业。', question: '如何感知作业条件并实时调整喷洒，使覆盖范围更稳定且过程可记录？', route: ['定义喷洒质量指标', '设计结构与流体测试', '集成感知和控制', '开展对照实验与可视化'], roles: sharedRoles, weights: { software: 10, algorithm: 20, modeling: 25, embedded: 25, engineering: 20 }, requirements: { software: 2, algorithm: 3, modeling: 3, embedded: 3, engineering: 3 }, competitionIds: ['iena', 'conrad', 'icc'],
  },
  {
    id: 'solvapor', name: 'SolVapor 低能耗太阳能淡化装置', englishName: 'SolVapor Solar Desalination', difficulty: '进阶',
    summary: '研究太阳能蒸发、冷凝回收与材料结构设计，开发面向海岛或资源受限地区的小型淡水制备系统。',
    tags: ['能源科技', '材料科学', '机械工程'], skills: ['物理实验', '结构建模', '材料测试', '数据分析'], campId: 'modeling', output: '功能原型＋实验数据报告',
    background: '偏远地区的小规模淡水需求难以依赖大型基础设施，而被动式太阳能方案仍面临效率与维护问题。', scenario: '海岛、户外营地或资源受限地区的小规模淡水制备。', question: '如何通过材料、光热与冷凝结构协同，在低能耗条件下提升单位面积产水效率？', route: ['建立能量与产水假设', '筛选材料和结构方案', '制作蒸发冷凝原型', '开展变量控制实验'], roles: sharedRoles, weights: { software: 5, algorithm: 15, modeling: 30, embedded: 5, engineering: 45 }, requirements: { software: 1, algorithm: 2, modeling: 3, embedded: 1, engineering: 3 }, competitionIds: ['iena', 'conrad', 'icc'],
  },
]

export const projectFilters = ['全部', '人工智能', '计算机科学', '智能硬件', '机械工程', '电子工程', '环境科技', '医疗健康', '无障碍科技', '音乐科技', '可持续发展', '社会创新', '商业创新']
export const getProject = (id?: string) => projects.find((project) => project.id === id)
