# PrimeTech X Lab

高端、简洁、数据驱动的工程科研成长路径构建器。

## 本地运行

需要 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 内容配置

- 课题：`src/data/projects.ts`
- 技能营地：`src/data/camps.ts`
- 成果验证平台：`src/data/competitions.ts`
- 能力自查题目：`src/data/assessment.ts`
- 价格与课时：`src/data/pricing.ts`

评分、匹配、价格与摘要生成逻辑位于 `src/lib/`。用户未完成的路径保存在浏览器 `localStorage` 中，不会上传到服务器。
