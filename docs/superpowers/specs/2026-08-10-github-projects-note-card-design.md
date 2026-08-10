# GitHub 便签卡片 — 设计文档

日期:2026-08-10
状态:已获用户批准(数据源=静态配置,视觉=MD3 风格便签,尺寸=w4×h4,数量=4)

## 目标

首页磁贴网格新增一张卡片,以"便签"形式展示用户的 GitHub 项目。用户点击便签跳转对应仓库。

## 方案

### 配置(`src/site.config.ts`)

新增静态导出,遵循现有 `techStack`/`gallery` 模式:

```ts
export const githubProjects = [
  {
    name: "项目名",
    description: "一行简介",
    url: "https://github.com/Sislecv/xxx",
    lang: "TypeScript",          // 主语言
    stars: 128,                  // star 数(手写维护)
    color: "#f6e9b2",            // 便签底色(可选,默认主题色纸感)
  },
];
```

`homeTiles` 追加 `"github"`。

### 组件(`src/components/GitHubProjectsCard.astro`)

- 外层 `mdui-card variant="elevated" class="bento-card"`(与现有卡片一致,MD3 深浅色自动适配)
- 内部 2×2 便签墙(`display: grid`),每项目一张便签
- 便签元素(MD3 风格,纯 CSS 无外部资源):
  - 纸感底色:来自配置的 `color`,浅深色模式下用同色系(MD3 表面容器色做文字区)
  - 顶部胶带条:半透明白色 `::before` 横条
  - 右上折角:伪元素三角形折角
  - 错落旋转:交替 `rotate(-1.5deg / +1deg)`,hover 回正微升
  - 手写感标题:系统回退字体 `"KaiTi", "STKaiti", "楷体", cursive`(不引外部字体)
  - 底部行:语言色点 + 语言名 + ⭐ stars 徽章
- 整张便签 `<a>` 包裹,`target="_blank" rel="noreferrer"`,点击跳转

### 首页接入(`src/pages/index.astro`)

- `homeTiles.includes("github")` 渲染 `grid-stack-item`:`gs-id="github" gs-w="4" gs-h="4"`(位置由 GridStack 自动排,默认布局追加条目)
- 遵循既有 stale-id 过滤逻辑(上轮已实现,自动兼容)

### 样式

组件内 `<style>`(现有卡片组件惯例是全局 CSS + 内联,本卡片独立性强,用组件 `<style>` 局部作用域,避免 global.css 膨胀)。

## 边界与不做的事

- 不做 GitHub API 拉取(用户已选静态配置)
- 不做语言色自动映射(配置里手写 `lang` 字符串,色点用固定主题色)
- 便签数量超出 4 时卡片高度不变,多出项目在卡片内滚动(先不做,当前只配 4 个)

## 验证

- `pnpm check` 不新增类型错误
- `pnpm build` 通过
- 浏览器验证:卡片渲染、便签样式、点击跳转、拖动换位、深浅色模式
