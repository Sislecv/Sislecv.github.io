# GitHub 便签卡片 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在首页磁贴网格新增一张 MD3 风格便签卡片,静态配置展示 4 个 GitHub 项目,点击跳转仓库。

**Architecture:** 遵循现有卡片模式——`site.config.ts` 静态数据源 + 独立 `.astro` 组件(`mdui-card bento-card` 外壳,内部纯 CSS 便签墙)+ `index.astro` 接入 GridStack 网格。零新依赖、零外部字体、无运行时请求。

**Tech Stack:** Astro 7.2、MDUI (Material Design 3 Web Components)、GridStack、全局 `global.css` + 组件内 `<style>`。

## Global Constraints

- 数据源:静态配置(`site.config.ts` 的 `githubProjects` 数组),不 fetch GitHub API
- 视觉:MD3 风格便签(纸感底色 + 胶带条 + 右上折角 + 错落旋转),手写感标题用系统字体回退 `"KaiTi", "STKaiti", "楷体", cursive`,不引外部字体
- 网格尺寸:`w=4 h=4`,展示 4 个便签 2×2 布局
- `homeTiles` 追加 `"github"`;`DEFAULT_LAYOUT` 追加对应条目;沿用上轮 stale-id 过滤逻辑(无需改动,自动兼容)
- 每张便签为 `<a target="_blank" rel="noreferrer">` 整卡可点击
- 深浅色模式自适应:便签底色来自配置 `color`,文字用 MD3 颜色变量
- 不新增测试框架(项目无 test 脚本);验证 = `pnpm check` + `pnpm build` + 浏览器实测

---

### Task 1: 配置 `githubProjects` 数据源

**Files:**
- Modify: `src/site.config.ts`(在 `customCards` 之后、`comments` 之前插入)

**Interfaces:**
- Produces: `export const githubProjects: readonly GithubProject[]`,其中 `type GithubProject = { name: string; description: string; url: string; lang: string; stars: number; color?: string }`
- Produces: `homeTiles` 数组追加 `"github"` 字符串

- [ ] **Step 1: 在 `site.config.ts` 插入类型与配置**

在 `customCards` 定义之后添加:

```ts
// 首页 GitHub 项目便签卡片（静态配置，手写维护）
// name: 项目名；description: 一行简介；url: 仓库链接
// lang: 主语言；stars: star 数；color: 便签底色（可选，默认纸黄）
export type GithubProject = {
	name: string;
	description: string;
	url: string;
	lang: string;
	stars: number;
	color?: string;
};
export const githubProjects: readonly GithubProject[] = [
	{
		name: "md2image",
		description: "Markdown 转图片工具",
		url: "https://github.com/Sislecv/md2image",
		lang: "TypeScript",
		stars: 12,
		color: "#f6e9b2",
	},
	{
		name: "Sislecv.github.io",
		description: "基于 Astro 的个人博客",
		url: "https://github.com/Sislecv/Sislecv.github.io",
		lang: "Astro",
		stars: 3,
		color: "#d8e8f5",
	},
	{
		name: "dotfiles",
		description: "开发环境配置文件",
		url: "https://github.com/Sislecv/dotfiles",
		lang: "Shell",
		stars: 8,
		color: "#e6f0d4",
	},
	{
		name: "leetcode",
		description: "算法题解与刷题笔记",
		url: "https://github.com/Sislecv/leetcode",
		lang: "Python",
		stars: 21,
		color: "#f3e3d8",
	},
] as const;
```

> 注:项目数据为示例占位,实现时以用户真实仓库为准(sislecv 用户名下已确认存在 `Sislecv.github.io`,其余可在实现阶段通过 `gh api` 确认后替换)。

- [ ] **Step 2: `homeTiles` 追加 `"github"`**

```ts
export const homeTiles = [
	"profile",
	"appearance",
	"emoji",
	"contribution",
	"search",
	"archive",
	"category",
	"tags",
	"tagcloud",
	"techstack",
	"gallery",
	"github",
] as const;
```

- [ ] **Step 3: 验证配置类型**

Run: `pnpm check`
Expected: 仍为 3 个既有错误(144/176/185),无新增;`tsc` 不报 `githubProjects` 相关错误。

- [ ] **Step 4: Commit**

```bash
git add src/site.config.ts
git commit -m "feat: add githubProjects config for note card"
```

---

### Task 2: 新建 `GitHubProjectsCard.astro` 便签组件

**Files:**
- Create: `src/components/GitHubProjectsCard.astro`

**Interfaces:**
- Consumes: `githubProjects`(Task 1 产出,`readonly GithubProject[]`)
- Produces: 无 props 的 Astro 组件,渲染 `<mdui-card class="bento-card">` 内含便签墙;类名 `note-grid`、`note-item`、`note-tape`、`note-fold`、`note-title`、`note-desc`、`note-meta`、`note-lang-dot` 供样式与后续任务引用

- [ ] **Step 1: 创建组件模板**

```astro
---
import { githubProjects } from "../site.config";
const PROJECTS = githubProjects;
---

<mdui-card variant="elevated" class="bento-card">
	<div class="card-body note-grid">
		{
			PROJECTS.map((p, i) => (
				<a
					class="note-item"
					href={p.url}
					target="_blank"
					rel="noreferrer"
					title={p.name}
					style={`--note-bg: ${p.color ?? "#f6e9b2"}; --note-rot: ${i % 2 === 0 ? "-1.5deg" : "1deg"}`}
				>
					<span class="note-tape" aria-hidden="true"></span>
					<span class="note-fold" aria-hidden="true"></span>
					<span class="note-title">{p.name}</span>
					<span class="note-desc">{p.description}</span>
					<span class="note-meta">
						<span class="note-lang-dot" style={`--lang-color: ${langColor(p.lang)}`}></span>
						<span class="note-lang">{p.lang}</span>
						<span class="note-stars">⭐ {p.stars}</span>
					</span>
				</a>
			))
		}
	</div>
</mdui-card>

<style>
	.note-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 12px;
		padding: 14px;
		height: 100%;
	}
	.note-item {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 12px 12px 10px;
		background: var(--note-bg, #f6e9b2);
		border-radius: 3px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
		transform: rotate(var(--note-rot, 0deg));
		transition: transform var(--md-duration-medium, 200ms) var(--md-easing-emphasized-decelerate, ease),
			box-shadow var(--md-duration-medium, 200ms) ease;
		text-decoration: none;
		overflow: hidden;
	}
	.note-item:hover {
		transform: rotate(0deg) translateY(-3px);
		box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
	}
	.note-tape {
		position: absolute;
		top: -6px;
		left: 50%;
		transform: translateX(-50%) rotate(-2deg);
		width: 56px;
		height: 14px;
		background: rgba(255, 255, 255, 0.55);
		border-left: 1px dashed rgba(0, 0, 0, 0.08);
		border-right: 1px dashed rgba(0, 0, 0, 0.08);
	}
	.note-fold {
		position: absolute;
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 16px 16px 0;
		border-color: transparent rgba(0, 0, 0, 0.14) transparent transparent;
	}
	.note-title {
		font-family: "KaiTi", "STKaiti", "楷体", cursive;
		font-size: 1.02rem;
		font-weight: 700;
		line-height: 1.3;
		color: #3b3419;
	}
	.note-desc {
		font-size: 0.72rem;
		line-height: 1.5;
		margin-top: 3px;
		color: rgba(59, 52, 25, 0.72);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.note-meta {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-top: auto;
		padding-top: 6px;
		font-size: 0.68rem;
		color: rgba(59, 52, 25, 0.66);
	}
	.note-lang-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--lang-color, #3178c6);
	}
	.note-stars {
		margin-left: auto;
	}
</style>
```

> 注:`langColor()` 为前端小工具函数,在 frontmatter 内定义(见 Step 2)。`--md-duration-medium` / `--md-easing-emphasized-decelerate` 是全局 CSS 变量(global.css 已有 motion system)。

- [ ] **Step 2: frontmatter 增加 `langColor` 工具函数**

在 `import` 之后添加:

```ts
const langColor = (lang: string): string => {
	const map: Record<string, string> = {
		TypeScript: "#3178c6",
		JavaScript: "#f1e05a",
		Python: "#3572A5",
		Astro: "#ff5d01",
		Shell: "#89e051",
		HTML: "#e34c26",
		CSS: "#663399",
	};
	return map[lang] ?? "#8b949e";
};
```

- [ ] **Step 3: 验证组件编译**

Run: `pnpm check`
Expected: 无新增错误(保持 3 个既有);组件 AST 解析通过。

- [ ] **Step 4: Commit**

```bash
git add src/components/GitHubProjectsCard.astro
git commit -m "feat: add GitHub projects note card component"
```

---

### Task 3: 接入首页 GridStack

**Files:**
- Modify: `src/pages/index.astro`
  - import 区(约第 12 行后):加 `import GitHubProjectsCard from "../components/GitHubProjectsCard.astro";`
  - 模板区(`gallery` grid-stack-item 之后,`customCards.map` 之前):插入 github 磁贴
  - `<script>` 内 `DEFAULT_LAYOUT` 数组(`gallery` 条目之后):追加 `{ id: "github", x: 0, y: 13, w: 4, h: 4 }`

**Interfaces:**
- Consumes: `GitHubProjectsCard`(Task 2 产出,无 props)
- Produces: 首页 `gs-id="github"` 磁贴,`w=4 h=4`,默认位置 `(0,13)`;与既有 `validTileIds` 过滤逻辑自动兼容(homeTiles 已含 "github")

- [ ] **Step 1: import 组件**

```astro
import GalleryStackCard from "../components/GalleryStackCard.astro";
import GitHubProjectsCard from "../components/GitHubProjectsCard.astro";
```

- [ ] **Step 2: 模板插入磁贴**

在 `{homeTiles.includes("gallery") && (...)}` 块之后添加:

```astro
{homeTiles.includes("github") && (
<div class="grid-stack-item" gs-id="github" gs-x="0" gs-y="13" gs-w="4" gs-h="4">
	<div class="grid-stack-item-content"><GitHubProjectsCard /></div>
</div>
)}
```

- [ ] **Step 3: `DEFAULT_LAYOUT` 追加条目**

在 `{ id: "gallery", x: 0, y: 11, w: 8, h: 3 },` 之后添加:

```ts
{ id: "github", x: 0, y: 13, w: 4, h: 4 },
```

- [ ] **Step 4: 构建验证**

Run: `pnpm build`
Expected: build 3 步全部成功,`dist/index.html` 含 `gs-id="github"` 与 `note-item`。

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire github note card into home grid"
```

---

### Task 4: 浏览器实测验证

**Files:**
- 无改动;仅验证

- [ ] **Step 1: 启动 preview 并实测**

Run: `pnpm preview`(后台),浏览器打开 `http://localhost:4321`
检查项:
1. 首页出现 github 磁贴,4 张便签 2×2 布局,底色/胶带/折角/旋转可见
2. 便签标题为楷体风格,底部语言点 + ⭐ stars 可见
3. hover 便签回正 + 微升
4. 点击便签新标签打开对应 GitHub 仓库
5. 拖动磁贴换位正常、刷新后布局保持(与 localStorage 逻辑不冲突)
6. 深浅色模式切换后便签文字可读
7. 注入含 `github` 的旧布局后 stale-id 过滤不影响 github 磁贴(可选抽查)

- [ ] **Step 2: 推送并确认部署**

```bash
git push origin main
gh run watch <deploy-run-id> --repo Sislecv/sislecv.github.io --exit-status
```

Expected: Deploy to GitHub Pages success,线上 https://whoami.nx.kg/ 出现便签卡片。

---

## Self-Review

1. **Spec coverage:** 配置(site.config.ts)✓ Task 1;组件(便签视觉/胶带/折角/旋转/手写体/语言点/star)✓ Task 2;接入(w4×h4、homeTiles、DEFAULT_LAYOUT、stale-id 兼容)✓ Task 3;验证(build + 浏览器 + 部署)✓ Task 4。无缺口。
2. **Placeholder scan:** 无 TBD/TODO;Task 1 中示例项目数据已标注"实现时以真实仓库为准",实现阶段会用 `gh api` 确认。
3. **Type consistency:** `GithubProject` 类型在 Task 1 定义,Task 2 消费(`githubProjects` 元素含 name/description/url/lang/stars/color),Task 1 配置对象字段一致;`note-*` 类名在 Task 2 定义、Task 4 验证引用一致。
