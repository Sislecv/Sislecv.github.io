# Sislecv 博客

基于 [Astro](https://astro.build) + [MDUI](https://www.mdui.org/zh-cn/)（Material Design 3 Web Components）的个人博客，磁贴式可拖动首页，部署于 GitHub Pages。

在线访问：https://sislecv.github.io（或自定义域名）

## 功能特性

- **磁贴式首页**：卡片可拖动换位、可调整大小（右下角手柄）、布局自动保存到浏览器
- **布局锁定**：一键锁定/解锁，防止误拖动
- **Material Design 3**：深浅色模式、动态配色（8 色色板 + 自定义）、毛玻璃视觉、View Transitions 页面过渡
- **交互式点阵背景**：鼠标经过处光晕亮起 + 拖尾
- **写作足迹**：最近 5 周（约一个月）的发布热力图，真实数据
- **技术栈卡片**：圆形图标自动横向滚动
- **堆叠图集**：首页扑克牌式图集磁贴 + 独立 /gallery 瀑布流页面
- **瀑布流文章列表**：卡片高度随文章长度自适应
- **全文搜索**：点击搜索磁贴弹出悬浮搜索框（Pagefind），不跳转页面
- **评论**：utterances（GitHub Issues 驱动）
- **RSS / Sitemap / OG 标签 / KaTeX 数学公式 / 阅读进度条 / 回到顶部 FAB**

## 快速开始

```sh
pnpm install        # 安装依赖
pnpm dev            # 开发服务器 http://localhost:4321
pnpm build          # 构建到 dist/（含 Pagefind 索引）
pnpm preview        # 本地预览构建产物
pnpm check          # 类型检查
```

## 文件结构

```
├── astro.config.mjs              # Astro 配置：site 地址、Markdown 插件（KaTeX/锚点）
├── package.json                  # 依赖与脚本
├── .github/workflows/
│   └── deploy.yml                # 推送到 main 自动构建部署到 GitHub Pages
├── public/                       # 静态资源（原样拷贝到站点根路径）
│   ├── stack/                    # 技术栈图标（python/nodedotjs/astro/omp）
│   ├── emoji/                    # 动画 emoji（来自 Google Noto Emoji Animation）
│   └── favicon/                  # 站点图标（明暗两套）
└── src/
    ├── site.config.ts            # ★★★ 站点配置文件：自定义入口，见下方指南
    ├── consts.ts                 # 配置兼容层（自动从 site.config.ts 导出，请勿手动修改）
    ├── content.config.ts         # 文章 frontmatter 字段定义（schema）
    ├── content/posts/            # ★ 文章目录：放 .md / .mdx 文件即发布
    ├── layouts/
    │   └── Layout.astro          # 全局布局：MDUI 组件注册、主题初始化、进度条、回到顶部 FAB
    ├── components/               # 页面组件（均从 site.config.ts 读取配置）
    │   ├── ProfileCard.astro     # 个人简介卡（头像/简介/社交按钮）
    │   ├── AppearanceCard.astro  # 外观卡（明暗开关 + 色板）
    │   ├── ContributionCard.astro# 写作足迹热力图（月度）
    │   ├── EmojiCard.astro       # 动画 emoji 卡
    │   ├── SearchCard.astro      # 搜索磁贴（触发悬浮搜索）
    │   ├── SearchDialog.astro    # 悬浮搜索对话框（Pagefind）
    │   ├── TagCloudCard.astro    # 标签云卡
    │   ├── TechStackCard.astro   # 技术栈滚动卡
    │   ├── GalleryStackCard.astro# 堆叠图集磁贴
    │   ├── CustomCard.astro      # 自定义卡片（由 customCards 配置驱动）
    │   ├── MasonryPostCard.astro # 瀑布流文章卡
    │   ├── FooterNav.astro       # 页脚导航卡（含快捷主题切换）
    │   ├── Footer.astro          # 页脚
    │   ├── Utterances.astro      # 评论组件
    │   ├── Toc.astro             # 文章目录
    │   └── AsciiGridBackground.astro # 交互式点阵背景
    ├── pages/                    # 页面路由
    │   ├── index.astro           # 首页（磁贴网格 + 瀑布流）
    │   ├── archive.astro         # 归档（按年分组）
    │   ├── tags.astro            # 标签总览
    │   ├── tags/[tag].astro      # 单个标签下的文章
    │   ├── gallery.astro         # 图集页（瀑布流图片墙）
    │   ├── about.astro           # 关于页
    │   ├── search.astro          # 独立搜索页（悬浮框的兜底）
    │   ├── posts/[...slug].astro # 文章详情页（目录/评论/上下篇）
    │   ├── 404.astro             # 404 页
    │   ├── rss.xml.ts            # RSS 生成
    │   └── robots.txt.ts         # 搜索引擎爬虫规则
    ├── lib/posts.ts              # 文章工具函数（排序/标签统计/阅读时长）
    └── styles/global.css         # 全局样式（布局/动效/各卡片样式）
```

## 自定义指南

**所有个性化配置集中在 `src/site.config.ts`**，改完推送到 main 即自动部署。每项配置都有中文注释，下面详解：

### 1. 基本信息（site）

```ts
export const site = {
	title: "Sislecv",                    // 站点名（导航/页脚/标题）
	description: "Sislecv 的个人博客",     // 一句话简介
	url: "https://sislecv.github.io",    // 部署地址
	lang: "zh-CN",                       // 页面语言
	author: "Sislecv",                   // 版权署名
	avatar: "/favicon/favicon-light-192.png", // 头像（public 下路径或外链）
};
```

### 2. 导航菜单（nav）

增删导航项（显示在页脚导航卡）。`icon` 用 Material Symbols 图标名（连字符形式，如 `home`、`archive`、`collections`），需在 `Layout.astro` 中注册对应图标组件（见"自定义卡片"一节的图标说明）：

```ts
export const nav = [
	{ href: "/", label: "首页", icon: "home" },
	{ href: "/archive", label: "归档", icon: "archive" },
	// ...新增：{ href: "/about", label: "关于", icon: "person" }
];
```

### 3. 社交链接（social）

显示在个人卡和关于页的按钮：

```ts
export const social = [
	{ label: "GitHub", url: "https://github.com/Sislecv" },
	{ label: "RSS", url: "/rss.xml" },
];
```

### 4. 主题（theme）

```ts
export const theme = {
	defaultColor: "#0b57d0",   // 默认主题色（未手动选择时使用）
	schemes: [                  // 外观卡的色板，可增删
		{ name: "蓝", color: "#0b57d0" },
		{ name: "粉", color: "#c2185b" },
		// ...
	],
};
```

### 5. 技术栈（techStack）

首页技术栈滚动卡的图标列表。图标放 `public/stack/` 下（推荐 128x128 SVG/PNG），`icon` 填路径：

```ts
export const techStack = [
	{ name: "Python", icon: "/stack/python.svg", url: "https://www.python.org/" },
	{ name: "我的项目", icon: "/stack/myapp.png", url: "https://example.com" },
];
```

### 6. 图集（gallery）

- `stackImages`：首页堆叠图集磁贴的图片（最多 4 张）
- `photos`：/gallery 页面的图片墙（瀑布流，高度随图片比例自适应）

支持外链或 `public/` 下的本地路径：

```ts
export const gallery = {
	stackImages: [{ src: "https://picsum.photos/seed/sislecv-1/320/224", alt: "图集 1" }],
	photos: [{ src: "https://example.com/my-photo.jpg" }],
};
```

### 7. 首页磁贴开关（homeTiles）

控制首页显示哪些磁贴，注释掉即隐藏：

```ts
export const homeTiles = [
	"profile",        // 个人简介
	"appearance",     // 外观（明暗+色板）
	"emoji",          // 动画表情
	"contribution",   // 写作足迹
	"search",         // 搜索
	"archive",        // 归档
	"category",       // 分类
	"tags",           // 标签
	"tagcloud",       // 标签云
	"techstack",      // 技术栈
	"gallery",        // 图集
];
```

磁贴的顺序和位置可通过拖动自由调整（自动保存），无需改配置。

### 8. 自定义卡片（customCards）★ 扩展你的首页

每个卡片 = 一个配置对象，自动追加到磁贴网格（可拖动/可调整大小）：

```ts
export const customCards = [
	{
		id: "my-links",           // 唯一标识（小写英文，勿与内置 id 重复）
		icon: "bookmark",          // 预置图标名，或图片路径（/ 或 http 开头）
		title: "收藏",              // 卡片文字（可省略）
		href: "https://example.com", // 点击跳转链接（可省略，省略则卡片无跳转）
		x: 0, y: 13,               // 网格坐标（8 列网格，可随意放）
		w: 2, h: 2,                // 大小（w 最大 8；h 单位约 88px）
	},
];
```

**预置图标**（Material Symbols outlined）：`star`、`favorite`、`settings`、`info`、`link`、`bookmark`、`thumb-up`、`notifications`、`visibility`、`calendar-month`、`dashboard`、`insights`、`auto-awesome`。

需要其他图标：在 `src/layouts/Layout.astro` 的图标导入区加一行 `import "@mdui/icons/<图标名>--outlined.js";`，并在 `CustomCard.astro` 中补一个条件渲染分支（照抄现有分支即可）。

### 9. 评论（comments）

```ts
export const comments = {
	repo: "Sislecv/sislecv.github.io", // 评论仓库（需已安装 utterances App）
};
```

## 写文章

在 `src/content/posts/` 新建 `.md` 或 `.mdx` 文件：

```markdown
---
title: 我的新文章
published: 2026-08-10
description: 文章简介（列表页显示）
tags: ["Astro", "MDUI"]
category: 教程
draft: false
---

正文内容...
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | 是 | 文章标题 |
| `published` | 是 | 发布日期（`YYYY-MM-DD`） |
| `description` | 否 | 摘要（列表/卡片显示） |
| `tags` | 否 | 标签数组 |
| `category` | 否 | 分类 |
| `draft` | 否 | `true` 时不发布 |
| `updated` | 否 | 更新日期 |

支持：KaTeX 数学公式（`$$...$$` / `$...$`）、MDX 组件、代码高亮、图片（放同目录相对引用）。

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）自动构建并部署到 GitHub Pages。

## 常见问题

**1. 首页磁贴/主题修改后没生效？**
浏览器缓存了旧版，硬刷新（`Ctrl+Shift+R`）。

**2. 国内无法访问 github.io？**
GitHub Pages 的 CDN 在国内被屏蔽，可绑定自己的域名（如通过 Cloudflare 代理）解决。

**3. 评论不显示？**
需先安装 utterances App：https://github.com/apps/utterances → 授权到 `comments.repo` 配置的仓库。

**4. 自定义图标不显示？**
图标必须先在 `Layout.astro` 中注册（`import "@mdui/icons/xxx--outlined.js"`），否则组件未定义会隐藏。
