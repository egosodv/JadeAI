# 开源了一个 AI 简历生成器 JadeAI：50 套模板、拖拽编辑、AI 对话优化、多格式导出，Docker 一键部署

> GitHub: https://github.com/twwch/JadeAI

大家好，分享一个我最近开源的项目 —— **JadeAI**，一个 AI 驱动的智能简历生成器。

做这个项目的出发点很简单：市面上的简历工具，要么功能够用但收费不低，要么免费但模板丑 / 导出带水印 / AI 能力缺失。作为开发者，我想做一个**真正好用、完全免费、可以自托管**的简历工具，所有 AI 能力用你自己的 API Key，数据完全掌握在自己手里。

---

## 先看效果

### 模板画廊

内置 **50 套**专业设计模板，覆盖经典、现代、极简、创意、ATS 友好、北欧风、瑞士风、日式等多种风格，适配不同行业和求职场景。

![模板画廊](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/template-list.png)

### 简历编辑器

拖拽式编辑器，所见即所得。点击任意字段直接编辑，拖拽模块调整顺序，右侧实时预览效果。支持撤销/重做（50 步），自动保存不怕丢数据。

![简历编辑器](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/resume-edit.png)

---

## 核心功能

### 1. AI 一键生成简历

输入你的目标职位、工作年限和核心技能，AI 自动生成一份完整的、结构化的简历。不用对着空白页发愁了。

![AI 填充简历](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/AI%20填充简历.gif)

### 2. 图片/PDF 简历解析

手里有一份旧简历的 PDF 或照片？直接上传，AI 自动识别并提取所有内容，填入编辑器。省去手动录入的时间。

![AI 图片简历解析](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/图片简历解析.gif)

### 3. AI 对话优化

编辑器内集成了 AI 聊天助手，你可以直接用自然语言和 AI 对话：

- "帮我优化工作经历的描述"
- "用更专业的措辞重写这段项目经历"
- "给我的技能部分补充一些关键词"

AI 理解你的简历上下文，给出针对性的建议，并能**直接修改简历内容**。支持多会话和历史记录持久化。

![AI 优化](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/ai%20优化.png)

### 4. 语法与写作检查

一键检测简历中的弱动词、模糊描述、语法错误，给出质量评分和逐条修改建议。

![AI 语法检查](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/AI%20语法检查.png)

发现问题后，可以**一键应用修复**，不用手动逐个改：

![语法一键修复](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/AI%20语法检查一键修复.png)

### 5. JD 匹配分析

粘贴目标岗位的 JD（职位描述），AI 对比你的简历和 JD 的匹配度：

- 关键词覆盖率
- ATS（简历筛选系统）通过率评分
- 缺失的关键技能和经验
- 针对性的改进建议

帮你把简历调整到和目标岗位高度匹配。

![JD 匹配分析](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/JD%20匹配分析.png)

### 6. 更多 AI 能力

除了上面展示的，还支持：

- **求职信生成** — 基于简历和 JD 自动生成求职信，可选正式 / 友好 / 自信语气
- **多语言翻译** — 支持 10 种语言互译，保留专业术语原文

### 7. 多格式导出

支持 **PDF、DOCX、HTML、TXT、JSON** 五种格式导出。PDF 使用 Puppeteer + Chromium 服务端渲染，高保真还原模板样式，每套模板都有独立的导出处理器。

![多格式导出](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/多项导出.png)

### 8. 链接分享

生成一个分享链接，可以直接发给 HR 或朋友查看你的在线简历。支持密码保护和浏览次数统计。

![创建分享链接](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/创建分享链接.png)

分享出去的简历页面长这样，干净专业：

![简历分享页](https://ladr-1258957911.cos.ap-guangzhou.myqcloud.com/jadeai/images/简历分享页.png)

---

## 技术栈

给关注技术实现的同学列一下：

| 层级 | 技术 |
|------|------|
| 框架 | **Next.js 16** (App Router, Turbopack) |
| UI | **React 19**, Tailwind CSS 4, shadcn/ui, Radix UI |
| 拖拽 | @dnd-kit |
| 状态管理 | Zustand（5 个 Store：简历、编辑器、设置、UI、引导） |
| 数据库 | **Drizzle ORM**（同时支持 SQLite 和 PostgreSQL） |
| 认证 | NextAuth.js v5 + FingerprintJS（零配置指纹识别降级方案） |
| AI | **Vercel AI SDK v6** + OpenAI / Anthropic / 自定义端点 |
| PDF | Puppeteer Core + @sparticuz/chromium |
| 国际化 | next-intl（中文 / 英文完整双语） |
| 数据校验 | Zod v4 |

几个技术亮点：

- **双数据库支持**：默认 SQLite 零配置开箱即用，也可以切换到 PostgreSQL。通过 Drizzle ORM 的适配器模式实现，一套 Schema 两种数据库。
- **AI 密钥完全客户端**：服务端不存储任何 AI API Key，用户在浏览器内配置，存在 localStorage 里。你的 Key 你做主。
- **指纹认证降级**：不想配 OAuth？默认使用浏览器指纹作为用户标识，打开就能用，零门槛。
- **50 套模板 + 独立导出**：每套模板都有对应的服务端 PDF 导出处理器，确保导出效果和预览一致。

---

## 快速部署

### Docker 一行命令

```bash
docker run -d -p 3000:3000 \
  -e AUTH_SECRET=$(openssl rand -base64 32) \
  -v jadeai-data:/app/data \
  twwch/jadeai:latest
```

打开 `http://localhost:3000`，首次启动自动完成数据库迁移和初始化。

只需要一个 `AUTH_SECRET` 环境变量（用于会话加密），其他全部零配置。AI 功能在应用内的 **设置 > AI** 里自己配置 API Key 和模型。

### 本地开发

```bash
git clone https://github.com/twwch/JadeAI.git
cd JadeAI
pnpm install
cp .env.example .env.local
pnpm db:generate && pnpm db:migrate
pnpm dev
```

---

## 未来规划

- 简历版本历史 / 快照回滚
- 简历照片上传
- 独立简历质量评分（无需 JD）
- 移动端适配
- 简历分组 / 标签管理
- 更多 AI 模型支持

---

## 写在最后

项目完全开源，Apache 2.0 协议。如果觉得有用，欢迎 Star 支持一下：

**GitHub: https://github.com/twwch/JadeAI**

有问题或建议欢迎提 Issue，也欢迎 PR 贡献代码。

如果你正在找工作或者帮朋友改简历，可以试试 Docker 一键部署，AI 能力配上自己的 Key 就能用。
