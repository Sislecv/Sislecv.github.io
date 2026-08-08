# sislecv.github.io

基于 [Astro](https://astro.build) 7 + [MDUI](https://www.mdui.org/zh-cn/)（Material Design 3 Web Components）的个人静态博客，Bento 卡片式模块化布局，部署于 GitHub Pages。

## 功能

- **Bento 首页**：导航/简介/统计/标签云/精选文章等模块化卡片
- **Material Design 3**：MDUI 组件库、深浅色模式（跟随系统 + 手动切换）、MD3 蓝色主题、原生 View Transitions
- **Pagefind 全文搜索**、KaTeX 数学公式、TOC 目录、utterances 评论（GitHub Issue 驱动）
- RSS / Sitemap / OG 标签

## 本地开发

```sh
pnpm install
pnpm dev          # 开发服务器 http://localhost:4321
pnpm build        # 构建到 dist/（含 Pagefind 索引）
pnpm preview      # 本地预览构建产物
pnpm check        # 类型检查
```

## 写文章

文章存放在 `src/content/posts/`，frontmatter 结构参考 `src/content/posts/welcome.md`。

站点信息（标题、导航、社交链接）在 `src/consts.ts` 中配置；MDUI 组件注册在 `src/layouts/Layout.astro` 的 script 块中。

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）自动构建并部署到 https://sislecv.github.io 。
