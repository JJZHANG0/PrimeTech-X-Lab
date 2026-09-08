import type { SkillDimension, SkillKey } from '../types'

export const dimensions: SkillDimension[] = [
  { key: 'software', label: '软件编程' },
  { key: 'algorithm', label: '算法与数据' },
  { key: 'modeling', label: '机械建模' },
  { key: 'embedded', label: '嵌入式控制' },
  { key: 'engineering', label: '工程实践' },
]

export const assessmentGroups: Record<SkillKey, string[]> = {
  software: ['Python', 'C 或 C++', 'JavaScript 或 TypeScript', 'Java', 'MATLAB', 'HTML 与 CSS'],
  algorithm: ['NumPy 与 Pandas', '数据清洗与可视化', 'OpenCV', '机器学习基础', 'PyTorch 或 TensorFlow', '目标检测或图像分类', '自然语言处理', '大语言模型 API 调用'],
  modeling: ['Fusion 360', 'SolidWorks', 'Rhino', 'Blender', 'AutoCAD', '3D 打印与切片软件', '激光切割或 CNC 设备'],
  embedded: ['Arduino', 'ESP32', 'STM32', 'Raspberry Pi', 'Jetson Nano', '常见传感器', '电机与舵机控制', '电路连接与面包板', '焊接与基础电路调试', '串口、I²C、SPI 等基础通信'],
  engineering: ['完成过一个可运行的项目', '参与过团队分工', '阅读过技术文档或论文', '设计过实验或测试方案', '记录和分析过实验数据', '独立排查过程序或硬件问题', '制作过原型', '完成过项目展示或答辩'],
}

export const proficiencyLabels = [
  '从未接触',
  '了解概念',
  '可跟随教程完成',
  '可独立完成小型任务',
  '能熟练应用于真实项目',
]

export const weeklyTimeOptions = ['3小时以内', '3—5小时', '5—8小时', '8小时以上']
export const roleOptions = ['算法与软件', '机械与结构', '嵌入式与电子', '研究与测试', '产品与表达', '还不确定']

export const emptyAnswers = (): Record<SkillKey, Record<string, number>> => ({
  software: {}, algorithm: {}, modeling: {}, embedded: {}, engineering: {},
})
