export type Project = {
  id: string
  title: string
  majors: string[]
  description: string
  campIds: string[]
  competitionIds: string[]
  poster?: string
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
  { id: 'p01', title: 'ProShot：投篮动作量化装置', majors: ['运动人体科学', '人工智能', '生物医学工程'], campIds: ['perception', 'wearable'], competitionIds: ['iena', 'bpa', 'icc'], poster: 'project-posters/p01.jpg', description: 'ProShot面向篮球训练中动作评价依赖教练经验、训练数据难以沉淀的问题，利用惯性传感器或视觉识别采集出手角度、手腕速度、身体姿态与命中结果，建立投篮动作量化模型，并通过移动端界面生成即时反馈与训练趋势。学生将完成传感采集、动作特征提取、评分算法和原型测试，最终形成可用于个人训练及教练评估的智能运动辅助装置。' },
  { id: 'p02', title: 'The Last Library of Human Mistakes', majors: ['人工智能', '计算机科学', '数据科学'], campIds: ['agent', 'fullstack'], competitionIds: ['bpa', 'diamond', 'icc', 'iena'], poster: 'project-posters/p02.jpg', description: 'The Last Library of Human Mistakes是一套以“失败经验能否成为可检索知识”为核心的AI数字档案系统。项目收集经匿名处理的学习、工程或决策失误案例，利用结构化标签、语义检索与大语言模型智能体进行归因分析，帮助用户发现相似错误、理解形成机制并获得改进建议。学生将完成数据规范、知识库、RAG问答、交互界面以及偏差与隐私测试。' },
  { id: 'p03', title: 'MindBeat：智能空灵鼓认知训练系统', majors: ['音乐科技', '生物医学工程', '认知科学'], campIds: ['wearable', 'fullstack'], competitionIds: ['icc', 'iena', 'bpa'], poster: 'project-posters/p03.jpg', description: 'MindBeat将空灵鼓的低门槛演奏方式与认知训练结合，通过压力、敲击位置和节奏传感记录用户的演奏行为，并设计注意力、工作记忆与节奏模仿等互动任务。系统根据反应时间、节奏稳定性和任务完成度生成个性化反馈，探索音乐交互对青少年或特殊需求群体认知参与的作用。学生将完成硬件采集、音乐映射、训练界面与小规模用户测试。' },
  { id: 'p04', title: 'NeuroScope：基于脑电信号的注意力与认知状态可视化研究实验', majors: ['神经科学', '生物医学工程', '人工智能'], campIds: ['wearable', 'fullstack'], competitionIds: ['icc', 'diamond', 'iena', 'bpa'], poster: 'project-posters/p04.jpg', description: 'NeuroScope围绕注意力状态难以被直观观察的问题，使用便携式脑电设备采集不同任务条件下的EEG信号，对Alpha、Beta等频段特征进行滤波、提取与比较，并将结果转化为实时可视化反馈。学生将设计专注、放松和认知负荷实验，分析个体差异与信号噪声，完成采集终端、数据处理程序、可视化界面及规范化实验报告，理解脑机接口研究的边界。' },
  { id: 'p05', title: '智能膝盖外骨骼康复系统设计与实现', majors: ['机械工程', '生物医学工程', '机器人工程'], campIds: ['robot', 'wearable'], competitionIds: ['iena', 'icc', 'bpa'], poster: 'project-posters/p05.jpg', description: '本课题面向膝关节术后或运动损伤人群的辅助训练需求，设计轻量化膝部外骨骼结构，利用角度、压力或肌电传感器识别屈伸状态，并通过电机或弹性助力机构提供分级辅助。学生将开展人体工学尺寸分析、机械结构建模、驱动控制、限位保护与步态测试，重点验证佩戴舒适性、运动范围和控制响应，最终完成可演示原型及康复训练数据界面。' },
  { id: 'p06', title: '低成本灵巧仿生手的多模态交互与自主控制系统', majors: ['机器人工程', '机械工程', '人工智能'], campIds: ['robot', 'wearable'], competitionIds: ['iena', 'icc', 'bpa'], poster: 'project-posters/p06.jpg', description: '本课题聚焦高自由度仿生手成本高、控制复杂的问题，采用3D打印结构、腱绳传动和低成本舵机构建多指执行平台，并融合视觉、语音或肌电输入实现抓取意图识别。学生将完成手指关节建模、驱动布局、传感反馈、抓取策略与自主控制程序，通过不同形状和材质物体测试抓取稳定性、响应速度与成本效率，形成可迭代的仿生手原型和控制系统。' },
  { id: 'p07', title: '宝可梦场景智能体交互与NPC社会行为研究系统', majors: ['人工智能', '计算机科学', '游戏设计'], campIds: ['agent', 'fullstack'], competitionIds: ['bpa', 'iena'], poster: 'project-posters/p07.jpg', description: '本课题以开放式宝可梦风格场景为实验环境，研究大语言模型智能体如何驱动NPC形成记忆、目标、关系和群体行为。学生将设计角色人格与世界规则，搭建长期记忆、任务规划、对话生成和社会关系模块，并记录不同提示策略下的行为变化。项目最终形成可交互场景、NPC智能体系统与实验分析报告，用于探讨生成式AI在游戏叙事和虚拟社会模拟中的应用边界。' },
  { id: 'p08', title: '基于压电能量收集与分布式感知的商场自供电火灾逃生指示地砖系统', majors: ['电子工程', '能源与动力工程', '安全工程'], campIds: ['wearable', 'fullstack'], competitionIds: ['iena', 'icc', 'diamond', 'bpa'], poster: 'project-posters/p08.jpg', description: '本课题面向商场断电、烟雾遮挡和人群疏散路径动态变化等火灾场景，设计能够利用行人踩踏收集压电能量的智能指示地砖。系统结合温度、烟雾和人流传感节点判断风险区域，并通过分布式灯光箭头动态调整逃生方向。学生将完成能量采集电路、低功耗通信、地砖结构、路径控制与场景测试，评估发电效率、指示可见度和系统可靠性。' },
  { id: 'p09', title: '基于多传感器融合与边缘音频识别的宠物行为健康监测项圈系统', majors: ['电子工程', '人工智能', '动物科学'], campIds: ['perception', 'wearable'], competitionIds: ['bpa', 'diamond', 'iena', 'icc'], poster: 'project-posters/p09.jpg', description: '本课题面向宠物异常行为难以及时发现的问题，设计集成加速度计、陀螺仪、温度与麦克风的智能项圈，在边缘端识别抓挠、甩头、咳嗽、吠叫和活动下降等行为信号。学生将完成传感数据同步、音频特征提取、轻量模型训练、低功耗硬件与移动端展示，并通过不同宠物和环境开展测试，评估识别准确率、续航表现及健康预警的实际可用性。' },
  { id: 'p10', title: '基于后置毫米波雷达预警与自适应快速调光的智能骑行风镜系统', majors: ['电子工程', '交通工程', '工业设计'], campIds: ['perception', 'wearable'], competitionIds: ['iena', 'icc', 'diamond', 'bpa'], poster: 'project-posters/p10.jpg', description: '本课题针对骑行者后方车辆接近难感知、进出隧道或明暗环境切换时视线适应滞后的问题，设计集成后置毫米波雷达与快速调光镜片的智能骑行风镜。系统判断目标距离、相对速度和碰撞风险，以灯光、声音或振动进行分级提醒，并根据环境照度自动调节透光率。学生将完成传感融合、风险算法、镜架结构、人机交互和道路场景验证。' },
  { id: 'p11', title: '基于多源传感器融合与触觉声学反馈的智能导盲避障盲杖系统', majors: ['人工智能', '生物医学工程', '机器人工程'], campIds: ['perception', 'wearable'], competitionIds: ['icc', 'iena', 'diamond', 'bpa'], poster: 'project-posters/p11.jpg', description: '本课题面向视障者在复杂道路中识别台阶、悬空障碍和动态目标的需求，融合摄像头、超声波、惯性测量与距离传感信息，建立分层避障和场景识别逻辑。系统通过不同位置、频率的振动及简短语音传递方向与风险等级，减少信息过载。学生将完成传感融合、目标识别、盲杖结构、反馈编码及模拟道路测试，重点评估准确率、反应时间和使用负担。' },
  { id: 'p12', title: '基于模块化多规格分仓与多模态提醒的智能药盒系统设计与实现', majors: ['生物医学工程', '电子工程', '工业设计'], campIds: ['wearable', 'fullstack'], competitionIds: ['icc', 'diamond', 'iena', 'bpa'], poster: 'project-posters/p12.jpg', description: '本课题面向老年人、慢病患者多种药品尺寸不同且容易漏服、错服的问题，设计可拆换的模块化分仓药盒，并结合重量、开合或光电传感判断取药状态。系统通过灯光、语音、振动和手机端进行分级提醒，对未按时取药或重复开仓给出提示。学生将完成人机需求调研、结构建模、嵌入式控制、提醒逻辑和可用性测试，形成可运行原型与服药记录界面。' },
  { id: 'p13', title: '基于亚克力微型温室效应与界面光热转化的自驱动海水淡化系统', majors: ['环境工程', '材料科学与工程', '能源与动力工程'], campIds: ['robot', 'drone'], competitionIds: ['icc', 'iena', 'diamond', 'bpa'], poster: 'project-posters/p13.jpg', description: '本课题面向缺乏稳定电力和淡水来源的海岛或应急场景，利用透明亚克力腔体形成微型温室效应，并通过高吸光界面材料强化太阳能光热蒸发。水汽在倾斜冷凝面汇集后自动流入储水区，实现无需外部电源的海水淡化。学生将比较不同材料、结构角度和环境条件下的产水率、盐截留率与热效率，完成装置原型、实验数据和优化方案。' },
  { id: 'p14', title: '基于水下声学调制与多模态传感的潜水员互联通信系统', majors: ['通信工程', '海洋工程', '电子工程'], campIds: ['wearable', 'perception'], competitionIds: ['iena', 'icc', 'bpa'], poster: 'project-posters/p14.jpg', description: '本课题针对水下无线电衰减严重、潜水员之间难以稳定传递关键信息的问题，研究短距离声学调制与低码率数据通信方案。终端结合深度、姿态、温度和紧急按键，将位置状态或预设短报文编码后发送，并通过确认与重传提高可靠性。学生将完成声学收发电路、通信协议、低功耗终端、传感数据融合及水池测试，评估误码率、传输距离和响应时延。' },
  { id: 'p15', title: '基于多模态触觉反馈与计算机视觉的半虚拟键盘交互系统', majors: ['人机交互', '计算机科学', '电子工程'], campIds: ['perception', 'fullstack'], competitionIds: ['iena', 'icc', 'diamond', 'bpa'], poster: 'project-posters/p15.jpg', description: '本课题探索在无实体键帽或轻量投影界面上实现接近真实键盘的输入体验。系统利用摄像头识别手指位置与敲击动作，结合压力、振动或局部声学反馈确认按键，并通过校准算法减少遮挡、误触和视角变化带来的偏差。学生将完成视觉追踪、坐标映射、触觉模块、输入界面及打字实验，对输入速度、识别准确率、学习成本与便携性进行系统评估。' },
  { id: 'p16', title: '基于ESP32-S3与边缘AI的智能导盲辅助系统', majors: ['电子工程', '人工智能', '生物医学工程'], campIds: ['wearable', 'perception'], competitionIds: ['icc', 'iena', 'diamond', 'bpa'], poster: 'project-posters/p16.jpg', description: '本课题以ESP32-S3为核心构建低成本、低功耗的便携式导盲辅助终端，在设备本地运行轻量视觉或音频模型，识别门、楼梯、车辆及常见障碍，并在无网络环境下通过振动和语音提供即时提示。学生将完成摄像头与传感器接入、模型压缩部署、嵌入式程序、功耗管理和佩戴结构设计，通过多场景测试评估识别准确率、响应时延、续航及使用安全性。' },
  { id: 'p17', title: '基于聚丙烯酸钠的模块化自适应防汛装置设计', majors: ['材料科学与工程', '土木工程', '机械工程'], campIds: ['robot', 'drone'], competitionIds: ['iena', 'icc', 'diamond', 'bpa'], poster: 'project-posters/p17.jpg', description: '本课题面向城市商铺、地下空间和社区入口在突发积水时传统沙袋运输慢、储存占地大的问题，利用聚丙烯酸钠吸水膨胀特性设计轻量化模块单元。装置遇水后快速增重并形成连续挡水结构，可通过卡扣适配不同宽度和地面起伏。学生将研究材料配比、吸水倍率、膨胀速度、外层织物和连接结构，并开展渗漏、承压、重复使用及部署效率测试。' },
  { id: 'p18', title: '天驿计划：未来低空物流无人运输系统研究', majors: ['航空航天工程', '自动化', '交通运输工程'], campIds: ['drone', 'perception'], competitionIds: ['diamond', 'bpa', 'icc', 'iena'], poster: 'project-posters/p18.jpg', description: '天驿计划聚焦校园、园区或偏远地区短距离物流效率低的问题，研究由无人机、智能起降站和任务调度平台组成的低空运输系统。学生将分析载重、航程、能耗、航线安全和天气影响，设计货舱结构、动力配置、多源感知与自主避障方案，并在仿真或缩比平台上完成调度测试。项目最终形成运输原型、控制系统、运营场景分析及安全风险评估。' },
  { id: 'p19', title: '基于人体运动感知与表面肌电交互的仿生机械尾部运动增强系统研究', majors: ['机械工程', '机器人工程', '生物医学工程'], campIds: ['robot', 'wearable'], competitionIds: ['iena', 'icc', 'bpa'], description: '本课题研究仿生机械尾部能否通过姿态调节、动态配重和交互反馈辅助人体完成平衡训练或增强动作表达。系统结合惯性测量单元与表面肌电信号识别躯干运动和肌肉意图，驱动多关节尾部产生协同摆动。学生将完成仿生结构、传动机构、肌电采集、控制算法、佩戴系统和安全限位设计，并通过静态平衡与动态动作实验评估响应速度、稳定性和人体负担。' },
  { id: 'p20', title: '基于视觉手势识别与实时音乐映射的青少年主动式情绪调节交互系统研究', majors: ['人工智能', '音乐科技', '人机交互'], campIds: ['perception', 'fullstack'], competitionIds: ['bpa', 'icc', 'iena'], description: '本课题面向青少年在压力或焦虑状态下缺少低门槛主动表达方式的问题，利用摄像头识别手势轨迹、速度、幅度与身体姿态，并将动作实时映射为旋律、节奏、音色和视觉反馈。学生将设计不同情绪目标下的交互规则，完成姿态识别、音乐生成、实时界面和用户实验，观察使用前后的主观情绪、自我效能与参与度变化，形成兼具技术验证与人文关怀的交互原型。' },
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
    description: '全球 STEM 创新与创业赛，重视原型、社会影响和商业可行性。',
    detail: 'Conrad Challenge 是面向 13–18 岁学生的全球 STEM 创新与创业赛事。团队从真实问题出发，经历创意激活、方案深化与全球峰会等阶段，把科学构想推进为包含用户需求、原型验证和商业模型的完整创新提案。\n\n它的含金量不只来自奖项，更来自技术可行性、社会影响与创业表达的综合评审，以及国际同龄人和行业专家共同参与的展示环境。赛事已覆盖 72 个国家、1000 多所学校；进入休斯顿全球峰会还可获得专家反馈、国际交流及奖学金等后续机会，适合已有较成熟原型与英文路演能力的团队。',
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
    description: '全国性青少年发明赛事，重视原创过程、工程实践与社会价值。',
    detail: '全球发明大会（中国）是面向青少年的全国性发明创新竞赛，围绕真实需求、原创性、技术可行性、社会价值和现场表达进行综合评审。参赛者通常要完成发明原型或模型，并用发明日志、查新材料、测试记录、展板与答辩证明作品如何一步步被做出来。\n\n赛事由中国人民对外友好协会发起、中国友好和平发展基金会主办，并列入教育部 2025–2028 学年中小学生全国性竞赛活动名单。它的含金量体现在对“完整发明过程”的认可：一项经过调研、实验和反复迭代的作品，比只有概念或漂亮外观的方案更有竞争力，也更适合沉淀为科技创新档案。',
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
    description: '国际发明展，适合成熟实体原型接受专业评审与产业反馈。',
    detail: 'iENA 是在德国纽伦堡举行的国际发明展，面向个人发明者、学校、大学、研究机构与企业，强调把具有新颖性和应用价值的实体发明带到公开展览、专业评审及产业交流场景中。它尤其适合已经完成结构、功能和测试闭环的硬件或工程项目。\n\n赛事的国际辨识度来自 75 年历史和跨国成果展示平台属性。2025 年官方统计有 540 余项发明、274 余家参展方及 21 个国家和地区参与，现场连接投资者、许可方、工程师与产品开发者。对学生而言，奖牌之外更重要的是接受国际评委检验、获得真实产业反馈，并理解发明如何走向专利、合作与成果转化。',
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
    description: '大学支持的全球高中生创业挑战，强调用户验证、创新模型与英文路演。',
    detail: 'Diamond Challenge 是由特拉华大学 Horn Entrepreneurship 发起的全球高中生创业挑战，支持商业创新与社会创新两条路径。学生需要围绕真实问题完成用户洞察、价值主张、商业或影响模型和英文路演，并在反馈中不断验证与迭代方案。\n\n赛事由大学创业教育体系和循证课程支持，并连接 2000 多位导师、评委及行业嘉宾；官方年度奖项规模超过 10 万美元。它的含金量更多体现在完整的创业方法、国际路演和可量化验证，而不只是获奖名称——能够证明学生真的理解用户、市场、影响力和方案落地。',
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
    description: '全球大型线上高中生创业赛，以蓝海战略和五分钟英文路演检验创意。',
    detail: 'Blue Ocean 是面向全球高中生的线上创业路演赛事。参赛者运用蓝海战略识别尚未被满足的需求，形成差异化价值主张，再把商业想法压缩成五分钟英文视频；它特别考验市场洞察、叙事结构，以及“为什么用户会选择你”的核心逻辑。\n\n它的优势是覆盖面大、参与门槛相对友好，同时能把作品放进全球语境中比较。官方披露 2026 年有 2.3 万余名学生、9000 余所学校和 173 个国家参与。优秀作品可获得创业者与商业人士评审、全球展示及现金奖励，适合希望强化商业表达、市场验证和英文传播能力的项目。',
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
    description: '商业与技术职业能力赛事，将项目成果转化为行业化方案与表达。',
    detail: 'BPA 以商业实践、创新创业和综合职业能力为核心，覆盖商业管理、金融、信息技术和市场营销等方向。其竞赛任务通常把课堂知识转化为案例分析、项目展示、技能操作和团队协作；技术课题也可以进一步形成市场分析、运营方案、商业计划与英文路演。\n\nBPA 组织拥有约 5.2 万名成员和 1800 多个分会，并通过区域晋级与全球舞台连接学生、教师和行业人士。它的含金量在于成熟的职业能力评价体系：不仅证明学生“做出了一个项目”，还检验其能否理解商业逻辑、协同执行，并用接近行业的方式把成果讲清楚。',
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
    description: '跨学科研究与实践平台，重视本土问题、研究方法、报告和现场表达。',
    detail: 'CTB 是面向中学生的跨学科研究与创新项目平台，强调用项目制学习观察本土真实问题。团队可通过研究、发明、编程、商业、艺术或公益实践提出原创方案，并在持续推进中形成论文或实践报告、数据证据与现场展示。\n\n它的价值在于完整的研究过程和公共表达场景：官网披露已覆盖 1000 多所学校、10 万余名学生，全国站与全球站让项目接受跨学科评审和同龄人交流。真正有分量的是问题定义、方法、数据和社会实践成果；官网也明确说明相关成果不与国内学校招生加分或评优挂钩，因此不应把“参赛”本身包装成升学捷径。',
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
    description: '真实商业案例分析赛，训练行业研究、战略决策与董事会式路演。',
    detail: 'BPC 以真实商业案例为核心，让学生以青年分析师和企业管理者的视角研究行业、拆解问题并制定战略。参赛团队会经历案例分析、商业模拟和董事会式路演，把定量数据、商业判断、团队协作与高压表达连接成一套完整决策能力。\n\n赛事特色是使用 Harvard Business Publishing 相关案例与模拟资源，把“读案例”推进到研究、判断和交付。组织方 HUAUSCR 是经 Harvard College 认可的学生组织，但不等同于哈佛大学官方赛事；因此它真正有价值的部分，是可展示的行业研究、战略方案、商业写作和团队决策成果，而不是简单依赖“哈佛”标签。',
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

export const majors = Array.from(new Set(projects.flatMap((project) => project.majors))).sort((a, b) => a.localeCompare(b, 'zh-CN'))

export function compatibleCompetitionIds(project: Project) {
  return project.competitionIds
}
