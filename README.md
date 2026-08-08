# sislecv.github.io

基于 [Astro](https://astro.build) + [Fuwari](https://github.com/saicaca/fuwari) 的个人静态博客，部署于 GitHub Pages。

## 功能

- 深浅色模式、可自定义主题色与横幅
- Pagefind 全文搜索
- MDX 扩展语法（Admonitions、GitHub 仓库卡片、Expressive Code 代码块）
- RSS / Sitemap / TOC / KaTeX 数学公式

## 本地开发

```sh
pnpm install
pnpm dev          # 开发服务器 http://localhost:4321
pnpm build        # 构建到 dist/（含 Pagefind 索引）
pnpm preview      # 本地预览构建产物
```

## 写文章

```sh
pnpm new-post <文件名>
```

文章存放在 `src/content/posts/`，站点信息在 `src/config.ts` 中配置。

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）自动构建并部署到 https://sislecv.github.io 。
