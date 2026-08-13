# 说说(talks)功能 — 设计文档

日期:2026-08-13
状态:已获用户批准(独立页 + 首页磁贴,纯文字 markdown,接入 Decap CMS)

## 目标

博客新增"说说"功能:轻量短内容(类似微博),时间倒序展示,通过 Decap CMS 发布,保存即部署。

## 数据模型

新 collection `talks`,文件 `src/content/talks/*.md`,每文件一条:

```markdown
---
published: 2026-08-13
---

说说正文,支持 markdown(换行/链接/列表)。
```

- frontmatter 仅 `published`(日期,必填),无 title/draft/tags——保持轻量
- 正文即内容,`z.date()` 校验与 posts 一致

## 组件

### 1. 内容层
- `content.config.ts`:新增 `talks` collection(glob loader `src/content/talks`),schema `{ published: z.date() }`
- `src/lib/talks.ts`:`getAllTalks()` 按 published 倒序

### 2. 页面 `src/pages/talks.astro`
仿 archive 布局:时间轴样式(左侧日期 + 右侧 mdui-card 内容),首条高亮"最新",空态提示。标题"说说"。

### 3. 首页磁贴
- `site.config.ts`:`homeTiles` 追加 `"talks"`;`DEFAULT_LAYOUT` 追加 `{ id: "talks", x: 4, y: 13, w: 4, h: 2 }`
- `index.astro`:新增磁贴块,`mdui-icon-mode-comment--outlined` 图标,点击跳 `/talks/`;stale-id 过滤自动兼容
- `Layout.astro`:注册 `mode-comment--outlined` 图标

### 4. Decap CMS
`public/admin/config.yml` 追加 `talks` collection(folder `src/content/talks`,字段 published datetime + body markdown)。

## 验证

- `pnpm check` 无新增错误
- `pnpm build` 通过
- 浏览器:首页磁贴可见可点 → /talks 时间轴渲染
- Decap /admin 发布一条说说 → commit → Actions 部署 → 页面出现
