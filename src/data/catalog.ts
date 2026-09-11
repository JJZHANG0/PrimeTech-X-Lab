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
  theme: string
  focus: string[]
  output: string
  outputs: string[]
  majorShare: { name: string; value: number }[]
}

export type Competition = {
  id: string
  name: string
  shortName: string
  description: string
  detail: string
  logo?: string
  timeline: { date: string; label: string; note?: string }[]
  timelineNote: string
  sourceUrl?: string
  tags: string[]
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

const standardCampOutputs = [
  '一份结构完整、可公开展示的探究性学习报告',
  '一套贴合营地主题、由学生自主设计的装置或系统原型',
  '一册覆盖需求、实验、失败与迭代的全流程工程测试记录',
  '一份包含源代码、结构图、电路图与实验数据的项目资料包',
  '一套面向评审与公众表达的技术路演PPT及三分钟演示视频',
  '一份可沉淀进成长档案的个人贡献说明、导师评语与成果摘要',
]

export const camps: Camp[] = [
  { id: 'agent', name: '大模型AI智能体开发营', subtitle: 'Agent Systems', description: '围绕智能体规划、工具调用、知识库与多智能体协作，完成一个能够持续执行任务的AI应用。', theme: '这不是一次简单的聊天机器人练习，而是把大模型变成能够理解目标、拆解任务并调用真实工具的数字协作者。你将从提示工程出发，搭建RAG知识库、长期记忆与工作流编排，让智能体可以搜索资料、处理数据、生成内容并自我检查；再通过评测集观察幻觉、稳定性和成本之间的取舍。最终，你会亲手构建一个有明确用户、有任务闭环、可以持续迭代的AI原生产品。', focus: ['提示与任务规划', 'RAG知识库', '智能体工具调用'], output: '可运行的智能体应用原型', outputs: standardCampOutputs, majorShare: [{ name: '人工智能', value: 40 }, { name: '计算机科学', value: 35 }, { name: '数据科学', value: 25 }] },
  { id: 'fullstack', name: 'AI原生全栈系统开发营', subtitle: 'AI Native Full-stack', description: '从数据、模型能力到交互界面，学习把AI能力装进一个完整、可演示的软件系统。', theme: '一个真正能被使用的AI项目，需要的不只是模型调用，还要有流畅界面、可靠数据和完整服务链路。本营地会带你从用户任务与信息架构开始，连接前端交互、后端接口、数据库和模型能力，处理登录、状态、错误恢复与部署等真实产品问题。你会学习如何把模糊想法拆成可验证功能，用快速原型收集反馈，再把代码打磨成可以公开访问和现场演示的完整系统。', focus: ['前端交互', '服务与数据', 'AI能力集成'], output: '完整AI产品Demo', outputs: standardCampOutputs, majorShare: [{ name: '计算机科学', value: 35 }, { name: '人工智能', value: 35 }, { name: '人机交互', value: 30 }] },
  { id: 'perception', name: '无人驾驶多源融合感知营', subtitle: 'Multi-sensor Perception', description: '学习融合视觉、雷达、惯性测量与距离传感器，让系统能够理解环境并形成可靠判断。', theme: '让机器在复杂环境中“看见”并作出可信判断，是无人系统最关键的能力之一。你将接触摄像头、毫米波雷达、超声波与IMU等真实传感器，理解标定、时间同步、坐标变换和噪声过滤，并把不同来源的数据融合成稳定的目标、距离与运动状态。课程还会引入边缘端模型部署和风险决策，让系统不只识别物体，更能在延迟、遮挡和误检中给出安全反应，形成可量化测试的感知闭环。', focus: ['传感器接入', '多源数据融合', '边缘识别'], output: '多传感感知与决策原型', outputs: standardCampOutputs, majorShare: [{ name: '人工智能', value: 35 }, { name: '电子工程', value: 35 }, { name: '自动化', value: 30 }] },
  { id: 'wearable', name: '集成电路与智能穿戴装置营', subtitle: 'Wearable Electronics', description: '围绕微控制器、电路、传感与低功耗设计，完成可穿戴或便携式智能硬件。', theme: '把电路真正穿在身上，意味着每一克重量、每一毫安功耗和每一次误触都需要被认真设计。你将从ESP32等微控制器出发，完成传感器选型、电路连接、信号采集、无线通信与低功耗策略，再结合人体工学和结构设计解决佩戴舒适度、可靠性与安全性。通过连续采样和真实用户测试，你会让一块原始开发板逐步成长为能够记录行为、识别状态并提供反馈的完整智能装置。', focus: ['ESP32与电路', '传感数据采集', '可穿戴原型'], output: '可运行智能穿戴装置', outputs: standardCampOutputs, majorShare: [{ name: '生物医学工程', value: 35 }, { name: '电子工程', value: 35 }, { name: '工业设计', value: 30 }] },
  { id: 'robot', name: '具身智能机器人创新营', subtitle: 'Embodied Robotics', description: '把机械结构、执行机构、感知与控制连接起来，完成能够在真实环境中行动的机器人原型。', theme: '具身智能的魅力，在于算法必须穿过电机、齿轮和传感器，最终在真实世界中完成动作。你将围绕一个具体任务设计机械结构和执行机构，建立运动学模型，接入视觉或姿态感知，并通过控制算法让机器人稳定地抓取、移动或与人互动。课程会持续面对摩擦、负载、延迟和安全限位等真实工程问题，在仿真与实机测试之间循环验证，最终做出一个动作可重复、性能可测量的机器人系统。', focus: ['机械结构', '运动与控制', '机器人系统集成'], output: '具身机器人功能原型', outputs: standardCampOutputs, majorShare: [{ name: '机器人工程', value: 40 }, { name: '机械工程', value: 35 }, { name: '人工智能', value: 25 }] },
  { id: 'drone', name: '多模态无人机创新设计营', subtitle: 'Multimodal Drone Design', description: '从飞行平台、任务载荷到感知与路径规划，完成面向具体场景的无人机系统设计。', theme: '无人机不是一台会飞的相机，而是一套同时受空气动力、能源、载荷、感知和任务约束的复杂系统。你将从真实场景反推航程与载重，设计机体和任务载荷，理解飞控、姿态估计、定位与路径规划，并融合视觉或其他传感信息完成自主判断。课程通过仿真、缩比实验和安全测试不断校准方案，让每一次起飞都有任务逻辑，每一组数据都能支撑设计决策，最终形成完整的低空系统提案。', focus: ['飞行器结构', '任务载荷', '路径与场景验证'], output: '无人机任务系统方案或缩比原型', outputs: standardCampOutputs, majorShare: [{ name: '航空航天工程', value: 40 }, { name: '自动化', value: 35 }, { name: '交通运输工程', value: 25 }] },
]

export const competitions: Competition[] = [
  {
    id: 'conrad', shortName: 'Conrad', name: 'Conrad Challenge 康莱德创新挑战赛',
    description: '适合具有明确社会问题、创新技术方案与跨学科验证路径的项目。',
    detail: '面向青少年的全球创新挑战，强调从真实问题出发，把科学、技术与创业思维连接成可验证的解决方案。适合已有清晰痛点、原型思路和社会价值表达的团队。',
    logo: 'conrad.svg', tags: ['全球科创', '原型验证', '英文路演'], sourceUrl: 'https://conrad.spacecenter.org/',
    timelineNote: '2026–2027 赛程资料；地点与日期请以组委会最终通知为准。',
    timeline: [
      { date: '2026.12.15', label: '报名截止' },
      { date: '2026.12.25', label: '初赛截止' },
      { date: '2027.02.27', label: '复赛截止' },
      { date: '2027.03.11–03.14', label: '中国决赛', note: '上海' },
      { date: '2027.04.21–04.24', label: '全球站', note: '美国·休斯顿' },
    ],
  },
  {
    id: 'icc', shortName: 'ICC', name: 'ICC 全球发明大会（中国）',
    description: '适合创新产品、工程设计及综合发明成果展示。',
    detail: '围绕发明过程、原创性、社会价值与现场表达进行综合评审。参赛者通常需要准备发明原型或模型、发明日志、查新材料、展板与路演内容。',
    logo: 'icc.png', tags: ['白名单赛事', '发明创造', '作品展示'], sourceUrl: 'https://icc.cffpd.org.cn/',
    timelineNote: '2026–2027 学年具体日程尚未公布；下列已结束节点用于了解往届节奏。',
    timeline: [
      { date: '待官方公布', label: '2026–2027 学年新赛季' },
      { date: '2026.04.04–06.15', label: '上一届报名', note: '已结束' },
      { date: '2026.06–07', label: '上一届省赛／主题赛', note: '已结束' },
      { date: '2026.08.15–08.16', label: '上一届全国总决赛暨国际赛', note: '郑州·已结束' },
    ],
  },
  {
    id: 'iena', shortName: 'iENA', name: 'iENA 德国纽伦堡国际发明展',
    description: '适合具有实体原型、工程创新或应用价值的发明项目。',
    detail: '德国纽伦堡国际发明展面向发明人、研究机构与创新团队，重点展示具有新颖性、可应用性和转化潜力的实体发明，是连接评审、行业交流与成果展示的平台。',
    logo: 'iena.png', tags: ['国际发明展', '实体原型', '成果转化'], sourceUrl: 'https://www.iena.de/en/',
    timelineNote: 'iENA 官网公布的 2026 年展会与参展节点。',
    timeline: [
      { date: '2026.08.28', label: '早鸟价格截止', note: '已结束' },
      { date: '2026.10.02', label: '报名截止' },
      { date: '2026.10.31–11.02', label: 'iENA 2026', note: '德国·纽伦堡会展中心' },
    ],
  },
  {
    id: 'diamond', shortName: 'Diamond', name: 'Diamond Challenge 钻石挑战赛',
    description: '适合能够形成用户价值、解决方案与项目表达的创新方向。',
    detail: '面向全球中学生的创业挑战，鼓励团队围绕商业创新或社会创新形成问题洞察、价值主张、可行方案与完整路演。',
    logo: 'diamond.png', tags: ['商业创新', '社会创新', '英文路演'], sourceUrl: 'https://diamondchallenge.org/',
    timelineNote: '2026–2027 赛程资料；中国半决赛日期仍待公布。',
    timeline: [
      { date: '2026.09.16', label: '参赛窗口开放' },
      { date: '2027.01.14 · 17:00 EST', label: '材料提交截止' },
      { date: '2027.02.10 · 23:59 EST', label: '晋级通知' },
      { date: '2027.03', label: '中国半决赛', note: '具体日期待公布' },
      { date: '2027.03.09', label: '全球入围者公布' },
      { date: '2027.04.29–04.30', label: '世界峰会' },
    ],
  },
  {
    id: 'blueocean', shortName: 'Blue Ocean', name: 'Blue Ocean 蓝海创业大赛',
    description: '适合具备用户洞察、市场机会与创新模式的项目。',
    detail: '面向 14–18 岁学生的全球线上创业竞赛。参赛者需运用蓝海战略工具，把创新商业想法制作成五分钟英文视频路演。',
    logo: 'blue-ocean.png', tags: ['创业赛', '视频路演', '线上参与'], sourceUrl: 'https://blueoceancompetition.org/compete/',
    timelineNote: 'Blue Ocean 官网公布的 2027 赛程。',
    timeline: [
      { date: '随时', label: '在线注册开放' },
      { date: '2027.02.21', label: '视频路演提交截止' },
      { date: '2027.04.05', label: 'Top 100 公布' },
      { date: '2027.04.22', label: 'Top 30 公布' },
      { date: '2027.05.04', label: 'Top 10 公布' },
      { date: '2027.05.13', label: '获奖结果公布' },
    ],
  },
  {
    id: 'bpa', shortName: 'BPA', name: 'BPA 美国商业全能挑战赛',
    description: '适合能够延展商业计划、运营思路与英文表达的项目。',
    detail: '以商业实践、创新创业和综合职业能力为核心的学生挑战。技术项目可进一步转化为商业计划、市场分析、运营方案与英文展示。',
    logo: 'bpa.svg', tags: ['商业实践', '团队协作', '国际舞台'], sourceUrl: 'https://bpa.org/',
    timelineNote: '2026–2027 赛程资料；区域站月份以最终通知为准。',
    timeline: [
      { date: '2026.06.12–12.06', label: '报名时间' },
      { date: '2026.12.20', label: '初选站', note: '实战组作品提交' },
      { date: '2027.02–03', label: '区域站', note: '中国站' },
      { date: '2027.05', label: '全球站', note: '美国·丹佛' },
      { date: '2027.08', label: '亚洲全球站', note: '中国香港' },
    ],
  },
  {
    id: 'ctb', shortName: 'CTB', name: 'CTB 全球青年研究创新论坛',
    description: '适合跨学科研究、社会实践、论文写作与项目成果展示。',
    detail: '以项目制学习为基础的青年研究创新论坛。团队可以通过研究、发明、编程、商业创新、艺术或公益实践提出原创解决方案，并形成论文与现场展示。',
    logo: 'ctb.png', tags: ['跨学科研究', '论文写作', '项目实践'], sourceUrl: 'https://www.chinathinksbig.com/',
    timelineNote: 'CTB 官网公布的 2026–2027 赛程；带 * 的现场日期为暂定。',
    timeline: [
      { date: '2026.11.30', label: '报名截止' },
      { date: '2026.12.07', label: '组队启动' },
      { date: '2027.01.20', label: '论文／项目提交' },
      { date: '2027.02.26–02.28', label: '全国站 *', note: '北京／上海' },
      { date: '2027.04.03–04.08', label: '全球站 *', note: '哈佛大学' },
    ],
  },
  {
    id: 'bpc', shortName: 'BPC', name: 'BPC Business Pioneer Case Challenge 青年商业案例分析挑战',
    description: '适合商业案例分析、战略决策、沙盘模拟与董事会式路演。',
    detail: 'BPC 以真实商业案例为核心，让学生以企业管理者和青年分析师的视角研究行业、拆解问题并制定战略。参赛团队会经历案例分析、商业模拟和董事会式路演，把定量数据、商业判断、协作与表达连接成一套完整决策能力。',
    tags: ['案例分析', '商业模拟', '董事会路演'], sourceUrl: 'https://www.hauscr.org/bpc',
    timelineNote: '2026–2027 新赛季时间尚待主办方公布；下列展示标准赛制节奏。',
    timeline: [
      { date: '待官方公布', label: '报名与组队' },
      { date: '待官方公布', label: '线上案例分析与商业模拟' },
      { date: '待官方公布', label: '全国论坛路演' },
      { date: '待官方公布', label: '全球案例挑战' },
    ],
  },
]

export const conradProjectIds = new Set(['p01', 'p03', 'p05', 'p08', 'p11', 'p13', 'p17', 'p20'])
export const softwareOnlyProjectIds = new Set(['p02', 'p07'])

export const majors = Array.from(new Set(projects.flatMap((project) => project.majors))).sort((a, b) => a.localeCompare(b, 'zh-CN'))

export function compatibleCompetitionIds(project: Project) {
  const ids = ['icc', 'diamond', 'blueocean', 'bpa', 'ctb', 'bpc']
  if (!softwareOnlyProjectIds.has(project.id)) ids.splice(1, 0, 'iena')
  if (conradProjectIds.has(project.id)) ids.unshift('conrad')
  return ids
}
