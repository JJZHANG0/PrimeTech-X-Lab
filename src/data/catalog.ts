export type Project = {
  id: string
  title: string
  majors: string[]
  description: string
  campIds: string[]
}

export type Camp = {
  id: string
  name: string
  subtitle: string
  description: string
  focus: string[]
  output: string
}

export type Competition = {
  id: string
  name: string
  shortName: string
  description: string
}

export const projects: Project[] = [
  { id: 'p01', title: 'ProShot：投篮动作量化装置', majors: ['运动人体科学', '人工智能', '生物医学工程'], campIds: ['perception', 'wearable'], description: 'ProShot面向篮球训练中动作评价依赖教练经验、训练数据难以沉淀的问题，利用惯性传感器或视觉识别采集出手角度、手腕速度、身体姿态与命中结果，建立投篮动作量化模型，并通过移动端界面生成即时反馈与训练趋势。学生将完成传感采集、动作特征提取、评分算法和原型测试，最终形成可用于个人训练及教练评估的智能运动辅助装置。' },
  { id: 'p02', title: 'The Last Library of Human Mistakes', majors: ['人工智能', '计算机科学', '数据科学'], campIds: ['agent', 'fullstack'], description: '这是一套以“失败经验能否成为可检索知识”为核心的AI数字档案系统。项目收集经匿名处理的学习、工程或决策失误案例，利用结构化标签、语义检索与大语言模型智能体进行归因分析，帮助用户发现相似错误、理解形成机制并获得改进建议。学生将完成数据规范、知识库、RAG问答、交互界面以及偏差与隐私测试。' },
  { id: 'p03', title: 'MindBeat：智能空灵鼓认知训练系统', majors: ['音乐科技', '生物医学工程', '认知科学'], campIds: ['wearable', 'fullstack'], description: 'MindBeat将空灵鼓的低门槛演奏方式与认知训练结合，通过压力、敲击位置和节奏传感记录用户的演奏行为，并设计注意力、工作记忆与节奏模仿等互动任务。系统根据反应时间、节奏稳定性和任务完成度生成个性化反馈，探索音乐交互对青少年或特殊需求群体认知参与的作用。学生将完成硬件采集、音乐映射、训练界面与小规模用户测试。' },
  { id: 'p04', title: 'NeuroScope：脑电注意力状态可视化研究', majors: ['神经科学', '生物医学工程', '人工智能'], campIds: ['wearable', 'fullstack'], description: 'NeuroScope使用便携式脑电设备采集不同任务条件下的EEG信号，对Alpha、Beta等频段特征进行滤波、提取与比较，并将结果转化为实时可视化反馈。学生将设计专注、放松和认知负荷实验，分析个体差异与信号噪声，完成采集终端、数据处理程序、可视化界面及规范化实验报告。' },
  { id: 'p05', title: '智能膝盖外骨骼康复系统', majors: ['机械工程', '生物医学工程', '机器人工程'], campIds: ['robot', 'wearable'], description: '本课题面向膝关节术后或运动损伤人群的辅助训练需求，设计轻量化膝部外骨骼结构，利用角度、压力或肌电传感器识别屈伸状态，并通过电机或弹性助力机构提供分级辅助。学生将开展人体工学尺寸分析、机械结构建模、驱动控制、限位保护与步态测试，最终完成可演示原型及康复训练数据界面。' },
  { id: 'p06', title: '低成本灵巧仿生手自主控制系统', majors: ['机器人工程', '机械工程', '人工智能'], campIds: ['robot', 'wearable'], description: '本课题采用3D打印结构、腱绳传动和低成本舵机构建多指执行平台，并融合视觉、语音或肌电输入实现抓取意图识别。学生将完成手指关节建模、驱动布局、传感反馈、抓取策略与自主控制程序，通过不同形状和材质物体测试抓取稳定性、响应速度与成本效率。' },
  { id: 'p07', title: '宝可梦场景智能体与NPC社会行为研究', majors: ['人工智能', '计算机科学', '游戏设计'], campIds: ['agent', 'fullstack'], description: '本课题以开放式宝可梦风格场景为实验环境，研究大语言模型智能体如何驱动NPC形成记忆、目标、关系和群体行为。学生将设计角色人格与世界规则，搭建长期记忆、任务规划、对话生成和社会关系模块，并记录不同提示策略下的行为变化，最终形成可交互场景、NPC智能体系统与实验分析报告。' },
  { id: 'p08', title: '自供电火灾逃生指示地砖系统', majors: ['电子工程', '能源与动力工程', '安全工程'], campIds: ['wearable', 'fullstack'], description: '本课题面向商场断电、烟雾遮挡和人群疏散路径动态变化等场景，设计利用行人踩踏收集压电能量的智能指示地砖。系统结合温度、烟雾和人流传感节点判断风险区域，并通过分布式灯光箭头动态调整逃生方向。学生将完成能量采集电路、低功耗通信、地砖结构、路径控制与场景测试。' },
  { id: 'p09', title: '宠物行为健康监测项圈系统', majors: ['电子工程', '人工智能', '动物科学'], campIds: ['perception', 'wearable'], description: '本课题设计集成加速度计、陀螺仪、温度与麦克风的智能项圈，在边缘端识别抓挠、甩头、咳嗽、吠叫和活动下降等行为信号。学生将完成传感数据同步、音频特征提取、轻量模型训练、低功耗硬件与移动端展示，并通过不同宠物和环境开展测试。' },
  { id: 'p10', title: '毫米波雷达预警智能骑行风镜', majors: ['电子工程', '交通工程', '工业设计'], campIds: ['perception', 'wearable'], description: '本课题针对骑行者后方车辆接近难感知、明暗环境切换时视线适应滞后的问题，设计集成后置毫米波雷达与快速调光镜片的智能骑行风镜。系统判断目标距离、相对速度和碰撞风险，以灯光、声音或振动进行分级提醒，并根据环境照度自动调节透光率。' },
  { id: 'p11', title: '多源感知智能导盲避障盲杖', majors: ['人工智能', '生物医学工程', '机器人工程'], campIds: ['perception', 'wearable'], description: '本课题融合摄像头、超声波、惯性测量与距离传感信息，建立分层避障和场景识别逻辑。系统通过不同位置、频率的振动及简短语音传递方向与风险等级，减少信息过载。学生将完成传感融合、目标识别、盲杖结构、反馈编码及模拟道路测试。' },
  { id: 'p12', title: '模块化多模态提醒智能药盒', majors: ['生物医学工程', '电子工程', '工业设计'], campIds: ['wearable', 'fullstack'], description: '本课题面向老年人、慢病患者容易漏服、错服的问题，设计可拆换的模块化分仓药盒，并结合重量、开合或光电传感判断取药状态。系统通过灯光、语音、振动和手机端进行分级提醒。学生将完成人机需求调研、结构建模、嵌入式控制、提醒逻辑和可用性测试。' },
  { id: 'p13', title: '自驱动太阳能海水淡化系统', majors: ['环境工程', '材料科学与工程', '能源与动力工程'], campIds: ['robot', 'drone'], description: '本课题利用透明亚克力腔体形成微型温室效应，并通过高吸光界面材料强化太阳能光热蒸发。水汽在倾斜冷凝面汇集后自动流入储水区，实现无需外部电源的海水淡化。学生将比较不同材料、结构角度和环境条件下的产水率、盐截留率与热效率。' },
  { id: 'p14', title: '潜水员水下互联通信系统', majors: ['通信工程', '海洋工程', '电子工程'], campIds: ['wearable', 'perception'], description: '本课题研究短距离声学调制与低码率水下数据通信方案。终端结合深度、姿态、温度和紧急按键，将位置状态或预设短报文编码后发送，并通过确认与重传提高可靠性。学生将完成声学收发电路、通信协议、低功耗终端、传感数据融合及水池测试。' },
  { id: 'p15', title: '半虚拟键盘触觉交互系统', majors: ['人机交互', '计算机科学', '电子工程'], campIds: ['perception', 'fullstack'], description: '本课题探索在无实体键帽或轻量投影界面上实现接近真实键盘的输入体验。系统利用摄像头识别手指位置与敲击动作，结合压力、振动或局部声学反馈确认按键，并通过校准算法减少遮挡、误触和视角变化带来的偏差。' },
  { id: 'p16', title: 'ESP32-S3 边缘AI导盲辅助系统', majors: ['电子工程', '人工智能', '生物医学工程'], campIds: ['wearable', 'perception'], description: '本课题以ESP32-S3为核心构建低成本、低功耗的便携式导盲辅助终端，在设备本地运行轻量视觉或音频模型，识别门、楼梯、车辆及常见障碍，并在无网络环境下通过振动和语音提供即时提示。学生将完成模型压缩部署、嵌入式程序、功耗管理和佩戴结构设计。' },
  { id: 'p17', title: '模块化自适应防汛装置', majors: ['材料科学与工程', '土木工程', '机械工程'], campIds: ['robot', 'drone'], description: '本课题利用聚丙烯酸钠吸水膨胀特性设计轻量化模块单元。装置遇水后快速增重并形成连续挡水结构，可通过卡扣适配不同宽度和地面起伏。学生将研究材料配比、吸水倍率、膨胀速度、外层织物和连接结构，并开展渗漏、承压、重复使用及部署效率测试。' },
  { id: 'p18', title: '天驿计划：未来低空物流无人运输系统', majors: ['航空航天工程', '自动化', '交通运输工程'], campIds: ['drone', 'perception'], description: '天驿计划研究由无人机、智能起降站和任务调度平台组成的低空运输系统。学生将分析载重、航程、能耗、航线安全和天气影响，设计货舱结构、动力配置、多源感知与自主避障方案，并在仿真或缩比平台上完成调度测试。' },
  { id: 'p19', title: '仿生机械尾部运动增强系统', majors: ['机械工程', '机器人工程', '生物医学工程'], campIds: ['robot', 'wearable'], description: '本课题研究仿生机械尾部能否通过姿态调节、动态配重和交互反馈辅助人体完成平衡训练或增强动作表达。系统结合惯性测量单元与表面肌电信号识别躯干运动和肌肉意图，驱动多关节尾部产生协同摆动。学生将完成仿生结构、传动机构、肌电采集与安全限位设计。' },
  { id: 'p20', title: '视觉手势与音乐映射情绪调节系统', majors: ['人工智能', '音乐科技', '人机交互'], campIds: ['perception', 'fullstack'], description: '本课题利用摄像头识别手势轨迹、速度、幅度与身体姿态，并将动作实时映射为旋律、节奏、音色和视觉反馈。学生将设计不同情绪目标下的交互规则，完成姿态识别、音乐生成、实时界面和用户实验，形成兼具技术验证与人文关怀的交互原型。' },
]

export const camps: Camp[] = [
  { id: 'agent', name: '大模型AI智能体开发营', subtitle: 'Agent Systems', description: '围绕智能体规划、工具调用、知识库与多智能体协作，完成一个能够持续执行任务的AI应用。', focus: ['提示与任务规划', 'RAG知识库', '智能体工具调用'], output: '可运行的智能体应用原型' },
  { id: 'fullstack', name: 'AI原生全栈系统开发营', subtitle: 'AI Native Full-stack', description: '从数据、模型能力到交互界面，学习把AI能力装进一个完整、可演示的软件系统。', focus: ['前端交互', '服务与数据', 'AI能力集成'], output: '完整AI产品Demo' },
  { id: 'perception', name: '无人驾驶多源融合感知营', subtitle: 'Multi-sensor Perception', description: '学习融合视觉、雷达、惯性测量与距离传感器，让系统能够理解环境并形成可靠判断。', focus: ['传感器接入', '多源数据融合', '边缘识别'], output: '多传感感知与决策原型' },
  { id: 'wearable', name: '集成电路与智能穿戴装置营', subtitle: 'Wearable Electronics', description: '围绕微控制器、电路、传感与低功耗设计，完成可穿戴或便携式智能硬件。', focus: ['ESP32与电路', '传感数据采集', '可穿戴原型'], output: '可运行智能穿戴装置' },
  { id: 'robot', name: '具身智能机器人创新营', subtitle: 'Embodied Robotics', description: '把机械结构、执行机构、感知与控制连接起来，完成能够在真实环境中行动的机器人原型。', focus: ['机械结构', '运动与控制', '机器人系统集成'], output: '具身机器人功能原型' },
  { id: 'drone', name: '多模态无人机创新设计营', subtitle: 'Multimodal Drone Design', description: '从飞行平台、任务载荷到感知与路径规划，完成面向具体场景的无人机系统设计。', focus: ['飞行器结构', '任务载荷', '路径与场景验证'], output: '无人机任务系统方案或缩比原型' },
]

export const competitions: Competition[] = [
  { id: 'conrad', shortName: 'Conrad', name: 'Conrad Challenge 康莱德创新挑战赛', description: '适合具有明确社会问题、创新技术方案与跨学科验证路径的项目。' },
  { id: 'icc', shortName: 'ICC', name: 'ICC 全球发明大会', description: '适合创新产品、工程设计及综合发明成果展示。' },
  { id: 'iena', shortName: 'iENA', name: 'iENA 德国纽伦堡国际发明展', description: '适合具有实体原型、工程创新或应用价值的发明项目。' },
  { id: 'diamond', shortName: 'Diamond', name: 'Diamond Challenge 钻石挑战赛', description: '适合能够形成用户价值、解决方案与项目表达的创新方向。' },
  { id: 'blueocean', shortName: 'Blue Ocean', name: 'Blue Ocean 蓝海创业大赛', description: '适合具备用户洞察、市场机会与创新模式的项目。' },
  { id: 'bpa', shortName: 'BPA', name: 'BPA 美国商业全能挑战赛', description: '适合能够延展商业计划、运营思路与英文表达的项目。' },
  { id: 'bpc', shortName: 'BPC', name: 'BPC 哈佛商业挑战论坛', description: '适合把技术成果进一步转化为商业叙事与项目提案的方向。' },
]

export const conradProjectIds = new Set(['p01', 'p03', 'p05', 'p08', 'p11', 'p13', 'p17', 'p20'])
export const softwareOnlyProjectIds = new Set(['p02', 'p07'])

export const majors = Array.from(new Set(projects.flatMap((project) => project.majors))).sort((a, b) => a.localeCompare(b, 'zh-CN'))

export function compatibleCompetitionIds(project: Project) {
  const ids = ['icc', 'diamond', 'blueocean', 'bpa', 'bpc']
  if (!softwareOnlyProjectIds.has(project.id)) ids.splice(1, 0, 'iena')
  if (conradProjectIds.has(project.id)) ids.unshift('conrad')
  return ids
}
